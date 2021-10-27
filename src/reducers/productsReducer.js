/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_SUCCESS,
  DOWNLOAD_PRODUCT_ERROR,
} from "../types";

// All reducers has its own state 
const initialState = {
  products: [],
  error: null,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      }
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DOWNLOAD_PRODUCT:
      return {
        ...state,
        loading: action.payload
      }
    case DOWNLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload
      }
    case DOWNLOAD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: 
      return state;
  }
}