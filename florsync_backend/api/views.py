from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuarios
from .serializers import UsuariosSerializer
from django.contrib.auth import authenticate

@api_view(['GET'])
def obtener_usuarios(request):
    usuarios = Usuarios.objects.all()
    serializer = UsuariosSerializer(usuarios, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login_usuario(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"autenticado": True, "usuario": username})
    else:
        return Response({"autenticado": False}, status=401)