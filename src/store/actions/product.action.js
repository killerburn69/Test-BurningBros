import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../services/product.service";
export const getProductList = createAsyncThunk(
    'product/getProductList',
    async(params, {dispatch,getState,rejectWithValue})=>{
        try{
            const res = await productService.getListProduct(params)
            return res
        }catch(err){
            return rejectWithValue(err)
        }
    }
)
export const searchProduct = createAsyncThunk(
    'product/searchProduct',
    async(params,{dispatch,getState,rejectWithValue})=>{
        try{
            const res = await productService.searchProduct(params)
            return res
        }catch(err){
            return rejectWithValue(err)
        }
    }
)