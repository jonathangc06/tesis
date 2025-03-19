from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuarios
from .models import Clientes, Producto
from .serializers import ClienteSerializer, ProductoSerializer
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
    if Clientes.objects.filter(cedula=cedula).exists():
            return Response({"error": "Esta cedula ya esta  registrada"}, status=status.HTTP_400_BAD_REQUEST)

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

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Producto

@api_view(['POST'])
def registrar_producto(request):
    id_producto = request.data.get("id_producto")
    nombre = request.data.get("nombre")
    precio = request.data.get("precio")
    tipo = request.data.get("tipo")
    cantidad = request.data.get("cantidad")

    # Verificar que todos los datos están presentes
    if not all([id_producto, nombre, precio, tipo, cantidad]):
        return Response({"error": "Todos los campos son obligatorios"}, status=status.HTTP_400_BAD_REQUEST)

    # Validar si ya existe un producto con ese ID
    if Producto.objects.filter(id_producto=id_producto).exists():
        return Response({"error": "El producto con este ID ya existe."}, status=status.HTTP_400_BAD_REQUEST)

    # Crear el producto solo si el ID no existe
    producto = Producto(
        id_producto=id_producto,
        nombre=nombre,
        precio=precio,
        tipo=tipo,
        cantidad=cantidad
    )

    try:
        producto.save()
        return Response({"mensaje": "Producto registrado con éxito"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def obtener_productos(request):
    nombre = request.GET.get('nombre', None)
    referencia = request.GET.get('id_producto', None)
    tipos = request.GET.getlist('tipo')  # Permite filtrar por varios tipos

    productos = Producto.objects.all()

    if nombre:
        productos = productos.filter(nombre__icontains=nombre)  # Búsqueda flexible

    if referencia:
        productos = productos.filter(id_producto=referencia)

    if tipos:
        productos = productos.filter(tipo__in=tipos)  # Filtra por lista de tipos

    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def visualizar_cliente(request):
    cedula = request.GET.get('cedula', None)
    nombre_cliente = request.GET.get('nombre_cliente', None)
    telefono = request.GET.get('telefono', None)

    clientes = Clientes.objects.all()

    if cedula:
        clientes = clientes.filter(cedula__icontains=cedula)  # Filtrar por cédula

    if nombre_cliente:
        clientes = clientes.filter(nombre__icontains=nombre_cliente)  # Filtrar por nombre

    if telefono:
        clientes = clientes.filter(telefono__icontains=telefono)  # Filtrar por teléfono

    serializer = ClienteSerializer(clientes, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def obtener_productoId(request, id):
    try:
        producto = Producto.objects.get(id_producto=id)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Producto.DoesNotExist:
        return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['Put'])
def modificar_producto(request, id):
    try:
        producto = Producto.objects.get(id_producto=id)
    except Producto.DoesNotExist:
        return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    print("Datos recibidos:", request.data)  # 👀 Ver los datos en la terminal

    try:
        serializer = ProductoSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Datos inválidos", "detalles": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": "Error interno del servidor", "detalles": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['GET'])
def obtener_clientesId(request, id):
    try:
        clientes = Clientes.objects.get(cedula=id)
        serializer = ClienteSerializer(clientes)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Clientes.DoesNotExist:
        return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['Put'])
def modificar_clientes(request, id):
    try:
        cliente = Clientes.objects.get(cedula=id)
    except Clientes.DoesNotExist:
        return Response({"error": "Cliente no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ClienteSerializer(cliente, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "Datos inválidos", "detalles": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)