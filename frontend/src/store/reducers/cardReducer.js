import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api";
import { jwtDecode } from 'jwt-decode';


export const add_to_card = createAsyncThunk(
    "card/add_to_card",
    async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post("/home/product/add-to-card", info);
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            // console.log(error.message)
            return rejectWithValue(error.response.data);
        }
    }
);


export const cardReducer = createSlice({
    name: 'card',
    initialState:{
        card_products: [], 
        card_product_count: 0,
        wishlist_count: 0,
        whishlist: [],
        price: 0,
        errorMessage : '',
        successMessage: '', 
        shipping_fee: 0,
        outofstock_products:[]
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(add_to_card.rejected, (state, {payload}) => {
            state.errorMessage = payload.error;
        })
        .addCase(add_to_card.fulfilled, (state, {payload}) => {
            state.successMessage = payload.message;
            state.card_product_count = state.card_product_count + 1;
        })
        
    }
})

export const {messageClear} = cardReducer.actions
export default cardReducer.reducer 