import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
    backup: [],
    currentPage: 1,
    favorites: [],
    shoppingCart: []
}


const prodSlice = createSlice({
    name: "prod",
    initialState,
    reducers: {
        getProd: (state, action) => {
            state.product = action.payload
            state.backup = action.payload
        },
        setCurrentPage: (state, action) => {
            const page = action.payload;
            state.currentPage = page
        },
        setPrevPage: (state, action) => {
            state.currentPage--
        },
        setNextPage: (state, action) => {
            state.currentPage++
        },
        searchCategory: (state, action) => {
            const name = action.payload;
            state.product = state.backup.filter(products => products.category.toLowerCase().includes(name.toLowerCase()))
        },
        searchByName: (state, action) => {
            const name = action.payload;
            console.log(name);
            if (name === null || name.trim() === "") {
                state.product = state.backup;
            } else {
                state.product = state.backup.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
            }
        },

        resetPro: (state, action) => {
            state.product = state.backup;
        },
        addFav: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFav: (state, action) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload);
        },
        setFavItems: (state, action) => {
            state.favorites = action.payload;
        },
        addCart: (state, action) => {
            state.shoppingCart.push(action.payload);
        },
        removeCard: (state, action) => {
            state.shoppingCart = state.shoppingCart.filter(item => item.id !== action.payload);
        },
        setCartItems: (state, action) => {
            state.shoppingCart = action.payload
        },








    }
})


export const { getProd, setCurrentPage, setPrevPage, setNextPage, searchCategory, searchByName, resetPro, addFav, removeFav, addCart, removeCard, setFavItems, setCartItems } = prodSlice.actions
export default prodSlice.reducer