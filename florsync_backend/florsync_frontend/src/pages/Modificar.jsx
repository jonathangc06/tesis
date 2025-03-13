import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductoPorID, modificarProducto} from "../api/test.api";
import "../css/Modificar.css";

const Modificar = () => {
    const { tipo, id } = useParams(); // Obtiene tipo ("producto" o "cliente") y el ID desde la URL
    const [filtroID, setFiltroID] = useState(id || "");
    const [formData, setFormData] = useState({});
    const [camposEditables, setCamposEditables] = useState({});
    const [error, setError] = useState("");

    const datosProducto = [
        { campo: "id_producto", etiqueta: "ID Producto" },
        { campo: "nombre", etiqueta: "Nombre" },
        { campo: "precio", etiqueta: "Precio" },
        { campo: "tipo", etiqueta: "Tipo" },
        { campo: "cantidad", etiqueta: "Cantidad" },
    ];


    
    const datosCliente = [
        { campo: "id_cliente", etiqueta: "ID Cliente" },
        { campo: "nombre", etiqueta: "Nombre" },
        { campo: "telefono", etiqueta: "Teléfono" },
        { campo: "direccion", etiqueta: "Dirección" },
        { campo: "correo", etiqueta: "Correo" },
    ];

    useEffect(() => {
        if (filtroID) {
            buscarPorID();
        }
    }, [filtroID]);

    const buscarPorID = async () => {
        try {
            setError("");
            let data;
            if (tipo === "actualizar-producto") {
                data = await obtenerProductoPorID(filtroID);
            } else {
                
            }
            setFormData(data);
            setCamposEditables({});
        } catch (error) {
            setError("No se encontró ningún registro con ese ID.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (campo) => {
        setCamposEditables((prev) => ({ ...prev, [campo]: !prev[campo] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (tipo === "actualizar-producto") {
                await modificarProducto(formData.id_producto, formData);
            } else {
               
            }
            alert(`${tipo === "actualizar-producto" ? "Producto" : "Cliente"} modificado exitosamente`);
        } catch (error) {
            alert("Error al modificar: " + error.message);
        }
    };

    useEffect(() => {
        document.body.classList.add("modificar-body"); 
    
        return () => {
          document.body.classList.remove("modificar-body"); 
        };
      }, []);

    return (
<div className="modificar-body">
    <div className="modificar-header">
        <h2>Modificar {tipo === "actualizar-producto" ? "Producto" : "Cliente"}</h2>
    </div>

    <input
        type="text"
        className="buscador"
        placeholder={`Digite el ID del ${tipo}`}
        value={filtroID}
        onChange={(e) => setFiltroID(e.target.value)}
    />
    <button className="btn-buscar" onClick={buscarPorID}>Buscar</button>

    {error && <p className="error">{error}</p>}

    {formData && Object.keys(formData).length > 0 && (
        <div className="modificar-container">
            <form onSubmit={handleSubmit} className="formulario">
                {(tipo === "actualizar-producto" ? datosProducto : datosCliente).map((dato) => (
                    <div key={dato.campo} className="fila">
                        <input type="checkbox" onChange={() => handleCheckboxChange(dato.campo)} />
                        <label>{dato.etiqueta}</label>
                        
                        <div className="columna">
                            <input
                                type="text"
                                name={dato.campo}
                                className={camposEditables[dato.campo] ? "input-editable" : "input-deshabilitado"}
                                value={formData[dato.campo] || dato.valorActual || ""}
                                onChange={handleChange}
                                disabled={!camposEditables[dato.campo]}
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" className="btn-modificar">
                    Modificar {tipo === "actualizar-producto" ? "Producto" : "Cliente"}
                </button>
            </form>
        </div>
    )}
</div>
    );
};

export default Modificar;
