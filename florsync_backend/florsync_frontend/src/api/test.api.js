import axios from 'axios';

const API_URL = "http://localhost:8000/api"; 

export const obtenerUsuarios = async () => {
    return await axios.get(`${API_URL}/usuarios/`);
};


export const validarUsuario = async (id_usuario, password) => {
    
        const response = await axios.post(
            'http://localhost:8000/api/login/',  
            { id_usuario, password },  
            { headers: { 'Content-Type': 'application/json' } }  
        );

        console.log(' Inicio de sesión exitoso:', response.data);
        return response.data;
    
};

export const registrarClientes = async (clienteData) => {
    try {
        const response = await axios.post(
            'http://localhost:8000/api/registrar-cliente/', 
            clienteData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        

        console.log("Cliente registrado exitosamente:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al registrar cliente:", error.response?.data || error.message);
        throw error;
    }
};

export const registrarProducto = async (productoData) => {
    try {
        const response = await axios.post(
            `${API_URL}/registrar-producto/`, 
            productoData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log("Producto registrado exitosamente:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al registrar producto:", error.response?.data || error.message);
        throw error;
    }
};

export const obtenerProductos = async (nombre = "", id_producto = "", tipos = []) => {
    try {
        let url = `${API_URL}/obtener-productos/?`;
        if (nombre) url += `nombre=${encodeURIComponent(nombre)}&`;
        if (id_producto) url += `id_producto=${encodeURIComponent(id_producto)}&`;
        tipos.forEach(tipo => {
            url += `tipo=${encodeURIComponent(tipo)}&`;
        });

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};