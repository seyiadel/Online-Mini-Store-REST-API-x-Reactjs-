from rest_framework import serializers

from store.models import Category ,Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['category_id','name']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['name','price', 'description','image', 'category',]