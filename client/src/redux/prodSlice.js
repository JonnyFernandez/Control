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
        searchCategory: (state, action) => {
            const name = action.payload;
            state.allProd = state.backupProd.filter(products => products.category.toLowerCase().includes(name.toLowerCase()))

            // if (name == null) {
            //     state.allProd = state.backupProd;
            // } else {
            //     state.allProd = state.backupProd.filter(products => products.category.toLowerCase().includes(name.toLowerCase()))
            // }
        },
        serchStock: (state, action) => {
            const data = action.payload;
            if (data === "less") {
                state.allProd = state.backupProd.filter(products => products.stock < 10)
            } else if (data === "not") {
                state.allProd = state.backupProd.filter(products => products.stock <= 0)
            } else if (data === '') {
                state.allProd = state.backupProd;
            }
        },
        Offer: (state, action) => {
            const data = action.payload;
            if (data === "10") {
                state.allProd = state.backupProd.filter(products => products.off === 0.1)
            } else if (data === "15") {
                state.allProd = state.backupProd.filter(products => products.off === 0.15)
            } else if (data === "20") {
                state.allProd = state.backupProd.filter(products => products.off === 0.2)
            } else if (data === "30") {
                state.allProd = state.backupProd.filter(products => products.off === 0.3)
            } else if (data === '') {
                state.allProd = state.backupProd;
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


export const { getAllProd, getProd_ById, Offer, setPrevPage, searchCategory, serchStock, setNextPage, setCurrentPage, } = prodSlice.actions //esto seria como las actions
export default prodSlice.reducer