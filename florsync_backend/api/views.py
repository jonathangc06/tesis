from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuarios
from .serializers import UsuariosSerializer

@api_view(['GET'])
def obtener_usuarios(request):
    usuarios = Usuarios.objects.all()
    serializer = UsuariosSerializer(usuarios, many=True)
    return Response(serializer.data)
