import { ActionTypes } from "../contants/action-types";

const initialState = {
  isLoading: false,
  products: [],
  productsSearched: [],
  selectedProduct: null,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOADING_PRODUCTS:
      return {
        ...state,
        products: [],
        isLoading: true,
      };
    case ActionTypes.LOADING_SUCCESS_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };

    case ActionTypes.GET_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
        isLoading: false,
      };
    case ActionTypes.LOADING_LAST_PRODUCTS:
      return {
        ...state,
        products: [],
        isLoading: false,
      };
    case ActionTypes.SECCUSS_LAST_PRODUCT:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case ActionTypes.CLEAR_PRODUCT:
      return {
        ...state,
        selectedProduct: null,
        isLoading: false,
      };
    case ActionTypes.SERACH_PRODUCTS:
      return {
        ...state,
        productsSearched: [],
        isLoading: true,
      };
    case ActionTypes.SUCESS_SEARCH_PRODUCTS:
      return {
        ...state,
        productsSearched: payload,
        isLoading: false,
      };

    case ActionTypes.LOADING_FAIL_PRODUCTS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
