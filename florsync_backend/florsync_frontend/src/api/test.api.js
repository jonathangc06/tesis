import axios from 'axios';

const API_URL = "http://localhost:8000/api"; // Ajusta la URL según tu backend

export const obtenerUsuarios = async () => {
    return await axios.get(`${API_URL}/usuarios/`);
};

export const validarUsuario = async (datos) => {
    return await axios.post("http://localhost:8000/api/login/", datos);
};
