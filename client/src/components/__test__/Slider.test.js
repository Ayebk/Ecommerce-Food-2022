import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Slider from "../Slider";
import "@testing-library/jest-dom/extend-expect";

const MockSlider = () => {
  return (
    <BrowserRouter>
      <Slider />
    </BrowserRouter>
  );
};

const sliderList = [
  "טעמת את הקפה הזה?",
  "להתרענן ולהרגיש כמו חדש",
  "משהו חדש ומפתיע?",
];

afterEach(() => {
  cleanup();
});

describe("Slider", () => {
  it("should render 3 Sliders with content", async () => {
    render(<MockSlider />);

    sliderList.forEach((title) => {
      const inputElement = screen.getByRole("heading", { name: title });
      expect(inputElement).toBeInTheDocument();
    });
  });
});
