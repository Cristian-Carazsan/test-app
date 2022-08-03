import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders upload file button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/upload file/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders menu links", () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();
  const imagesLink = screen.getByText(/Images/i);
  expect(imagesLink).toBeInTheDocument();
  const sheetsLink = screen.getByText(/Sheets/i);
  expect(sheetsLink).toBeInTheDocument();
});
