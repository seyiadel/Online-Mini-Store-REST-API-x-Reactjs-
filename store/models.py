from django.db import models
import uuid
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=200)
    category_id =models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False, unique=True)

    def __str__(self):
        return self.name



class Product(models.Model):
    category=models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    product_id=models.UUIDField(default=uuid.uuid4,primary_key=True,unique=True,editable=False)
    image=models.ImageField(upload_to='productimages', blank=True)
    name=models.CharField(max_length=100)
    description=models.CharField(max_length=320)
    price=models.FloatField(default=0)
    inventory=models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.name

class Order(models.Model):
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_name= models.CharField(max_length=27)
    email=models.EmailField()
    address=models.CharField(max_length=200)
    phone_number=PhoneNumberField()
    state=models.CharField(max_length=50)
    lga=models.CharField(max_length=100)
    created_at=models.DateTimeField(auto_now_add=True) 
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.email

    class Meta:
        ordering=['created_at']


class Cart(models.Model):
    pass