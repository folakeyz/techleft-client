# Generated by Django 3.2.9 on 2022-05-11 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0023_alter_month_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='month',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
