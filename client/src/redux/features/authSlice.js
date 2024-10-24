import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authError } from "../actions/errorActions";

const dispatch = useDispatch;

const initialState = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
  accessToken: localStorage.getItem("token"),
  isLoading: false,
  id: localStorage.getItem("id"),
  isProccessingLogout: false,
  failedProcess: false,
};

export const loginUsers = createAsyncThunk("auth/loginUser", async () => {
  try{
    console.log("rrrrrrrrrrrrrr")
    const res = await publicRequest.post("/auth/login", user);
    // dispatch(loginUsers,res.data);
    
    // dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: res.data });
    // dispatch(loginSucceess)

  }catch (error) {
    // dispatch(returnErrors(error.response.data, error.response.status));
    dispatch(authError)
    dispatch(errorMessages)
    dispatch(resetMessages)
    // dispatch({ type: ActionTypes.AUTH_ERROR });
    // dispatch({ type: ActionTypes.ERROR_MESSAGES });
    // dispatch({ type: ActionTypes.RESET_MESSAGES });
  }
});


export const registerUsers = createAsyncThunk("auth/registerUser", async () => {
  try {
    const res = await publicRequest.post("/auth/register", user);
     //payload: res.data
    dispatch(registerUsers,res.data);

    return res.data;
  } catch (error) {
    dispatch(authError)
    dispatch(errorMessages)
    dispatch(resetMessages)
    // dispatch({ type: ActionTypes.AUTH_ERROR });
    // dispatch({ type: ActionTypes.ERROR_MESSAGES });
    // dispatch({ type: ActionTypes.RESET_MESSAGES });
  }
});

export const logoutProcessReset = createAsyncThunk("auth/logoutProcessReset",async () => {
  try {
    dispatch(logoutProcess());
    dispatch({ type: ActionTypes.LOGOUT_PROCESS_RESET });
  } catch (error) {
    // dispatch(returnErrors(error.response.data, error.response.status));
    dispatch(authError)
    dispatch(errorMessages)
    dispatch(resetMessages)
    // dispatch({ type: ActionTypes.AUTH_ERROR });
    // dispatch({ type: ActionTypes.ERROR_MESSAGES });
    // dispatch({ type: ActionTypes.RESET_MESSAGES });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginStart: (state, action) => {
      (state.failedProcess = false), (state.isLoading = true);
    },
    loginSuccess: (state, action) => {
      (state.failedProcess = false), (state.isLoading = false);
    },
    loginFail: (state, action) => {
      (state.failedProcess = true), (state.isLoading = false);
    },



    logoutProccess: (state, action) => {
      (state.isProccessingLogout = true), (state.failedProcess = false);
    },
    errorMessages: (state, action) => {
      state.failedProcess = true;
    },
    resetMessages: (state, action) => {
      state.failedProcess = false;
    },
    successMessages: (state, action) => {
      state.failedProcess = "SUCCESS";
    },
    logoutReset: (state, action) => {
      state.failedProcess = false;
    },
    logoutProccessReset: (state, action) => {
      (state.isProccessingLogout = false), (state.failedProcess = false);
    },




    authError: (state, action) => {
      localStorage.clear();
      (state.isLoading = false), (state.failedProcess = false);
    },


    loginFail: (state, action) => {
      localStorage.clear();
      (state.isLoading = false), (state.failedProcess = false);
    },

    logoutSuccess: (state, action) => {
      localStorage.clear();
      (state.isLoading = false), (state.failedProcess = false);
    },

    registerFail: (state, action) => {
      localStorage.clear();
      (state.isLoading = false), (state.failedProcess = false);
    },




  },
  extraReducers: (builder) => {
    builder.addCase(loginUsers.pending, (state) => {
      (state.failedProcess = false), (state.isLoading = false);
    });
    builder.addCase(loginUsers.fulfilled, (state) => {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("id", res.data._id);

      (state.failedProcess = false), (state.isLoading = true);
    });
    builder.addCase(loginUsers.rejected, (state) => {
      (state.failedProcess = false), (state.isLoading = false);
    });


    builder.addCase(registerUsers.pending, (state) => {
      (state.failedProcess = false), (state.isLoading = false);
    });
    builder.addCase(registerUsers.fulfilled, (state) => {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("id", res.data._id);

      (state.failedProcess = false), (state.isLoading = true);
    });
    builder.addCase(registerUsers.rejected, (state) => {
      (state.failedProcess = false), (state.isLoading = false);
    });



    builder.addCase(logoutProcessReset.pending, (state) => {
      (state.failedProcess = false), (state.isLoading = true);
    });
    builder.addCase(logoutProcessReset.fulfilled, (state) => {
      (state.failedProcess = false), (state.isLoading = false);

    });
    builder.addCase(logoutProcessReset.rejected, (state) => {
      (state.failedProcess = true), (state.isLoading = false);
    });



    // builder.addMatcher(
    //   isAnyOf(loginSuccess, registerSuccess),
    //   (state, action) => {
    //     Object.assign(state, action.payload);

    //     (username = localStorage.getItem("username")),
    //       (email = localStorage.getItem("email")),
    //       (accessToken = localStorage.getItem("token")),
    //       (isLoading = false),
    //       (id = localStorage.getItem("id")),
    //       (failedProcess = false);
    //   }
    // );

  },
});
 
export default  authSlice.reducer;
export const {loginStart,logoutSuccess,logoutProccess,errorMessages,resetMessages,successMessages,logoutReset,logoutProccessReset} = authSlice.actions;
