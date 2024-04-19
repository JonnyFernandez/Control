import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allProd: [],
    backupProd: [],
    detail: [],
    paginate: [],
    cart: [],
}


export const prodSlice = createSlice({
    name: "prod",  //con ste nombre lo llamare desde el useSelector
    initialState,
    reducers: {


        getAllProd: (state, action) => {
            state.allchars = action.payload
            state.backupChar = action.payload
        },
        getProd_ById: (state, action) => {
            state.detail = action.payload
        },
        paginate: (state, action) => {
            state.paginate = action.payload
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


export const { getAllProd, getProd_ById, paginate } = prodSlice.actions //esto seria como las actions
export default prodSlice.reducer