from rest_framework import serializers

from store.models import Category, Order ,Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['category_id','name']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['name','price', 'description','image', 'category',]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=['product', 'customer_name','phone_number','created_at','email','address','state','lga', ]