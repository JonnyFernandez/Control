import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from './darkmodeSlice'; // Cambiado el nombre del reducer
import prodReducer from "./prodSlice";


export const store = configureStore({
    reducer: {
        dark: darkModeReducer, // Usando un nombre más descriptivo para el reducer,
        prod: prodReducer
    }
});
