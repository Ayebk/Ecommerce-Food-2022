import { ActionTypes } from "../contants/action-types";
import { returnErrors } from "./errorActions";
import { publicRequest, userRequest } from "../../requestMethods";

export const getProducts = async (dispatch, category) => {
  dispatch({ type: ActionTypes.LOADING_PRODUCTS });

  try {
    const res = await publicRequest.get(
      category.category
        ? `/products?category=${category.category}`
        : `/products/`
    );

    dispatch({ type: ActionTypes.LOADING_SUCCESS_PRODUCTS, payload: res.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.LOADING_FAIL_PRODUCTS });
  }
};

export const getProduct = async (dispatch, id) => {
  dispatch({ type: ActionTypes.LOADING_PRODUCTS });

  try {
    const res = await publicRequest.get("/products/find/" + id.id);

    dispatch({ type: ActionTypes.GET_PRODUCT, payload: res.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.LOADING_FAIL_PRODUCTS });
  }
};

export const searchProducts = async (dispatch, text) => {
  dispatch({ type: ActionTypes.SERACH_PRODUCTS });

  try {
    const res = await publicRequest.get(`/products/search/` + text);

    dispatch({ type: ActionTypes.SUCESS_SEARCH_PRODUCTS, payload: res.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.LOADING_FAIL_PRODUCTS });
  }
};

export const lastProducts = async (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_LAST_PRODUCTS });

  try {
    const res = await publicRequest.get(`/products?new=true`);

    dispatch({ type: ActionTypes.SECCUSS_LAST_PRODUCT, payload: res.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.LOADING_FAIL_PRODUCTS });
  }
};

export const clearProduct = async (dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_PRODUCT });
};
