from rest_framework import viewsets
from rest_framework.response import Response

class SaludoViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "Hola desde Django con ViewSet!"})