import React, { useEffect, useState } from "react";
import { obtenerUsuarios, validarUsuario } from "../api/test.api"; // Asegúrate de tener esta función en la API
import "../css/styles.css";

const Login = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: "",
    password: "",
  });

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const res = await obtenerUsuarios();
        console.log("Usuarios obtenidos:", res.data);
        setUsuarios(res.data); // Guardar los usuarios en el estado
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    }
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  

  

    try {
        const { id_usuario, password } = formData;  
        if (!id_usuario || !password) {
            alert(" Completa todos los campos");
            return;
        }

        const res = await validarUsuario(id_usuario, password);  
        console.log("🔵 Respuesta del servidor:", res);

        if (res.autenticado) { 
            alert("✅ Inicio de sesión exitoso");
        } else {
            alert(" Usuario o contraseña incorrectos");
        }
    } catch (error) {
        console.error(" Error en el inicio de sesión:", error.response?.data || error.message);
        alert(" Hubo un error al intentar iniciar sesión");
    }
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
          <input type="text" name="id_usuario" placeholder="Digite su usuario" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Digite su contraseña" onChange={handleChange} required />
          <button type="button" onClick={handleSubmit}>INICIAR SESIÓN</button>
        </form>
      </div>

      <label className="label-corner">FlorSync</label>
    </div>
  );
};

export default Login;