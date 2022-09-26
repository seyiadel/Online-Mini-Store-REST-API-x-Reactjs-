from django.urls import path
from store.views import OrderItem, ProductList, ProductDetail, CategoryList, CategoryDetail, OrderListCreate
from rest_framework.documentation import include_docs_urls # new
from rest_framework.schemas import get_schema_view



schema_view = get_schema_view(title='Mini Online Store REST API by ADeL')


urlpatterns=[
    path('products/',ProductList.as_view(), name='products-api'),
    path('products/<str:pk>/',ProductDetail.as_view(), name='api-product' ),
    path('category/',CategoryList.as_view(), name='api-categorys' ),
    path('category/<str:pk>/',CategoryDetail.as_view(), name='category-api' ), 
    path('order/',OrderListCreate.as_view(), name='get-orders'),
    path('order/<str:pk>/',OrderItem.as_view(), name='get-order'),
    # path('cart/', name='add-cart'),
    path('docs/', include_docs_urls(title='Mini Online Store REST API by ADeL')), # new
    path('schema/', schema_view),
]