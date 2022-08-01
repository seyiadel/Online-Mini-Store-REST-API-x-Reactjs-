from django.urls import path
from store.views import api_products, api_product, categorys_api, category_api, get_orders,  get_orderproduct, add_to_cart
urlpatterns=[
    path('products/',api_products, name='products-api'),
    path('products/<str:pk>/',api_product, name='api-product' ),
    path('category/',categorys_api, name='api-categorys' ),
    path('category/<str:pk>/',category_api, name='category-api' ),
    path('order/',get_orders, name='get-orders'),
    path('order/<str:pk>/',get_orderproduct, name='get-order'),
    path('cart/<int:pk>/',add_to_cart, name='add-cart')

#     path('product-detail/',ProductDetail.as_view(), name='product-detail'),
]     