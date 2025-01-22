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

export const send_message = createAsyncThunk(
    "chat/send_message",
    async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post("/chat/customer/send-message-to-seller",info);
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
        },
        updateMessage: (state,{payload}) => {
            state.fb_message = [...state.fb_message,payload]
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(add_friend.fulfilled, (state, {payload}) => {
           state.fb_message = payload.messages;
           state.currentFd = payload.currentFd;
           state.my_friends = payload.MyFriends
        })

        .addCase(send_message.fulfilled, (state, {payload}) => {
            let tempFriends = state.my_friends
            let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
            while(index > 0){
                let temp = tempFriends[index]
                tempFriends[index] = tempFriends[index - 1]
                tempFriends[index - 1] = temp
                index--
            }
            state.my_friends = tempFriends;
            state.fb_message = [...state.fb_message , payload.message];
            state.successMessage = 'Message Send Success'
         })
    }
})

export const {messageClear,updateMessage} = chatReducer.actions
export default chatReducer.reducer 