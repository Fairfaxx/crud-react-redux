import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_SUCCESS,
  DOWNLOAD_PRODUCT_ERROR,
  GET_PRODUCT_DELETED,
  PRODUCT_DELETED_SUCCESS,
  PRODUCT_DELETED_ERROR,
  GET_PRODUCT_EDIT,
  START_PRODUCT_EDIT,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_ERROR,
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

//Function to download product item from data base
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

export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(deleteProduct(id));
    console.log(id)

    try {
      await axiosClient.delete(`/products/${id}`);
      dispatch(deleteProductSuccess());
    } catch (error) {
      dispatch(deleteProductFail());
    }
  }
};

const deleteProduct = (id) => ({
  type: GET_PRODUCT_DELETED,
  payload: id
});

const deleteProductSuccess = () => ({
  type: PRODUCT_DELETED_SUCCESS,
});

const deleteProductFail = () => ({
  type: PRODUCT_DELETED_ERROR,
});

export function getProductEditAction(product) {
  return async (dispatch) => {
    dispatch(getEditProduct(product));
  }
}

const getEditProduct = (product) => ({
  type: GET_PRODUCT_EDIT,
  payload: product
});

export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct());

    try {
      await axiosClient.put(`/products/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      dispatch(editProductError())
    }
  };
};

const editProduct = () => ({
  type: START_PRODUCT_EDIT
});

const editProductSuccess = (product) => ({
  type: PRODUCT_EDIT_SUCCESS,
  payload: product
});

const editProductError = () => ({
  type: PRODUCT_EDIT_ERROR,
  payload: true
})