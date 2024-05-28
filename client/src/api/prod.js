import axios from './axios'

export const apiGetProd = async () => await axios(`/prod`); // traer todos los prod
export const apiGetProdByName = async (name) => await axios(`/prod?name=${name}`); //prod por nombre

export const api_Like = async (data) => await axios.post(`/like`, data); //dar like
export const api_DisLike = async (id) => await axios.delete(`/like/${id}`); //dislike


export const api_prod_details = async (id) => await axios(`/prod/${id}`); //get by id
export const api_post_review = async (data) => await axios.post(`/review/`, data); //get by id

