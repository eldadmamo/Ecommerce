import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api";

export const add_friend = createAsyncThunk(
    "chat/add_friend",
    async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post("/chat/customer/add-customer-friend",info);
            // localStorage.setItem('customerToken',data.token);
            // console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.response.data);
        }
    }
);



export const chatReducer = createSlice({
    name: 'chat',
    initialState:{
        my_friends: [],
        fb_message: [],
        currentFd: "",
        errorMessage : '',
        successMessage: '', 
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        // builder
        // .addCase(customer_register.pending, (state, {payload}) => {
        //    state.loader = true;
        // })
        // .addCase(customer_register.rejected, (state, {payload}) => {
        //     state.errorMessage = payload.error;
        //     state.loader = false;
        // })
    }
})

export const {messageClear} = chatReducer.actions
export default chatReducer.reducer 