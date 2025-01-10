import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const get_category = createAsyncThunk({
    
})

export const homeReducer = createSlice({
    name: "home",
    initialState:{
        categorys: [], 
    },
    reducers : {
           
    },
    extraReducers: (builder) => {
      builder
        
    }
})


export default homeReducer.reducer 