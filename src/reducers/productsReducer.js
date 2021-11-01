/* eslint-disable import/no-anonymous-default-export */
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
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_ERROR,
} from "../types";

// All reducers has its own state 
const initialState = {
  products: [],
  error: null,
  loading: false,
  editproduct: null,
  deleteProduct: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DOWNLOAD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };
    case DOWNLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case DOWNLOAD_PRODUCT_ERROR:
    case PRODUCT_DELETED_ERROR:
    case PRODUCT_EDIT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_DELETED:
      return {
        ...state,
        deleteProduct: action.payload,
      };
    case PRODUCT_DELETED_SUCCESS:
      return {
        ...state,
        error: null,
        products: state.products.filter(
          (product) => product.id !== state.deleteProduct
        ),
        deleteProduct: null,
      };
    case GET_PRODUCT_EDIT:
      return {
        ...state,
        editproduct: action.payload,
      };
    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        editproduct: null,
        products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
      };
    default:
      return state;
  }
}