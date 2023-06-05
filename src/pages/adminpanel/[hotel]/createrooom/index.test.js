import { render, screen } from "@testing-library/react";
import Createroom from "./index";

test("renders create room form", () => {
  render(<Createroom />);
  const formElement = screen.getByLabelText(/Type Of Room/i);
  expect(formElement).toBeInTheDocument();
});
