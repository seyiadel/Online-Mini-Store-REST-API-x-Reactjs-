from rest_framework import serializers

from store.models import Category, Order ,Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['category_id','name']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['name','price', 'description','image', 'category','id',]

class OrderSerializer(serializers.ModelSerializer):
    product=serializers.PrimaryKeyRelatedField(many=False, queryset=Product.objects.all())

    class Meta:
        model=Order
        fields=['id','product','quantity','created_at',]

        # def create(self, validated_data):
        #     order=Order.objects.create(order_id=validated_data['order_id'],
        #     product=validated_data['product'],
        #     quantity=validated_data['quantity'],
        #     created_at=validated_data['created_data'],)
        #     order.save()
        #     return order

