# Generated by Django 5.1.6 on 2025-02-18 22:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('cedula', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('direccion', models.TextField(blank=True, null=True)),
                ('correo', models.EmailField(blank=True, max_length=100, null=True)),
                ('nombre_cliente', models.CharField(max_length=100)),
                ('telefono', models.CharField(blank=True, max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tipo', models.CharField(max_length=50)),
                ('nombre', models.CharField(max_length=100)),
                ('cantidad', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Reporte',
            fields=[
                ('id_reporte', models.AutoField(primary_key=True, serialize=False)),
                ('tipo_reporte', models.CharField(max_length=50)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('total_vendido', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_usuario', models.AutoField(primary_key=True, serialize=False)),
                ('contrasena', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='ReporteProductosVendidos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('producto_mas_vendido', models.CharField(max_length=100)),
                ('cantidad', models.IntegerField()),
                ('reporte', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.reporte')),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id_venta', models.AutoField(primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cliente')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
        ),
        migrations.AddField(
            model_name='reporte',
            name='venta',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.venta'),
        ),
        migrations.CreateModel(
            name='DetalleVenta',
            fields=[
                ('id_detalle', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.IntegerField()),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.venta')),
            ],
        ),
    ]
