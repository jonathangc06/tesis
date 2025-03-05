import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Registrar.css";
import { registrarClientes } from "../api/test.api";


const Registrar = () => {
  const modulos = {
    inventario: {
      titulo: "Nuevo Producto",
      datos: [
        { campo: "id_producto", etiqueta: "Número de referencia" },
        { campo: "nombre", etiqueta: "Nombre del producto" },
        { campo: "precio", etiqueta: "Precio del producto" },
        { campo: "tipo", etiqueta: "Tipo del producto" },
        { campo: "cantidad", etiqueta: "Cantidad" },
      ],
    },
    clientes: {
      titulo: "Nuevo Cliente",
      datos: [
        { campo: "cedula", etiqueta: "Cédula" },
        { campo: "nombre_cliente", etiqueta: "Nombre del cliente" },
        { campo: "direccion", etiqueta: "Dirección" },
        { campo: "correo", etiqueta: "Correo electrónico" },
        { campo: "telefono", etiqueta: "Teléfono" },
      ],
    },
  };

  const { tipo } = useParams();
  const mappings = {
    "añadir-nuevo-producto": "inventario",
    "registrar-cliente": "clientes",
  };

  const moduloSeleccionado = mappings[tipo] || tipo;
  const modulo = modulos[moduloSeleccionado];

  if (!modulo) {
    return <p>Tipo de formulario no reconocido</p>;
  }

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 📌 Evita que la página se recargue

    console.log("Formulario enviado con:", formData); // 📌 Depuración

    try {
        if (moduloSeleccionado === "inventario") {
            alert("Producto registrado con éxito");
        } else {
            await registrarClientes(formData); 
            alert("Cliente registrado con exito.");
        }
    } catch (error) {
        console.error("Error al registrar:", error); // 📌 Depuración de errores
        alert("Error al registrar el producto");
    }
};
  useEffect(() => {
    document.body.classList.add("formulario-body");
    return () => {
      document.body.classList.remove("formulario-body");
    };
  }, []);

  return (
    <div className="formulario-body">
      <div className="formulario-header">
        <h1>{modulo.titulo}</h1>
      </div>
      <div className="formulario-container">
        <form className="formulario-form" onSubmit={handleSubmit}>
          {modulo.datos.map((campo) => (
            <div key={campo.campo} className="formulario-item">
              <input
                type={
                  campo.campo === "cantidad" || campo.campo === "precio" || campo.campo === "id_producto"
                    ? "number"
                    : campo.campo === "correo"
                    ? "email"
                    : "text"
                }
                name={campo.campo}
                placeholder={campo.etiqueta}
                value={formData[campo.campo] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className="formulario-button">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrar;