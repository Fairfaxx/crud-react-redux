import { 
  ADD_PRODUCT, 
  ADD_PRODUCT_SUCCESS, 
  ADD_PRODUCT_ERROR } from "../types";

import axiosClient from "../config/axios";



//Create new products

export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      // Send the product to the API 
      await axiosClient.post("/products", product);
      //Update the state  
      dispatch(addProductSuccess(product));
    } catch (error) {
      console.log(error)
      //If we have some error, change the state
      dispatch(addProductError(true))
    }
  }
};

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true
});

const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product
});

const addProductError = (error) => ({
  type: ADD_PRODUCT_ERROR,
  payload: error
});