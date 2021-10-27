import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_SUCCESS,
  DOWNLOAD_PRODUCT_ERROR,
} from "../types";

import axiosClient from "../config/axios";
import Swal from "sweetalert2"



//Create new products

export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      // Send the product to the API 
      await axiosClient.post("/products", product);
      //Update the state  
      dispatch(addProductSuccess(product));
      //Alert the user
      Swal.fire(
        'Success',
        'The product was successfully added',
        'success'
      )
    } catch (error) {
      console.log(error)
      //If we have some error, change the state
      dispatch(addProductError(true))
      //Alert the user
      Swal.fire({
        icon: 'error',
        title: 'There was an error',
        text: 'There was an error'
      })
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

//Funtion to download product item from data base
export function downloadProductAction() {
  return async (dispatch) => {
    dispatch(downloadProduct());

    try {
      const response = await axiosClient.get('/products')
      dispatch(downloadProductSuccess(response.data));
    } catch (error) {
      dispatch(downloadProductFails(error.message));
    }
  }
  
};

const downloadProduct = () =>  ({
  type: DOWNLOAD_PRODUCT,
  payload: true
});

const downloadProductSuccess = product => ({
  type: DOWNLOAD_PRODUCT_SUCCESS,
  payload: product
});

const downloadProductFails = () => ({
  type: DOWNLOAD_PRODUCT_ERROR,
  payload: true
})