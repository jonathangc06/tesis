from django.db import models


class Clientes(models.Model):
    cedula = models.CharField(max_length=20, primary_key=True)
    direccion = models.TextField(blank=True, null=True)
    correo = models.EmailField(max_length=100, blank=True, null=True)
    nombre_cliente = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nombre_cliente

class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    contrasena = models.CharField(max_length=255)

    def __str__(self):
        return f"Usuario {self.id_usuario}"

class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE)

    def __str__(self):
        return f"Venta {self.id_venta}"

class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=100)
    cantidad = models.IntegerField()

    def __str__(self):
        return self.nombre

class DetalleVenta(models.Model):
    id_detalle = models.AutoField(primary_key=True)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

    def __str__(self):
        return f"Detalle {self.id_detalle} - Venta {self.venta.id_venta}"

class Reporte(models.Model):
    id_reporte = models.AutoField(primary_key=True)
    tipo_reporte = models.CharField(max_length=50)
    fecha = models.DateTimeField(auto_now_add=True)
    total_vendido = models.DecimalField(max_digits=10, decimal_places=2)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)

    def __str__(self):
        return f"Reporte {self.id_reporte}"

class ReporteProductosVendidos(models.Model):
    reporte = models.ForeignKey(Reporte, on_delete=models.CASCADE)
    producto_mas_vendido = models.CharField(max_length=100)
    cantidad = models.IntegerField()

    def __str__(self):
        return f"Reporte {self.reporte.id_reporte} - Producto {self.producto_mas_vendido}"
