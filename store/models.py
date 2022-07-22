from unicodedata import category
from django.db import models
import uuid

# Create your models here.
class Category(models.Model):
    category_id =models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False, unique=True)
    name=models.CharField(max_length=200)

    def __str__(self):
        return self.name



class Product(models.Model):
    category=models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    product_id=models.UUIDField(default=uuid.uuid4,primary_key=True,unique=True,editable=False)
    image=models.ImageField(upload_to='productimages', blank=True)
    name=models.CharField(max_length=100)
    description=models.CharField(max_length=320)
    price=models.FloatField(default=0)
    

    def __str__(self):
        return self.name

class Order(models.Model):
    # phone_number
    state=models.CharField(max_length=50)
    lga=models.CharField(max_length=100)
    