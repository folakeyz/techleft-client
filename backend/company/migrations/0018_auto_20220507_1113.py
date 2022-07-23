# Generated by Django 3.2.9 on 2022-05-07 11:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('company', '0017_auto_20220507_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='phone',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='postal_code',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='province',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='contact_person',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='contact', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='employee',
            name='branch',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='company.branch', verbose_name='Branch'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='date_of_birth',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='join_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='postal_code',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='province',
            field=models.CharField(max_length=250, null=True),
        ),
    ]
