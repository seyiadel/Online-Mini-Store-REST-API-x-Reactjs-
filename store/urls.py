from django.urls import path
from store.views import OrderItem, ProductList, ProductDetail, CategoryList,CategoryDetail, OrderListCreate, add_to_cart
urlpatterns=[
    path('products/',ProductList.as_view(), name='products-api'),
    path('products/<str:pk>/',ProductDetail.as_view(), name='api-product' ),
    path('category/',CategoryList.as_view(), name='api-categorys' ),
    path('category/<str:pk>/',CategoryDetail.as_view(), name='category-api' ),
    path('order/',OrderListCreate.as_view(), name='get-orders'),
    path('order/<str:pk>/',OrderItem.as_view(), name='get-order'),
    path('cart/<int:pk>/',add_to_cart, name='add-cart'),
]