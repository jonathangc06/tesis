# Generated by Django 5.1.6 on 2025-02-19 03:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_post'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Cliente',
            new_name='clientes',
        ),
        migrations.RenameModel(
            old_name='Usuario',
            new_name='usuarios',
        ),
    ]
