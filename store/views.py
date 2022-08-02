import imp
from django.http import Http404
from django.shortcuts import render
from rest_framework.decorators import api_view
from store.serializers import CategorySerializer, OrderSerializer, ProductSerializer
from store.models import Category, Order, Product
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.contrib import messages
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView



class CategoryList(ListCreateAPIView):
        queryset=Category.objects.all() 
        serializer_class=CategorySerializer
        
class CategoryDetail(RetrieveUpdateDestroyAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer

class ProductList(ListCreateAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

class ProductDetail(RetrieveUpdateDestroyAPIView):
    queryset =Product.objects.all()
    serializer_class=ProductSerializer

class OrderListCreate(APIView):
    def get(self,request):
        orders=Order.objects.all()
        serializer=OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Make Order
    def post(self,request):
        serializer=OrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)


class OrderItem(APIView):
    def get(self, request, pk):
        order=Order.objects.get(order_id=pk)
        order.quantity += 1
        order.save()
        serializer=OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self,request,pk):
        order=Order.objects.get(order_id=pk)
        serializer=OrderSerializer(instance=order,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
 
    # Decrease Order Quantity
    def put(self,request,pk):
        order=Order.objects.get(order_id=pk)
        order.quantity -= 1
        if order.quantity <= 0 :#Bug not done
            return Response(status=status.HTTP_204_NO_CONTENT)
        order.save()
        #except IntegrityError:
            #pass
        serializer=OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    #Cancel Order
    def delete(self,request,pk):
        order=Order.objects.get(order_id=pk)
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