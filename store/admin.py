from django.contrib import admin
from store.models import Category, Product, Order
# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
