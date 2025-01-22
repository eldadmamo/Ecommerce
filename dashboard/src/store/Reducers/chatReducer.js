import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const get_customers = createAsyncThunk(
    'chat/get_customers',
    async(sellerId,{rejectWithValue, fulfillWithValue}) => {
        
        try {
            const {data} = await api.get(`/chat/seller/get-customers/${sellerId}`,{withCredentials: true})
            // localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_customer_message = createAsyncThunk(
    'chat/get_customer_message',
    async(customerId,{rejectWithValue, fulfillWithValue}) => {
        
        try {
            const {data} = await api.get(`/chat/seller/get-customer-message/${customerId}`,{withCredentials: true})
            // localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
 

export const send_message = createAsyncThunk(
    'chat/send_message',
    async(info,{rejectWithValue, fulfillWithValue}) => {
        
        try {
            const {data} = await api.post('/chat/seller/send-message-to-customer/',info,  {withCredentials: true})
            // localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const chatReducer = createSlice({
    name: 'chat',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        //added
        customers: [],
        messages: [],
        activeCustomer: [],
        activeSeller:[],
        activeAdmin: "",
        friends: [],
        seller_admin_message: [],
        currentSeller: {},
        currentCustomer: {},
        sellers: [],
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        updateMessage: (state,{payload}) => {
            state.messages = [...state.messages,payload]
        }

    },
    extraReducers: (builder) => {
        builder
        
        .addCase(get_customers.fulfilled, (state, { payload }) => {
            state.customers = payload.customers;
        })

        .addCase(get_customer_message.fulfilled, (state, { payload }) => {
            state.messages = payload.messages;
            state.currentCustomer = payload.currentCustomer
        })

        .addCase(send_message.fulfilled, (state, {payload}) => {
                    let tempFriends = state.customers
                    let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
                    while(index > 0){
                        let temp = tempFriends[index]
                        tempFriends[index] = tempFriends[index - 1]
                        tempFriends[index - 1] = temp
                        index--
                    }
                    state.customers = tempFriends;
                    state.messages = [...state.messages , payload.message];
                    state.successMessage = 'Message Send Success'
                 })

    }

})
export const {messageClear,updateMessage} = chatReducer.actions
export default chatReducer.reducer