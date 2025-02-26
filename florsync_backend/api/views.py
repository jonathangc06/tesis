from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuarios
from .serializers import UsuariosSerializer
from django.contrib.auth.hashers import check_password

@api_view(['GET'])
def obtener_usuarios(request):
    usuarios = Usuarios.objects.all()
    serializer = UsuariosSerializer(usuarios, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login_usuario(request):
    print("Datos recibidos en login:", request.data)  

    id_usuario = request.data.get("id_usuario")
    password = request.data.get("password")

    if not id_usuario or not password:
        return Response({"error": "Faltan datos"}, status=400)

    try:
        usuario = Usuarios.objects.get(id_usuario=id_usuario)
    except Usuarios.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)

    if usuario.verificar_contraseña(password):
        return Response({"autenticado": True, "id_usuario": usuario.id_usuario})
    else:
        return Response({"autenticado": False, "error": "Credenciales incorrectas"}, status=401)
