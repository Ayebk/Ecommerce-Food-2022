import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Advertisement from "../Advertisement";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();
import "@testing-library/jest-dom/extend-expect";

let store;

beforeEach(() => {
  store = mockStore({
    auth: {
      username: "jojo",
      _id: "6343eaf79",
      userId: "444dcd33",
      accessToken: "eyJhbGcfdsnR5cgdfgdfsg",
      id: "6g4gvb",
    },
    cart: {
      isLoading: true,
      products: [],
      quantity: 0,
      total: 0,
    },
  });
});

const MockAdvertisement = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Advertisement />
      </Provider>
    </BrowserRouter>
  );
};

afterEach(() => {
  cleanup();
});

describe("Advertisement", () => {
  it("should NOT render ad div if we are not a logged user ", async () => {
    render(<MockAdvertisement />);
    const inputElement = screen.queryByTestId("advertisemen");
    expect(inputElement).toBeNull();
  });
});
