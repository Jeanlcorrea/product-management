from django.contrib import admin
from django.urls import path
from products.views.viewsets import ProductByNameViewSet

app_name = 'productmanagement'

urlpatterns = [
    path(f'{app_name}/<str:product>', ProductByNameViewSet.as_view()),
    path('admin/', admin.site.urls),
]
