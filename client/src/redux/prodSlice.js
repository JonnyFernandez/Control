import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
    backup: [],
    currentPage: 1,
    favorites: [],
    shoppingCart: [],
    details: {},
    categories: [],
    prodQuantity: [],


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
        cleanCart: (state, action) => {
            state.shoppingCart = []
        },
        postDetails: (state, action) => {
            state.details = action.payload;
        },
        addQuantity: (state, action) => {
            state.prodQuantity.push(action.payload);
        },
        deleteQuantity: (state, action) => {
            state.prodQuantity = state.prodQuantity.filter(item => item.id !== action.payload)
        },
        updateQuantity: (state, action) => {
            const data = action.payload;
            const id = data.id;
            const count = data.count;
            const prodIndex = state.prodQuantity.findIndex(item => item.id === id);

            if (prodIndex !== -1) {
                state.prodQuantity[prodIndex].count = count;
            }
        },
        setQuantyItems: (state, action) => {
            state.prodQuantity = action.payload
        },
        filterCategory: (state, action) => {
            const filterPro = state.backup.filter(item => item.category === action.payload)
            const reset = state.backup
            state.product = filterPro.length > 0 ? filterPro : reset

        },
        filterPrice: (state, action) => {
            let sortA = action.payload === 'min' ?
                state.backup.sort(function (a, b) {
                    if (a.price > b.price) { return 1 }
                    if (b.price > a.price) { return -1 }
                    return 0;
                }) :
                state.backup.sort(function (a, b) {
                    if (a.price < b.price) { return 1 }
                    if (b.price < a.price) { return -1 }
                    return 0;
                })
            state.product = sortA
        },

    },

})







export const { getProd, setCurrentPage, setPrevPage, setNextPage, searchCategory, addFav, removeFav, addCart, removeCard, setFavItems, setCartItems, cleanCart, postDetails, addQuantity, deleteQuantity, updateQuantity, setQuantyItems, filterCategory, filterPrice } = prodSlice.actions
export default prodSlice.reducer