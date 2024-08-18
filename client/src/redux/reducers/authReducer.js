import { ActionTypes } from "../contants/action-types";

const initialState = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
  accessToken: localStorage.getItem("token"),
  isLoading: false,
  id: localStorage.getItem("id"),
  isProccessingLogout: false,
  failedProcess: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        failedProcess: false,
      };

    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.REGISTER_SUCCESS:
      Object.assign(state, payload);

      return {
        ...state,
        ...payload,
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        accessToken: localStorage.getItem("token"),
        isLoading: false,
        id: localStorage.getItem("id"),
        failedProcess: false,
      };
    case ActionTypes.AUTH_ERROR:
    case ActionTypes.LOGIN_FAIL:
    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.REGISTER_FAIL:
      localStorage.clear();
      return {
        ...state,
        isLoading: false,
        failedProcess: false,
      };

    case ActionTypes.LOGOUT_PROCESS:
      return {
        ...state,
        isProccessingLogout: true,
        failedProcess: false,
      };
    case ActionTypes.ERROR_MESSAGES:
      return {
        ...state,
        failedProcess: true,
      };
    case ActionTypes.RESET_MESSAGES:
      return {
        ...state,
        failedProcess: false,
      };
    case ActionTypes.SUCCESS_MESSAGES:
      return {
        ...state,
        failedProcess: "SUCCESS",
      };
    case ActionTypes.LOGOUT_RESET:
      return {
        failedProcess: false,
      };
    case ActionTypes.LOGOUT_PROCESS_RESET:
      return {
        ...state,
        isProccessingLogout: false,
        failedProcess: false,
      };
    default:
      return state;
  }
};
