from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from products.models import Products
from products.serializers.products_serializer import ProductsSerializer


class ProductsViewSet(ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

    def get_queryset(self):
        return self.queryset

    def list(self, request, *args, **kwargs):
        product = Products.objects.get(product_name=request.data.get('product_name'))

        output = ProductsSerializer(instance=product)

        return Response(data=output.data, status=status.HTTP_200_OK)
