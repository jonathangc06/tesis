from django.urls import path
from .views import obtener_usuarios

urlpatterns = [
    path('usuarios/', obtener_usuarios, name='obtener_usuarios'),
]
