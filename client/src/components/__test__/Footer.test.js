import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  it("should render heading left", async () => {
    render(<Footer />);
    const headElement = screen.getByRole("heading", {
      name: /הישארו מעודכנים/i,
    });
    expect(headElement).toBeInTheDocument();
  });

  it("should render heading right", async () => {
    render(<Footer />);
    const headElement = screen.getByRole("heading", { name: /אודותינו/i });
    expect(headElement).toBeInTheDocument();
  });
});
