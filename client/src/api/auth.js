import axios from './axios';




export const registerRequest = async (user) => {
    let info = {
        email: user.email,
        password: user.password,
        username: user.username
    };

    try {
        const res = await axios.post(`/register`, info);
        return res.data;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
};
export const loginRequest = async (user) => {
    let info = {
        email: user.email,
        password: user.password,
    };

    try {
        const res = await axios.post(`/login`, info);
        return res;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
};


export const verifyTokenRequest = () => axios.get('/verify')