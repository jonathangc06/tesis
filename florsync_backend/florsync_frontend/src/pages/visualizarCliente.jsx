import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios"; 
import "../css/VisualizarClientes.css";

const VisualizarCliente = () => {
  const { tipo } = useParams(); 
  const [cedulaBuscar, setCedulaBuscar] = useState(""); 
  const [cliente, setCliente] = useState({
    cedula: "",
    nombre_cliente: "",
    telefono: "",
    direccion: "",
    correo: "",
    compras: "0",
    fecha_registro: "",
  });


  const buscarCliente = async () => {
    if (!cedulaBuscar) {
        alert("Por favor, ingrese una cédula.");
        return;
    }
    try {
        const response = await axios.get("http://localhost:8000/api/visualizar-cliente/", {
            params: { cedula: cedulaBuscar } 
        });

        if (response.data.length > 0) {
            setCliente(response.data[0]); 
        } else {
            alert("Cliente no encontrado.");
            setCliente({ 
                cedula: "",
                nombre_cliente: "",
                telefono: "",
                direccion: "",
                correo: "",
                compras: "0",
                fecha_registro: "",
            });
        }
    } catch (error) {
        console.error("Error al buscar cliente:", error.response?.data || error.message);
        alert("Error al buscar cliente. Verifica la cédula ingresada.");
    }
};

  return (
    <div className="visualizarCliente">
      <h1>Clientes Registrados ({tipo})</h1> {/* Tipo de cliente desde la URL */}

      {/* Input para buscar por cédula */}
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Buscar por cédula"
          value={cedulaBuscar}
          onChange={(e) => setCedulaBuscar(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && buscarCliente()} // Buscar con Enter
        />
        <button onClick={buscarCliente}>Buscar</button> {/* Botón de búsqueda */}
      </div>

      <div className="container">
        <table className="table">
          <tbody>
            <tr>
              <td>Cédula</td>
              <td>{cliente.cedula || "-"}</td>
            </tr>
            <tr>
              <td>Nombre</td>
              <td>{cliente.nombre_cliente || "-"}</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td>{cliente.telefono || "-"}</td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>{cliente.direccion || "-"}</td>
            </tr>
            <tr>
              <td>Correo</td>
              <td>{cliente.correo || "-"}</td>
            </tr>
            <tr>
              <td>Compras en el mes</td>
              <td>{cliente.compras || "0"}</td>
            </tr>
            <tr>
              <td>Fecha de registro</td>
              <td>{cliente.fecha_registro || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisualizarCliente;