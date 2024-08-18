import { combineReducers } from "redux";
import { errors } from "./errorReducer";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { ActionTypes } from "../contants/action-types";

const allReducers = combineReducers({
  //Error
  errors,
  //Auth
  auth: authReducer,
  //Product
  products: productReducer,
  //Cart
  cart: cartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_RESET") {
    localStorage.clear();

    return allReducers(undefined, action);
  }
  return allReducers(state, action);
};

export default rootReducer;
