# Generated by Django 4.2.5 on 2023-10-02 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_alter_products_category_alter_products_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='brand',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
    ]
