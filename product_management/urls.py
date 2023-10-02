from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from products.views.viewsets import ProductsViewSet, ProductByNameViewSet

router = routers.DefaultRouter()
router.register(r'productmanagement', ProductsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('productmanagement/product', ProductByNameViewSet.as_view()),
    path('admin/', admin.site.urls),
]
