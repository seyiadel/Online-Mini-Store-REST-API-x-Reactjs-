from store.serializers import CategorySerializer, OrderSerializer, ProductSerializer
from store.models import Category, Order, Product
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404



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
        product = Product.objects.get(pk=request.data['product'])
        if Order.objects.filter(product=product).exists():
            quantity += 1
        else:
            order=Order.objects.create(product=product)
            order.save()
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, data="Item added to Cart")
        return Response(status=status.HTTP_400_BAD_REQUEST)

      
    def delete(self, request):
        try:
            orders=Order.objects.all()
            orders.delete()
            serializer=OrderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except AttributeError:
             return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

class OrderItem(APIView):
    def get(self, request, pk):
        order=OrderItem.objects.get(id=pk)
        order.quantity += 1
        order.save()
        serializer=OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self,request,pk):
        order=Order.objects.get(id=pk)
        serializer=OrderSerializer(instance=order,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
 
    # Decrease Order Quantity
    def put(self,request,pk):
        order=Order.objects.get(id=pk)
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
        order=OrderItem.objects.get(id=pk)
        order.delete()
        serializer=OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
# Trying to increase Order quantity when being clicked and  calculate total price
# order.quantity += 1
# class Cart(APIView):
#     def add_to_cart(self, request):
#         product= Product.objects.all()
#         orders= Order.objects.all
        

#         return Response( status=status.HTTP_200_OK)
# class Checkout(APIView):
    
#     def total_price(request, pk):
#         product=Product.objects.get(product_id=pk)
#         order = Order.objects.get(user=request.session)
#         product.price * order.quantity