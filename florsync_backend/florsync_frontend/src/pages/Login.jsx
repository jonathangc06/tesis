import React, { useEffect, useState } from "react";
import { obtenerUsuarios, validarUsuario } from "../api/test.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Importar contexto de autenticación
import "../css/styles.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto
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
        setUsuarios(res.data);
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
        alert("Completa todos los campos");
        return;
      }
  
      const res = await validarUsuario(id_usuario, password);
      console.log("🔵 Respuesta del servidor:", res); // DEBUG
  
      if (res.autenticado) {
        
        login(); 
        setTimeout(() => navigate("/menu"), 500); 
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.response?.data || error.message);
      alert("Usuario o contraseña incorrectos");

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
        <form onSubmit={handleSubmit}>
        <input type="number" name="id_usuario" placeholder="Número de usuario" onChange={handleChange} min="1" required />
        <input type="password" name="password" placeholder="Digite su contraseña" onChange={handleChange} required />
          <button type="submit">INICIAR SESIÓN</button>
        </form>
      </div>

      <label className="label-corner">FlorSync</label>
    </div>
  );
};

export default Login;
