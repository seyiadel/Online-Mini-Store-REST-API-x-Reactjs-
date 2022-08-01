import imp
from django.shortcuts import render
from rest_framework.decorators import api_view
from store.serializers import CategorySerializer, OrderSerializer, ProductSerializer
from store.models import Category, Order, Product
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.contrib import messages
from rest_framework.views import APIView



@api_view(['GET','POST'])
def categorys_api(request):
    if request.method == 'GET':
        category=Category.objects.all() 
        serializer=CategorySerializer(category, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer=CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET','PUT','DELETE'])
def category_api(request,pk):
    category=Category.objects.get(category_id=pk)
    serializer=CategorySerializer(category)
    return Response(serializer.data)

@api_view(['GET','POST']) 
def api_products(request):
    if request.method =="GET":
        products=Product.objects.all()
        serializer=ProductSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method =="POST":
        serializer=ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        
        
@api_view(['GET','PUT','DELETE'])
def api_product(request, pk):
    product=get_object_or_404(Product, product_id=pk)
    if request.method == "GET":
        serializer=ProductSerializer(product)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer=ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


    if request.method == "DELETE":
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def get_orders(request):
    if request.method == "GET":
        orders=Order.objects.all()
        serializer=OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Make Order
    if request.method=="POST":
        serializer=OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','PATCH','DELETE'])
def get_orderproduct(request, pk):
    order=Order.objects.get(id=pk)
    if request.method == "GET":
        order.quantity += 1
        order.save()
        serializer=OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
 
    # Decrease Order Quantity
    if request.method == "PATCH":
        order.quantity -= 1
        if order.quantity <= 0: #Bug not done
            return Response(status=status.HTTP_200_OK) #Still Working on it.
        order.save()
        serializer=OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    #Cancel Order
    if request.method =="DELETE":
        order.delete()
        serializer=OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


def add_to_cart(request, pk):
    # Trying to increase Order quantity when being clicked and  calculate total price


    pass
    
# order.quantity += 1


# class Checkout(APIView):
    
#     def total_price(request, pk):
#         product=Product.objects.get(product_id=pk)
#         order = Order.objects.get(user=request.session)
#         product.price * order.quantity