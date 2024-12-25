import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info) => {
        try{
            const {data} = await api.post('/admin-login', info,{withCredentials: true});
            console.log(data)
        } catch(err){
            console.log(err)
        }
    }
)

export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: ''
    },
    reducers:{

    },
    extraReducers: () => {

    }
})

export default authReducer.reducer



