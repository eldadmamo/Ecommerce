import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
    "dashboard/get_dashboard_index_data",
    async (userId, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-dashboard-data/${userId}`);
            // localStorage.setItem('customerToken',data.token);
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.response.data);
        }
    }
);

export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState:{
        recentOrders: [], 
        errorMessage : '',
        successMessage: '',
        totalOrder: 0,
        pendingOrder: 0,
        cancelledOrder: 0 
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        
         .addCase(get_dashboard_index_data.fulfilled, (state, {payload}) => {
            state.recentOrders = payload.recentOrders;
            state.pendingOrder = payload.pendingOrder;
            state.totalOrder = payload.totalOrder;
            state.cancelledOrder = payload.cancelledOrder;
         })
    }

})

export const {messageClear} = dashboardReducer.actions
export default dashboardReducer.reducer 