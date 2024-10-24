// import { ActionTypes } from "../contants/action-types";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: {},
  status: null,
  id: null,
};


// //RETURN ERRORS
// export const returnErrors = (error) => {
//   return {
//     type: ActionTypes.GET_ERRORS,
//     payload: error,
//   };
// };


const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    getErrors: (state, action) => {
      state.data= action.payload.data,
        state.status= action.payload.status,
        state.id= action.payload.id
    },
    returnErrors: (state, action) => {},

    clearErrors: (state, action) => {
      state.data= {},
      state.status= null,
      state.id= null
    },
  },
});

export default  errorSlice.reducer;
export const {getErrors,clearErrors} = errorSlice.actions;
