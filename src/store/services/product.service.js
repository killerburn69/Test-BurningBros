import axiosClient from "./axiosClient";
export const productService = {
    getListProduct:(params)=>{
        return axiosClient.get(`/products?${params.toString()}`)
    },
    searchProduct:(params)=>{
        return axiosClient.get(`/product/search?${params.toString()}`)
    }
}