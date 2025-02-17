from django.urls import path, include
from rest_framework import routers
from api import views     # Asegúrate de que sea un ViewSet

router = routers.DefaultRouter()
router.register(r'api', views.SaludoViewSet ,'saludo')

urlpatterns = [
    path('login/', include(router.urls)),  # Aquí usamos router.urls
]
