import { ActionTypes } from "../contants/action-types";

const initialState = {
  isLoading: false,
  products: [],
  quantity: 0,
  total: 0,
};

export const cartReducer = (
  state = initialState,
  { type, payload, quantity }
) => {
  switch (type) {
    case ActionTypes.LOADING_CART:
      return {
        ...state,
        products: [],
        isLoading: true,
      };
    case ActionTypes.SYNC_DB_CART:
 
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


      return {
        ...state,
        products: payload,
        quantity: sumQuantity1(payload),
        total: sumCost1(payload),

        isLoading: true,
      };
    case ActionTypes.LOADING_SUCCESS_CART:
      const sumQuantity = (payload) => {
        let sum = 0;
        payload.map((item) => {
          sum += item.quantity;
        });
        return sum;
      };


    case ActionTypes.ADD_TO_CART:
 

      let itemFound;
      if (state.products) {
        state.products.map((item) => {
          if (item.selectedProduct._id === payload.selectedProduct._id) {
            itemFound = item;
          }
        });
      }

      return {
        ...state,
        quantity: state.quantity + payload.quantity,
        products: state.products
          ? itemFound
            ? state.products.map((item, i) =>
                item.selectedProduct._id === payload.selectedProduct._id
                  ? { ...item, quantity: item.quantity + payload.quantity }
                  : item
              )
            : [...state.products, payload]
          : [payload],

        total: state.total + payload.selectedProduct.price * payload.quantity,
        isLoading: false,
      };

    case ActionTypes.ADD_ONE_TO_CART:
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
    
      return {
        ...state,
        quantity: state.quantity + 1,
        products: state.products
          ? itemFoundAddOne
            ? state.products.map((item, i) =>
                item.selectedProduct._id ===
                payload.selectedProduct.selectedProduct._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.products]
          : [...state.products],

        total: state.total + payload.selectedProduct.selectedProduct.price * 1,
        isLoading: false,
      };

    case ActionTypes.REMOVE_FROM_CART:
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

      return {
        ...state,
        quantity: state.quantity - payload.selectedProduct.quantity,
        products: state.products
          ? itemFoundRemove
            ? state.products.filter(
                (item) =>
                  item.selectedProduct._id !==
                  payload.selectedProduct.selectedProduct._id
              )
            : [...state.products]
          : [...state.products],

        total:
          state.total -
          payload.selectedProduct.selectedProduct.price *
            payload.selectedProduct.quantity,
        isLoading: false,
      };

    case ActionTypes.REMOVE_ONE_FROM_CART:
 

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
      }
    
      return {
        ...state,
        quantity: state.quantity - 1,
        products: state.products
          ? itemFoundRemoveOne
            ? state.products.map((item, i) =>
                item.selectedProduct._id ===
                payload.selectedProduct.selectedProduct._id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            : [...state.products]
          : [...state.products],

        total: state.total - payload.selectedProduct.selectedProduct.price * 1,
        isLoading: false,
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        products: [],
        quantity: 0,
        total: 0,
        isLoading: false,
      };

    default:
      return state;
  }
};
