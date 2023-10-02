from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from products.models import Products
from products.serializers.products_serializer import ProductsSerializer


class ProductsViewSet(ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

    def get_queryset(self):
        return self.queryset


class ProductByNameViewSet(views.APIView):
    def get(self, request):
        product = Products.objects.get(product_name=request.data.get('product_name'))

        output_data = ProductsSerializer(instance=product)

        return Response(data=output_data.data, status=status.HTTP_200_OK)
