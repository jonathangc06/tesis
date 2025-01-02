import os
import webbrowser
import subprocess
import time

os.chdir("C:/Users/aleja/Desktop/tesis/florsync")


webbrowser.open("http://127.0.0.1:8000/login")


subprocess.Popen(["start", "python", "manage.py", "runserver"], shell=True)

