import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
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

const MockNavbar = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
};

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  const categoriesList = [
    "משקאות",
    "מתוקים",
    "לחמים",
    "קפה",
    "גבינות",
    "בשרים",
    "פיצות",
    "ירקות ופירות",
  ];

  it("should render all categories when product buttom clicked", async () => {
    render(<MockNavbar />);
    const buttonElement = screen.getByText(/מוצרים/i);
    fireEvent.click(buttonElement);

    categoriesList.forEach((name) => {
      const inputElement = screen.getByRole("heading", { name: name });
      expect(inputElement).toBeInTheDocument();
    });
  });

  it("should render search with placeholder and will change by typing", async () => {
    render(<MockNavbar />);
    const inputElement = screen.getByPlaceholderText(/חיפוש.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "גלידה" } });
    expect(inputElement.value).toBe("גלידה");
  });

  it("should render avatar icon if we have user logged", async () => {
    render(<MockNavbar />);
    const iconElement = screen.getByTestId("AccountBoxIcon");
    expect(iconElement).toBeInTheDocument();
  });
});
