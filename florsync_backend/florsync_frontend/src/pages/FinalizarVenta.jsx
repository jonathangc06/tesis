import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { obtenerProductos } from "../api/test.api";
import "../css/Carrito.css";

const RealizarVenta = () => {
    const [productos, setProductos] = useState([]);
    const location = useLocation();

    useEffect(() => {
        obtenerProductos()
            .then(data => {
                setProductos(data);
            })
            .catch(error => console.error("Error al obtener productos:", error));
    }, []);

    const [carrito, setCarrito] = useState(() => 
        location.state?.carrito?.map(producto => ({
            ...producto,
            total: producto.precio * producto.cantidad
        })) || []
    );

    const [cliente, setCliente] = useState({
        nombre: "",
        cedula: "",
        telefono: "",
        correo: ""
    });

    const actualizarCantidad = (index, nuevaCantidad) => {
        let cantidadNumerica = parseInt(nuevaCantidad, 10);
    
        if (isNaN(cantidadNumerica)) {
            return; // Evita que el input se borre si el usuario está escribiendo
        }
    
        setCarrito(prevCarrito =>
            prevCarrito.map((producto, i) => {
                if (i === index) {
                    // Obtener el stock disponible
                    const stockDisponible = productos.find(p => p.id_producto === producto.id_producto)?.cantidad || 1;
    
                    // No actualizar aún, solo permitir cambios temporales
                    return { ...producto, cantidad: cantidadNumerica };
                }
                return producto;
            })
        );
    };
    
    // Aplicar la validación final cuando el usuario salga del campo de input
    const [inputValores, setInputValores] = useState({});

    const manejarCambio = (index, nuevaCantidad) => {
        // Permitir vacío temporalmente
        if (nuevaCantidad === "") {
            setInputValores(prev => ({ ...prev, [index]: "" }));
            return;
        }
    
        // Solo números enteros positivos
        const cantidadNumerica = parseInt(nuevaCantidad, 10);
        if (!isNaN(cantidadNumerica) && cantidadNumerica >= 1) {
            setInputValores(prev => ({ ...prev, [index]: cantidadNumerica }));
        }
    };
    
    const validarCantidad = (index, id_producto) => {
        const stockDisponible = productos.find(p => p.id_producto === id_producto)?.cantidad || 1;
        let cantidadFinal = parseInt(inputValores[index], 10);
    
        if (isNaN(cantidadFinal) || cantidadFinal < 1) {
            cantidadFinal = 1; // Mínimo 1
        } else if (cantidadFinal > stockDisponible) {
            cantidadFinal = stockDisponible; // Máximo stock disponible
        }
    
        setCarrito(prevCarrito =>
            prevCarrito.map((producto, i) =>
                i === index
                    ? { 
                        ...producto, 
                        cantidad: cantidadFinal, 
                        total: cantidadFinal * producto.precio 
                    }
                    : producto
            )
        );
    
     
        setInputValores(prev => ({ ...prev, [index]: null }));
    };

    const eliminarProducto = (index) => {
        setCarrito(prevCarrito => prevCarrito.filter((_, i) => i !== index));
    };

    useEffect(() => {
        document.body.classList.add("carrito-body");
        return () => {
            document.body.classList.remove("carrito-body");
        };
    }, []);

    const totalVenta = carrito.reduce((acc, producto) => acc + producto.total, 0);

    return (
        <div className="carrito-container">
            <h1 className="titulo">Realizar <span>venta</span></h1>

            {carrito.length === 0 ? (
                <p className="mensaje-vacio">No hay productos seleccionados.</p>
            ) : (
                carrito.map((producto, index) => (
                    <div key={index} className="producto-carrito">
                        <div className="producto-header">
                            <p>Nombre del producto</p>
                            <p>{producto.nombre}</p>
                        </div>
                        <div className="producto-info">
                            <p>Cantidad</p>
                            <input 
                                type="number" 
                                value={inputValores[index] ?? producto.cantidad} 
                                min="1" 
                                max={productos.find(p => p.id_producto === producto.id_producto)?.cantidad || 1} 
                                onChange={(e) => manejarCambio(index, e.target.value)} // Permite vacío temporal
                                onBlur={() => validarCantidad(index, producto.id_producto)} // Valida y corrige solo al salir
                            />
                        </div>
                        <div className="producto-info">
                            <p>Precio unitario</p>
                            <p>${producto.precio.toLocaleString()}</p>
                        </div>
                        <div className="producto-info">
                            <p>Precio total</p>
                            <p>${isNaN(producto.total) ? "$0" : producto.total.toLocaleString()}</p>
                        </div>
                        <button className="boton-eliminar" onClick={() => eliminarProducto(index)}>🗑 Eliminar</button>
                    </div>
                ))
            )}

            <div className="cliente-info">
                <input 
                    type="text" 
                    placeholder="Nombre cliente" 
                    value={cliente.nombre} 
                    onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Cédula" 
                    value={cliente.cedula} 
                    onChange={(e) => setCliente({ ...cliente, cedula: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Teléfono" 
                    value={cliente.telefono} 
                    onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })} 
                />
                <input 
                    type="email" 
                    placeholder="Correo" 
                    value={cliente.correo} 
                    onChange={(e) => setCliente({ ...cliente, correo: e.target.value })} 
                />
            </div>

            <div className="total-final">
                <h2>Total Final: <span>${totalVenta.toLocaleString()}</span></h2>
            </div>

            <button className="boton-realizar-venta">Realizar venta</button>
        </div>
    );
};

export default RealizarVenta;