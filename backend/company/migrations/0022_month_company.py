# Generated by Django 3.2.9 on 2022-05-10 20:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0021_auto_20220510_1443'),
    ]

    operations = [
        migrations.AddField(
            model_name='month',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='months', to='company.company', verbose_name='Company'),
        ),
    ]