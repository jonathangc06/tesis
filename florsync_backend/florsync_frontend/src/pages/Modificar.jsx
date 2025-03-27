import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerProductoPorID, modificarProducto, obtenerClientesPorID, modificarCliente } from "../api/test.api";
import "../css/Modificar.css";

const Modificar = () => {
    const { tipo, id } = useParams();
    const navigate = useNavigate();
    const [filtroID, setFiltroID] = useState(id || "");
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [modificadoExitoso, setModificadoExitoso] = useState(false);

    const datosProducto = [
        { campo: "nombre", etiqueta: "Nombre" },
        { campo: "precio", etiqueta: "Precio" },
        { campo: "tipo", etiqueta: "Tipo" },
        { campo: "cantidad", etiqueta: "Cantidad" },
    ];

    const datosCliente = [
        { campo: "cedula", etiqueta: "ID Cliente" },
        { campo: "nombre_cliente", etiqueta: "Nombre" },
        { campo: "telefono", etiqueta: "Teléfono" },
        { campo: "direccion", etiqueta: "Dirección" },
        { campo: "correo", etiqueta: "Correo" },
    ];

    useEffect(() => {
        document.body.classList.add("modificar-body");
        return () => {
            document.body.classList.remove("modificar-body");
        };
    }, []);

    const buscarPorID = async () => {
        try {
            setError("");
            setModificadoExitoso(false);
            let data;
            if (tipo === "actualizar-producto") {
                data = await obtenerProductoPorID(filtroID);
            } else if (tipo === "modificar-clientes-existentes") {
                data = await obtenerClientesPorID(filtroID);
            } else {
                throw new Error("Tipo no válido");
            }
            setFormData(data);
        } catch (error) {
            setError("No se encontró ningún registro con ese ID.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (
            ["precio", "cantidad", "telefono", "cedula"].includes(name) &&
            !/^\d*$/.test(value)
        ) return;

        if (name === "correo" && value.length > 50) return;
        if (value.length > 45 && name !== "correo") return;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validarCampos = () => {
        if (tipo === "actualizar-producto") {
            const { nombre, precio, tipo: tipoProd, cantidad } = formData;
            if (!nombre || !precio || !tipoProd || !cantidad) {
                setError("Todos los campos deben estar completos.");
                return false;
            }
        } else {
            const { cedula, nombre_cliente, telefono, direccion, correo } = formData;
            if (!cedula || !nombre_cliente || !telefono || !direccion || !correo) {
                setError("Todos los campos deben estar completos.");
                return false;
            }
            if (cedula.length < 10 || telefono.length < 10) {
                setError("La cédula y el teléfono deben tener al menos 10 dígitos.");
                return false;
            }
            const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
            if (!correoValido) {
                setError("El correo no es válido.");
                return false;
            }
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCampos()) return;

        try {
            if (tipo === "actualizar-producto") {
                await modificarProducto(formData.id_producto, formData);
            } else {
                await modificarCliente(formData.cedula, formData);
            }
            setModificadoExitoso(true);
        } catch (error) {
            alert("Error al modificar: " + error.message);
        }
    };

    const volverAlInicio = () => navigate("/menu");
    const modificarOtro = () => {
        setFormData({});
        setFiltroID("");
        setModificadoExitoso(false);
    };

    return (
        <div className="modificar-body">
            <div className="modificar-header">
                <h2>Modificar {tipo === "actualizar-producto" ? "Producto" : "Cliente"}</h2>
            </div>

            {!modificadoExitoso && (
                <>
                    <input
                        type="text"
                        className="buscador"
                        placeholder="Buscar por ID"
                        value={filtroID}
                        onChange={(e) => setFiltroID(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && buscarPorID()}
                    />
                    <button className="btn-buscar" onClick={buscarPorID}>Buscar</button>
                </>
            )}

            {error && <p className="error">{error}</p>}

            {modificadoExitoso ? (
                <div className="mensaje-exito">
                    <h3>¡{tipo === "actualizar-producto" ? "Producto" : "Cliente"} modificado exitosamente!</h3>
                    <button className="btn-volver" onClick={volverAlInicio}>Volver al Menú Principal</button>
                    <button className="btn-modificar" onClick={modificarOtro}>Modificar Otro</button>
                </div>
            ) : (
                formData && Object.keys(formData).length > 0 && (
                    <div className="modificar-container">
                        <form onSubmit={handleSubmit} className="formulario">
                            {(tipo === "actualizar-producto" ? datosProducto : datosCliente).map((dato) => (
                                <div key={dato.campo} className="fila">
                                    <label>{dato.etiqueta}</label>
                                    <div className="columna">
                                        <input
                                            type="text"
                                            name={dato.campo}
                                            className="input-editable"
                                            value={formData[dato.campo] || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="botones-finales">
                                <button type="submit" className="btn-modificar">
                                    Modificar {tipo === "actualizar-producto" ? "Producto" : "Cliente"}
                                </button>
                                <button type="button" className="btn-volver" onClick={() => navigate("/")}>
                                    Volver al Menú Principal
                                </button>
                            </div>
                        </form>
                    </div>
                )
            )}
        </div>
    );
};

export default Modificar;