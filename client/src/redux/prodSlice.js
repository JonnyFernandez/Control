import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allProd: [],
    backupProd: [],
    detail: [],
    currentPage: 1,
    paginate: [],
    cart: [],
}


export const prodSlice = createSlice({
    name: "prod",  //con ste nombre lo llamare desde el useSelector
    initialState,
    reducers: {


        getAllProd: (state, action) => {
            state.allProd = action.payload
            state.backupProd = action.payload
        },
        getProd_ById: (state, action) => {
            state.detail = action.payload
        },
        paginate: (state, action) => {
            state.paginate = action.payload
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
        searchName: (state, action) => {
            const name = action.payload;
            if (name == null) {
                state.allProd = state.backupProd;
            } else {
                state.allProd = state.backupProd.filter(products => products.name.toLowerCase().includes(name.toLowerCase()))
            }
        },


        // addToFavorites: (state, action) => {
        //     const existingChar = state.fav.find((char) => char.id === action.payload.id);
        //     if (!existingChar) {
        //         state.fav.push(action.payload);
        //     }
        // },
        // removeFromFavorites: (state, action) => {
        //     state.fav = state.fav.filter((char) => char.id !== action.payload);
        // },
        // setFavItems: (state, action) => {
        //     state.fav = action.payload
        // }
    }
})


export const { getAllProd, getProd_ById, setPrevPage, searchName, setNextPage, setCurrentPage, } = prodSlice.actions //esto seria como las actions
export default prodSlice.reducer