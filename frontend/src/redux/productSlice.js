import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../lib/Axios";
import {v4 as uuidv4} from 'uuid'



export const getProducts = createAsyncThunk('products/getProducts', async () => {
    let response = await Axios.get('get-all-products')
    return response.data
})

export const productSlice = createSlice({
    name:'products',
    initialState:{
        products: []
    },
    reducers:{
        deleteProduct: (state, action) => {
            let filteredArray = state.filter(element => element.id === action.payload.id ? false : true)
            return filteredArray;
        },
        editProduct: (state, action) => {
            let editedArray = state.map(element =>  element.id === action.payload.editedObj.id ? action.payload.editedObj : element) 
            return editedArray
        },
        addProduct: (state, action) => {
            console.log([...state])
            if(state){
                console.log('here')
                let newProduct = {
                    id: uuidv4(),
                    title: "",
                    publisher: "", 
                    genre: "",
                    price: 0    
                  }
    
                let addArray = [
                    newProduct,
                    ...state
                ];
                return addArray
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getProducts.fulfilled, (state, action)=>{
            return action.payload
        })
        builder.addCase(getProducts.rejected, ()=>{
            console.log('something whent wrong with get products')
        })
    }
})

export const {deleteProduct, editProduct, addProduct}  = productSlice.actions

export default productSlice.reducer