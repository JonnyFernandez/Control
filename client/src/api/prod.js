import axios from './axios'

export const apiGetProd = async () => await axios(`/prod`);
export const apiGetProdByName = async (name) => await axios(`/prod?name=${name}`);
export const apiPostLike = async (data) => await axios(`/like`, data);

