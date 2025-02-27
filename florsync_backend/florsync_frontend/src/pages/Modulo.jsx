import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/ModuloStyles.css";

const Modulo = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();

  // Diccionario de módulos con imágenes en lugar de íconos
  const modulos = {
    inventario: {
      titulo: "Inventario",
      opciones: [
        { nombre: "Añadir nuevo producto", imagen: "/images/nuevo_producto.png" },
        { nombre: "Actualizar producto", imagen: "/images/actualizar_producto.png" },
        { nombre: "Visualizar inventario actual", imagen: "/images/inventario_actual.png" },
      ],
    },
    ventas: {
      titulo: "Ventas",
      opciones: [
        { nombre: "Registrar venta", imagen: "/images/vender.png" },
        { nombre: "Historial de ventas", imagen: "/images/historial.png" },
      ],
    },
    clientes: {
      titulo: "Clientes",
      opciones: [
        { nombre: "Registrar cliente", imagen: "/images/añadir_cliente.png" },
        { nombre: "Modificar clientes existentes", imagen: "/images/editar_cliente.png" },
        { nombre: "Visualizar cliente", imagen: "/images/ver_cliente.png" },
        { nombre: "Eliminar cliente", imagen: "/images/eliminar_cliente.png" },
      ],
    },
    informes: {
      titulo: "Informes",
      opciones: [
        { nombre: "Informe diario", imagen: "/images/informe_diario.png" },
        { nombre: "Informe mensual", imagen: "/images/informe_mensual.png" },
      ],
    },
  };

  // Obtener el módulo correspondiente
  const modulo = modulos[nombre];

  useEffect(() => {
    document.body.classList.add("modulo-body");
    return () => {
      document.body.classList.remove("modulo-body");
    };
  }, []);

  if (!modulo) {
    return <h1 className="error">Módulo no encontrado</h1>;
  }

  return (
    <div className="modulo-body">
      <header className="modulo-header">
        <h1 className="titulo">{modulo.titulo}</h1>
      </header>
      <div className="modulo-container">
        <div className="modulo-content">
          {modulo.opciones.map((opcion, index) => (
            <button
              key={index}
              className="modulo-item"
              onClick={() => navigate(`/${nombre}/${opcion.nombre.toLowerCase().replace(/\s/g, "-")}`)}
            >
              <span>{opcion.nombre}</span>
              <img src={opcion.imagen} alt={opcion.nombre} className="icono" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modulo;
