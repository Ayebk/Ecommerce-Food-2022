import { loginStart, loginSuccess } from "./features/authSlice";
import { publicRequest } from "../requestMethods";

//User Loading
export const loginUser = async (dispatch, user) => {
  // User loading
  dispatch(loginStart());
  try {
    console.log(user);
    const res = await publicRequest.post("/auth/login", user);
    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("id", res.data._id);

    dispatch(loginSuccess());
    dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: res.data });
   
    return res.data;
  } catch (error) {
    dispatch(loginFail());
   
    // dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.AUTH_ERROR });
    dispatch({ type: ActionTypes.ERROR_MESSAGES });
    dispatch({ type: ActionTypes.RESET_MESSAGES });
  }
};
