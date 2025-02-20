import React, { useEffect, useState } from 'react';
import { obtenerUsuarios } from '../api/test.api';
import '../css/styles.css';

const Login = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function cargarUsuarios() {
            try {
                const res = await obtenerUsuarios();
                console.log("Usuarios obtenidos:", res.data);
                setUsuarios(res.data);  // Guardar los usuarios en el estado
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        }
        cargarUsuarios();
    }, []);

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
};

export default Login;
