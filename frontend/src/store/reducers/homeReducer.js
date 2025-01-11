import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import api from "../../api/api"

export const get_category = createAsyncThunk(
    "product/get_category",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get("/home/get-categorys");
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Error fetching categories:", error.response);
            return rejectWithValue(error.response);
        }
    }
);


export const get_products = createAsyncThunk(
    "product/get_products",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get("/home/get-products");
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            
            return rejectWithValue(error.response);
        }
    }
);

export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categorys: [], 
        products: [],
        latest_product: [],
        topRated_product: [],
        discount_product: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.fulfilled, (state, {payload}) => {
            state.categorys = payload.categorys;
        })
        .addCase(get_products.fulfilled, (state, {payload}) => {
            state.products = payload.products;
            state.latest_product = payload.latest_product;
            state.topRated_product = payload.topRated_product;
            state.discount_product = payload.discount_product;
        })
    }
})

export const {messageClear} = homeReducer.actions
export default homeReducer.reducer 