from django.db import models

from products.enum import CategoryTypesEnum


class Products(models.Model):
    product_name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=50, null=True, default=None)
    category = models.CharField(max_length=50, choices=CategoryTypesEnum.choices(field_pattern=("name", "name")),
                                default='INDEFINIDO')

    def __str__(self):
        return self.product_name
