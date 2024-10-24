import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  quantity: 0,
  total: 0,
};

export const getCart = createAsyncThunk(
  "auth/getCart",
  async (dispatch, loggedUser) => {
    dispatch({ type: ActionTypes.LOADING_CART });
    console.log("getttt carrttt");
    console.log(loggedUser);
    if (loggedUser) {
      try {
        const res = await userRequest.get(`carts/find/` + loggedUser);
        console.log(res);
        const quantity = res.data.length;
        console.log(res.data);
        let payload = res.data;

        dispatch({ type: ActionTypes.SYNC_DB_CART, payload });
      } catch (error) {
        dispatch(returnErrors(error.response));
      }
    }
  }
);

export const updateCart = createAsyncThunk(
  "auth/updateCart",
  async (dispatch, cart, loggedUser, loggingOut) => {
    if (!loggingOut) {
      dispatch({ type: ActionTypes.UPDATE_CART });
      try {
        console.log(localStorage.getItem("token"));

        console.log("aaa123");
        console.log(loggedUser.id);
        console.log(cart);
        userRequest.put(`carts/` + loggedUser.id, {
          userId: loggedUser.id,
          cart,
        });
      } catch (error) {
        console.log(error.response);
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadingCart: (state, action) => {
      state.isLoading = true;
    },
    syncDBCart: (state, action) => {
      const sumQuantity1 = (payload) => {
        let sum = 0;
        payload.map((item) => {
          sum += item.quantity;
        });
        return sum;
      };
      const sumCost1 = (payload) => {
        let sum = 0;
        payload.map((item) => {
          sum += item.quantity * item.selectedProduct.price;
        });
        return sum;
      };

      (state.products = payload),
        (state.quantity = sumQuantity1(action.payload)),
        (state.total = sumCost1(action.payload)),
        (state.isLoading = true);
    },
    loadingSuccessCart: (state, action) => {},
    addToCart: (state, action) => {
      let itemFound;
      if (state.products) {
        state.products.map((item) => {
          if (item.selectedProduct._id === payload.selectedProduct._id) {
            itemFound = item;
          }
        });
      }
      (state.quantity = state.quantity + payload.quantity),
        (state.products = state.products
          ? itemFound
            ? state.products.map((item, i) =>
                item.selectedProduct._id === payload.selectedProduct._id
                  ? { ...item, quantity: item.quantity + payload.quantity }
                  : item
              )
            : [...state.products, payload]
          : [payload]),
        (state.total =
          state.total + payload.selectedProduct.price * payload.quantity),
        (state.isLoading = false);
    },
    addOneToCart: (state, action) => {
      let itemFoundAddOne;
      if (state.products) {
        state.products.map((item) => {
          if (
            item.selectedProduct._id ===
            payload.selectedProduct.selectedProduct._id
          ) {
            itemFoundAddOne = item;
          }
        });
      }

      (state.quantity = state.quantity + 1),
        (state.products = state.products
          ? itemFoundAddOne
            ? state.products.map((item, i) =>
                item.selectedProduct._id ===
                payload.selectedProduct.selectedProduct._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.products]
          : [...state.products]),
        (state.total =
          state.total + payload.selectedProduct.selectedProduct.price * 1),
        (state.isLoading = false);
    },
    removeFromCart: (state, action) => {
      let itemFoundRemove;

      if (state.products) {
        state.products.map((item) => {
          if (
            item.selectedProduct._id ===
            payload.selectedProduct.selectedProduct._id
          ) {
            itemFoundRemove = item;
          }
        });
      }

      (state.quantity = state.quantity - payload.selectedProduct.quantity),
        (state.products = state.products
          ? itemFoundRemove
            ? state.products.filter(
                (item) =>
                  item.selectedProduct._id !==
                  payload.selectedProduct.selectedProduct._id
              )
            : [...state.products]
          : [...state.products]),
        (state.total =
          state.total -
          payload.selectedProduct.selectedProduct.price *
            payload.selectedProduct.quantity),
        (state.isLoading = false);
    },
    removeOneFromCart: (state, action) => {
      let itemFoundRemoveOne;
      if (state.products) {
        state.products.map((item) => {
          if (
            item.selectedProduct._id ===
            payload.selectedProduct.selectedProduct._id
          ) {
            itemFoundRemoveOne = item;
          }
        });

        (state.quantity = state.quantity - 1),
          (state.products = state.products
            ? itemFoundRemoveOne
              ? state.products.map((item, i) =>
                  item.selectedProduct._id ===
                  payload.selectedProduct.selectedProduct._id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
              : [...state.products]
            : [...state.products]),
          (state.total =
            state.total - payload.selectedProduct.selectedProduct.price * 1),
          (state.isLoading = false);
      }
    },

    clearCart: (state, action) => {
      (state.products = []),
        (state.quantity = 0),
        (state.total = 0),
        (state.isLoading = false);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getCart.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCart.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default  cartSlice.reducer;
export const {clearCart , removeOneFromCart , removeFromCart,addOneToCart,addToCart,loadingSuccessCart,syncDBCart,loadingCart  } = cartSlice.actions;
