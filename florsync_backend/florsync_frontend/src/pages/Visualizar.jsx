import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../api/test.api";

const Visualizar = () => {
    const [productos, setProductos] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [tipos, setTipos] = useState([]); 

    useEffect(() => {
        obtenerProductos()
            .then(data => {
                setProductos(data);

                // Extraer tipos únicos de los productos
                const tiposUnicos = [...new Set(data.map(producto => producto.tipo))];
                setTipos(tiposUnicos);
            })
            .catch(error => console.error("Error al obtener productos:", error));
    }, []);

    // Filtrado de productos
    const productosFiltrados = productos.filter(producto =>
        (producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) || 
         producto.id_producto.toString().includes(filtroNombre)) &&
        (filtroTipo === "" || producto.tipo === filtroTipo)
    );

    return (
        <div>
            <h2>Lista de Productos</h2>

            {/* Filtros */}
            <div>
                <input
                    type="text"
                    placeholder="Buscar por nombre o referencia (ID)"
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                />
                <select onChange={(e) => setFiltroTipo(e.target.value)} value={filtroTipo}>
                    <option value="">Todos los tipos</option>
                    {tipos.map((tipo, index) => (
                        <option key={index} value={tipo}>{tipo}</option>
                    ))}
                </select>
            </div>

            {/* Tabla con productos filtrados */}
            {productosFiltrados.length === 0 ? (
                <p>No hay productos que coincidan con los filtros.</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(producto => (
                            <tr key={producto.id_producto}>
                                <td>{producto.id_producto}</td>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.tipo}</td>
                                <td>{producto.cantidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Visualizar;
