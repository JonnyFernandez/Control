import axios from './axios'

export const apiGetProd = async () => await axios(`/prod`);
export const apiGetProdByName = async (name) => await axios(`/prod?name=${name}`);

export const api_Like = async (data) => await axios.post(`/like`, data);
export const api_DisLike = async (id) => await axios.delete(`/like/${id}`);

