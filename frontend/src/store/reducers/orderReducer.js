import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api";


export const place_order = createAsyncThunk(
    'order/place_order',
    async( {price,products,shipping_fee,items,shippingInfo,userId,navigate}) => { 
        try {
            const { data } = await api.post('/home/order/place-order',{
                price,products,shipping_fee,items,shippingInfo,userId,navigate
            })
            navigate('/payment',{
                state: {
                    price:price + shipping_fee,
                    items,
                    orderId: data.orderId 
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_orders = createAsyncThunk(
    "order/get_orders",
    async ({customerId,status}, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get_orders/${customerId}/${status}`);
            // localStorage.setItem('customerToken',data.token);
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_orders_details = createAsyncThunk(
    "order/get_orders_details",
    async (orderId, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-orders-details/${orderId}`);
            // localStorage.setItem('customerToken',data.token);
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message)
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
        myOrder : {},
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(get_orders.fulfilled, (state, {payload}) => {
            state.myOrders = payload.orders;  
        })

        .addCase(get_orders_details.fulfilled, (state, {payload}) => {
            state.myOrder = payload.order;  
        })

    }
})

export const {messageClear} = orderReducer.actions
export default orderReducer.reducer 