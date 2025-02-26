from django.urls import path
from .views import obtener_usuarios, login_usuario

urlpatterns = [
    path('usuarios/', obtener_usuarios, name='obtener_usuarios'),  
    path('login/', login_usuario, name='login_usuario'),  
]
