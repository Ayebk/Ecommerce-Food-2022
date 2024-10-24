import { ActionTypes } from "../contants/action-types";
import { returnErrors } from "./errorActions";
import { publicRequest , userRequest } from "../../requestMethods"; //show
import { logoutReset, logoutSuccess } from "./authActions";

export const getCart = async (dispatch, loggedUser) => {
  dispatch({ type: ActionTypes.LOADING_CART });

  if(loggedUser){
  try {
    const res = await userRequest.get(`carts/find/` + loggedUser);
    console.log(res)
    const quantity = res.data.length;
    console.log(res.data)
    let payload = res.data;

    dispatch({ type: ActionTypes.SYNC_DB_CART, payload });
  } catch (error) {
    dispatch(returnErrors(error.response));
  }
}
};

export const addToCart = (payload) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: payload,
  };
};

export const addOneToCart = (payload) => {
  return {
    type: ActionTypes.ADD_ONE_TO_CART,
    payload: payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: payload,
  };
};

export const removeOneFromCart = (payload) => {
  return {
    type: ActionTypes.REMOVE_ONE_FROM_CART,
    payload: payload,
  };
};

export const clearCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
  };
};

export const updateCart = async (dispatch, cart, loggedUser, loggingOut) => {
  if (!loggingOut) {
    dispatch({ type: ActionTypes.UPDATE_CART });
    try {

      userRequest.put(`carts/` + loggedUser.id, {
        userId: loggedUser.id,
        cart,
      });

    

    } catch (error) {
 
      console.log(error.response);
    }
  }
};

