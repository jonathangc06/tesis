import os
import sys
import webbrowser
import subprocess
import time

#  buscar manage.py en niveles superiores
def find_manage_py_up(start_dir, max_levels=5):
    current_dir = start_dir
    for _ in range(max_levels):
        if "manage.py" in os.listdir(current_dir):
            return current_dir  # encontado
        parent_dir = os.path.dirname(current_dir)  # subir una dreccionm
        if parent_dir == current_dir:
            break 
        current_dir = parent_dir
    return None

#  buscar 'manage.py' en subcarpetas
def find_manage_py_down(start_dir):
    for root, dirs, files in os.walk(start_dir):
        if "manage.py" in files:
            return root
    return None

# detectar ectension
if getattr(sys, 'frozen', False):
    BASE_DIR = os.path.dirname(sys.executable)  
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 



if "dist" in BASE_DIR.lower():  # Si el ejecutable está en 'dist', busca hacia arriba
    PROJECT_DIR = find_manage_py_up(BASE_DIR)
else:  # Si está en otra ubicación (Ej: Escritorio), busca en subcarpetas
    PROJECT_DIR = find_manage_py_down(BASE_DIR)



# Cambiar al directorio donde está 'manage.py'
os.chdir(PROJECT_DIR)

time.sleep(2)
webbrowser.open("http://127.0.0.1:8000/login")

subprocess.Popen(["python", "manage.py", "runserver"], shell=True)

