import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

const mockStore = configureMockStore([thunk, promiseMiddleware()]);

describe("User Actions", () => {
  let store;

 /**
   * This is a mock Store - dont get excited
   */

  beforeEach(() => {
    store = mockStore({
      auth: {
        username: "jojo",
        _id: "123123123123123",
        userId: "123123",
        accessToken: "123123123",
        id: "123",
      },
      cart: {
        isLoading: true,
        products: [],
        quantity: 0,
        total: 0,
      },
    });
  });
});
