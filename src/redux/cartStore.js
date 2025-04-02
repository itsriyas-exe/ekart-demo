// const {configureStore}= require("@reduxjs/toolkit");

import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./slice/productSlice"
import wishlistSlice from "./slice/wishlistSlice"
import cartSlice from "./slice/cartSlice"

const cartStore = configureStore({
    reducer:{
        productSlice,
        wishlistSlice,
        cartReducer:cartSlice
    }
})
export default cartStore