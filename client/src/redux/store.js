import { configureStore } from '@reduxjs/toolkit'
import prodReducer from './prodSlice'

export const store = configureStore({
    reducer: {
        prod: prodReducer
    }
})