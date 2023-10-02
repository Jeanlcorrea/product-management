from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from products.views.viewsets import ProductsViewSet

router = routers.DefaultRouter()
router.register(r'productmanagement', ProductsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
