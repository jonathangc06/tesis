from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuarios
from .models import Clientes
from .serializers import UsuariosSerializer
from django.contrib.auth.hashers import check_password
from rest_framework import status


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
    
@api_view(['POST'])
def registrar_cliente(request):
    print("Datos recibidos en Django:", request.data)  

    cedula = request.data.get("cedula", "").strip()
    direccion = request.data.get("direccion", "").strip()
    correo = request.data.get("correo", "").strip()
    nombre_cliente = request.data.get("nombre_cliente", "").strip()
    telefono = request.data.get("telefono", "").strip()

    clientes = Clientes(
        cedula=cedula, 
        direccion=direccion if direccion else None,  
        correo=correo if correo else None,  
        nombre_cliente=nombre_cliente, 
        telefono=telefono if telefono else None  
    )

    try:
        clientes.save()
        return Response({"mensaje": "Cliente registrado con éxito"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        print("Error al guardar en la base de datos:", str(e)) 
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
