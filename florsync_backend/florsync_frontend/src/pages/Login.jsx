import React, { useEffect, useState } from 'react';
import { obtenerMensaje } from '../api/test.api';
import '../css/styles.css';


const Login = () => {
    
    const [mensaje, setMensaje] = useState(""); 

    useEffect(() => {
        
        async function cargarMensaje() {
            try {
                const res = await obtenerMensaje();  
                setMensaje(res.data.message); 
                console.log(res.data.message);
            } catch (error) {
                console.error("Error al obtener el mensaje:", error); 
            }
        }
        
        cargarMensaje(); // funcion para cargar el mensaje
    }, []);  

    const handleSubmit = (e) => {
        e.preventDefault();  
        console.log("Enviando login con:");
      };

      return (
        <div>
          <div className="imagenes">
            <img src="/images/girasoles.png" className="img1" alt="Girasoles" />
            <img src="/images/img_rosas_rojas.png" className="img2" alt="Rosas Rojas" />
            <img src="/images/img_rosas_rosadas.png" className="img3" alt="Rosas Rosadas" />
          </div>
    
          <div className="login-section">
            <h2>Iniciar sesión</h2>
            <form>
              <input type="text" id="username" name="username" placeholder="Digite su usuario" required />
              <input type="password" id="password" name="password" placeholder="Digite su contraseña" required />
              <button type="submit">INICIAR SESIÓN</button>
            </form>
          </div>
    
          <label className="label-corner">FlorSync</label>
        </div>
      );
}

export default Login;