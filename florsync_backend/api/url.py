from django.urls import path
from .views import obtener_usuarios, login_usuario, registrar_producto, obtener_productos, visualizar_cliente
from .views import registrar_cliente, obtener_productoId, modificar_producto, modificar_clientes,obtener_clientesId

urlpatterns = [
    path('usuarios/', obtener_usuarios, name='obtener_usuarios'),  
    path('login/', login_usuario, name='login_usuario'), 
    path('registrar-cliente/',registrar_cliente, name='registrar_cliente'),
    path('registrar-producto/', registrar_producto, name='registrar_producto'), 
    path('obtener-productos/', obtener_productos, name='obtener_productos'),
    path('visualizar-cliente/', visualizar_cliente, name='visualizar_cliente'),
    path('obtener-productosID/<int:id>/', obtener_productoId, name='obtener_productosID'),
    path('modificar-productos/<int:id>/', modificar_producto, name='modificarproductos'),
    path('obtener-clientesID/<int:id>/', obtener_clientesId, name='obtener_clientesId'),
    path('modificar-clientes/<int:id>/', modificar_clientes, name='modificar_clientes'),


        
]
