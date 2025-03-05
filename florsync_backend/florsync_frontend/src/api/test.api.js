import axios from 'axios';

const API_URL = "http://localhost:8000/api"; // Ajusta la URL según tu backend

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