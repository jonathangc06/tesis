import axios from "axios"; 

export const obtenerMensaje = () => {
    return axios.get('http://localhost:8000/api/login/api/') 
}