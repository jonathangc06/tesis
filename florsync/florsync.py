import os
import webbrowser
import subprocess
import time

# Obtiene la ruta del directorio donde está el script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)  

# Abre la página en el navegador
webbrowser.open("http://127.0.0.1:8000/login")

subprocess.Popen(["python", "manage.py", "runserver"], shell=True)

