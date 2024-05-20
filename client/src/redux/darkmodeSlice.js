import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dark: false,
};

export const darkSlice = createSlice({
    name: "darkmode",  //con ste nombre lo llamare desde el useSelector
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            let mode = action.payload
            state.dark = mode

        }
    }

});

export const { setDarkMode } = darkSlice.actions; //estas son las actions
export default darkSlice.reducer //esto va para el store




