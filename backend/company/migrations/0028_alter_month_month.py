# Generated by Django 3.2.9 on 2022-06-01 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0027_company_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='month',
            name='month',
            field=models.CharField(blank=True, max_length=250, null=True, unique=True),
        ),
    ]
