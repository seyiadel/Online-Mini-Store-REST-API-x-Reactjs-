from django.shortcuts import render
from rest_framework.decorators import api_view
from store.serializers import CategorySerializer, ProductSerializer
from store.models import Category, Product
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status


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


