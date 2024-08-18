import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Products from "../Products";
import "@testing-library/jest-dom/extend-expect";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const mockStore = configureMockStore();
import "@testing-library/jest-dom/extend-expect";

let store;

let filters;

beforeEach(() => {
  filters = { category: "sweets" };

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
    products: {
      products: [
        {
          _id: 1,
          title: "cake",
          price: "2",
          priceExtra: "0",
          priceDesc: "גרם",
          brand: "foodnow",
          img: "",
          categories: ["sweets"],
        },
        {
          _id: 2,
          title: "apple",
          price: "4",
          priceExtra: "0",
          priceDesc: " גרם",
          brand: "foodnow",
          img: "",
          categories: ["sweets"],
        },
      ],
    },
  });
});

afterEach(() => {
  cleanup();
});

const MockProducts = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Products category="sweets" filters={{ category: "sweets" }} />
      </Provider>
    </BrowserRouter>
  );
};

describe("Products", () => {
  it("should render  Product shown by name", async () => {
    render(<MockProducts />);

    const productTitleElement = await screen.queryByText(/apple/i);
    expect(productTitleElement).toBeInTheDocument();
  });
});
