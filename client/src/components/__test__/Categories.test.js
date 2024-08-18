import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Categories from "../Categories";
import "@testing-library/jest-dom/extend-expect";

const MockCategories = () => {
  return (
    <BrowserRouter>
      <Categories />
    </BrowserRouter>
  );
};

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

afterEach(() => {
  cleanup();
});

describe("Categories", () => {
  it("should render 8 categories", async () => {
    render(<MockCategories />);
    // const categoriesElement = await screen.getByRole()
    const catDivElements = screen.getAllByRole("link");
    expect(catDivElements.length).toBe(8);
  });

  it("should render one category shown by name", async () => {
    render(<MockCategories />);
    const catDivElement = screen.getByRole("link", { name: "משקאות" });
    expect(catDivElement).toBeInTheDocument();
  });

  it("should render 8 categories shown by names", async () => {
    render(<MockCategories />);

    categoriesList.forEach((name) => {
      const inputElement = screen.getByRole("link", { name: name });
      expect(inputElement).toBeInTheDocument();
    });
  });
});
