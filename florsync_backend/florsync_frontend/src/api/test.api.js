import axios from 'axios';

export const obtenerUsuarios = async () => {
    return await axios.get("http://localhost:8000/api/usuarios/");
};
