import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CreateHotel from "./index";

test("1.renders the CreateHotel component", () => {
  render(<CreateHotel />);
});
test("2.renders the 'Why Hotel Center' heading", () => {
  const { getByText } = render(<CreateHotel />);
  const heading = getByText(/Why Hotel Center/i);
  expect(heading).toBeInTheDocument();
});
test("3.renders the div with class 'row'", () => {
  const { container } = render(<CreateHotel />);
  const rowDiv = container.querySelector(".row");
  expect(rowDiv).toBeInTheDocument();
});
test("4.renders the 'Create your hotel now!' button", () => {
  const { getByText } = render(<CreateHotel />);
  const button = getByText(/Create your hotel now!/i);
  expect(button).toBeInTheDocument();
});
test("5.renders the link to '/createHotel/steps/1'", () => {
  const { getByRole } = render(<CreateHotel />);
  const link = getByRole("link", { href: "/createHotel/steps/1" });
  expect(link).toBeInTheDocument();
});
test("6.renders the container with class 'bg-white'", () => {
  const { container } = render(<CreateHotel />);
  expect(container.firstChild).toHaveClass("bg-white");
});
test("7.renders headings correctly", () => {
  const { getByText } = render(<CreateHotel />);
  expect(getByText("Why Hotel Center")).toBeInTheDocument();
  expect(getByText("Customer credibility and trust")).toBeInTheDocument();
  expect(getByText("Hotel reputation")).toBeInTheDocument();
  expect(getByText("Profit and save time")).toBeInTheDocument();
});
test("8.renders create hotel button with correct text", () => {
  const { getByText } = render(<CreateHotel />);
  expect(getByText("Create your hotel now!")).toBeInTheDocument();
});
test('9.renders "Create your hotel now!" button and it is clickable', () => {
  const { getByText } = render(<CreateHotel />);
  const button = getByText("Create your hotel now!");
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  // assert that the user is redirected to the correct page
});
test('10.renders "Customer credibility and trust" section with correct icon, heading, and text', () => {
  const { getByText, getByTestId } = render(<CreateHotel />);
  const icon = getByTestId("HandshakeIcon");
  const heading = getByText("Customer credibility and trust");
  const text = getByText("Your trust in us guarantees your credibility.");
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveStyle({ color: "#c99015" });
  expect(heading).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
