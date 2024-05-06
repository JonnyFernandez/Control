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
export const postProd = async (data) => {
    let info = {
        name: data.name,
        description: data.description,
        category: data.category,
        image: data.image,
        stock: Number(data.stock),
        cost: Number(data.cost),
        iva: Number(data.iva) / 100,
        iibb: Number(data.iibb) / 100,
        others: Number(data.others) / 100,
        gain: Number(data.gain) / 100,
        off: Number(data.off) / 100,
    }


    try {
        const res = await axios.post(`/prod`, info);
        return res.data;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
};


export const getProdById = async (id) => {
    try {
        const res = await axios(`/prod/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}
export const updateProduct = async (id, data) => {
    const info = {
        image: data.image,
        description: data.description,
        stock: Number(data.stock),
        cost: Number(data.cost),
        off: Number(data.off) / 100,
        iva: Number(data.iva) / 100,
        iibb: Number(data.iibb) / 100,
        others: Number(data.others) / 100,
        gain: Number(data.gain) / 100,
    }

    try {
        const res = await axios.put(`/prod/${id}`, info);
        return res;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}

export const updateStatusProd = async (id) => await axios.put(`/prod/status/${id}`)
export const deleteProd = async (id) => await axios.delete(`/prod/${id}`)
