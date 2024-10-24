// import { ActionTypes } from "../contants/action-types";

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  productsSearched: [],
  selectedProduct: null,
};



export const getProducts = createAsyncThunk("auth/getProducts",async (dispatch, category) => {
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
});


export const fetchGetProduct = createAsyncThunk("auth/fetchGetProduct",async (dispatch, id) => {
  dispatch({ type: ActionTypes.LOADING_PRODUCTS });

  try {
    const res = await publicRequest.get("/products/find/" + id.id);

    dispatch({ type: ActionTypes.GET_PRODUCT, payload: res.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.LOADING_FAIL_PRODUCTS });
  }
});



export const fetchSearchProducts = createAsyncThunk("auth/fetchSearchProducts", async (dispatch, text) => {
  dispatch({ type: ActionTypes.SERACH_PRODUCTS });

  try {
    const res = await publicRequest.get(`/products/search/` + text);
    console.log(res.data)
    dispatch({ type: ActionTypes.SUCESS_SEARCH_PRODUCTS, payload: res.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.LOADING_FAIL_PRODUCTS });
  }
});





export const lastProducts = createAsyncThunk("auth/lastProducts",async (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_LAST_PRODUCTS });

  try {
    const res = await publicRequest.get(`/products?new=true`);

    dispatch({ type: ActionTypes.SECCUSS_LAST_PRODUCT, payload: res.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ActionTypes.LOADING_FAIL_PRODUCTS });
  }
});



const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadingProducts: (state, action) => {
      (state.products = []), (state.isLoading = true);
    },
    loadingSuccessProducts: (state, action) => {
      (state.products = action.payload), (state.isLoading = false);
    },
    getProduct: (state, action) => {
      (state.selectedProduct = action.payload), (state.isLoading = false);
    },
    loadingLastProducts: (state, action) => {
      (state.products = []), (state.isLoading = false);
    },
    seccussLastProducts: (state, action) => {
      (state.products = action.payload), (state.isLoading = false);
    },
    clearProduct: (state, action) => {
      (state.selectedProduct = null), (state.isLoading = false);
    },
    searchProducts: (state, action) => {
      (state.productsSearched = []), (state.isLoading = true);
    },
    seccussSearchProducts: (state, action) => {
      (state.productsSearched = action.payload), (state.isLoading = false);
    },
    failSearchProducts: (state, action) => {
      state.isLoading = false;
    },
  }, extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      (state.products = []), (state.isLoading = true);
    });
    builder.addCase(getProducts.fulfilled, (state,action) => {
      (state.products = action.payload), (state.isLoading = false);
    });

    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchGetProduct.pending, (state) => {
      (state.productsSearched = []), (state.isLoading = true);
    });
    builder.addCase(fetchGetProduct.fulfilled, (state,action) => {
      (state.selectedProduct = action.payload), (state.isLoading = false);    });
    builder.addCase(fetchGetProduct.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchSearchProducts.pending, (state) => {
      (state.productsSearched = []), (state.isLoading = true);    });
    builder.addCase(fetchSearchProducts.fulfilled, (state,action) => {
      (state.productsSearched = action.payload), (state.isLoading = false)});   
    builder.addCase(fetchSearchProducts.rejected, (state) => {
      state.isLoading = false;
    });


    builder.addCase(lastProducts.pending, (state) => {
      (state.products = []), (state.isLoading = false);
    });
    builder.addCase(lastProducts.fulfilled, (state,action) => {
      (state.products = action.payload), (state.isLoading = false)});
    builder.addCase(lastProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default  productSlice.reducer;
export const {loadingProducts,loadingSuccessProducts,getProduct,loadingLastProducts,seccussLastProducts,clearProduct,searchProducts,seccussSearchProducts,failSearchProducts} = productSlice.actions;
