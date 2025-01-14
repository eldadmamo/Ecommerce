import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api";


export const place_order = createAsyncThunk(
    "card/place_order",
    async ({price,products,shipping_fee,items,shippingInfo,userId,navigate}, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post("/home/product/place-order", {
                price,products,shipping_fee,items,shippingInfo,userId,navigate
            });
            navigate('/payment',{
                state:{
                    price:price + shipping_fee,
                    items,
                    orderId: data.orderId
                }
            })
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            // console.log(error.message)
            return rejectWithValue(error.response.data);
        }
    }
);

export const orderReducer = createSlice({
    name: 'order',
    initialState:{
        myOrders: [], 
        errorMessage : '',
        successMessage: '', 
        myOrders : {},
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {

        // .addCase(add_to_card.rejected, (state, {payload}) => {
        //     state.errorMessage = payload.error;
        // })

    }
})

export const {messageClear} = orderReducer.actions
export default orderReducer.reducer 