from rest_framework import status, views
from rest_framework.response import Response
from products.models import Products
from products.serializers.products_serializer import ProductsSerializer


class ProductByNameViewSet(views.APIView):

    def get(self, request, product: str):
        try:
            product = Products.objects.get(product_name__iexact=product)
            output_data = ProductsSerializer(instance=product)

            return Response(data=output_data.data, status=status.HTTP_200_OK)

        except Products.DoesNotExist:
            return Response({'error': 'Produto não encontrado'}, status=status.HTTP_404_NOT_FOUND)
