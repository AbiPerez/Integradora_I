# Generated by Django 3.0.6 on 2020-06-14 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_app', '0003_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.TextField(),
        ),
    ]