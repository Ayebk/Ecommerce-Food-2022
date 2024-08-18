import { ActionTypes } from "../contants/action-types";
import { returnErrors } from "./errorActions";
import { publicRequest } from "../../requestMethods";

//User Loading
export const loginUser = async (dispatch, user) => {
  // User loading
  dispatch({ type: ActionTypes.LOGIN_START });
  try {
    const res = await publicRequest.post("/auth/login", user);
    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("id", res.data._id);

    dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.AUTH_ERROR });
    dispatch({ type: ActionTypes.ERROR_MESSAGES });
    dispatch({ type: ActionTypes.RESET_MESSAGES });
  }
};

//Register Success
export const registerUser = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch({ type: ActionTypes.REGISTER_SUCCESS, payload: res.data });

    return res.data;
  } catch (error) {
    dispatch({ type: ActionTypes.AUTH_ERROR });
    dispatch({ type: ActionTypes.ERROR_MESSAGES });
    dispatch({ type: ActionTypes.RESET_MESSAGES });
  }
};

//Login Fail
export const loginFail = (user) => {
  return {
    type: ActionTypes.LOGIN_FAIL,
  };
};

//REGISTER SUCCESS
export const registerMes = (user) => {
  return {
    type: ActionTypes.SUCCESS_MESSAGES,
  };
};

//RESET_MESSAGES
export const resetMes = (user) => {
  return {
    type: ActionTypes.RESET_MESSAGES,
  };
};

//Logout Success
export const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutReset = () => {
  return {
    type: ActionTypes.LOGOUT_RESET,
  };
};

export const logoutProcess = () => {
  return {
    type: ActionTypes.LOGOUT_PROCESS,
  };
};

export const logoutProcessReset = async (dispatch) => {
  try {
    dispatch(logoutProcess());
    dispatch({ type: ActionTypes.LOGOUT_PROCESS_RESET });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.AUTH_ERROR });
    dispatch({ type: ActionTypes.ERROR_MESSAGES });
    dispatch({ type: ActionTypes.RESET_MESSAGES });
  }
};
