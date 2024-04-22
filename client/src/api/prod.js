import axios from './axios'


export const getProd = async () => {
    try {
        const res = await axios(`/prod`);
        return res.data;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}