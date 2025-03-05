from django.urls import path
from .views import obtener_usuarios, login_usuario, registrar_producto, obtener_productos
from .views import registrar_cliente

urlpatterns = [
    path('usuarios/', obtener_usuarios, name='obtener_usuarios'),  
    path('login/', login_usuario, name='login_usuario'), 
    path('registrar-cliente/',registrar_cliente, name='registrar_cliente'),
    path('registrar-producto/', registrar_producto, name='registrar_producto'), 
    path('obtener-productos/', obtener_productos, name='obtener_productos'),
       
]
