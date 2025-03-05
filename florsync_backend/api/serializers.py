from rest_framework import serializers
from .models import Usuarios
from .models import Clientes
from .models import Producto


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__' 

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = '__all__'  

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

        def create(self, validated_data):
            id_producto = validated_data.get('id_producto')

        # Verificar si el ID ya existe
            if Producto.objects.filter(id_producto=id_producto).exists():
                raise serializers.ValidationError({"id_producto": "Este ID ya existe. No se puede duplicar."})

            return super().create(validated_data)