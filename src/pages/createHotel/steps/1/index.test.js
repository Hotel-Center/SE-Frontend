import CreateHotel from "./index";
// import { Alert } from ".";
import { Alert } from ".";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-test-renderer";

it("1.renders the CreateHotel component", () => {
  render(<CreateHotel />);
  // add your assertions here
});

describe("step1 Page", () => {
  it("2.renders create hotel button", () => {
    const CreateHotelpage = render(<CreateHotel />);
    expect(CreateHotelpage.getByTitle("submit")).toBeTruthy();
  });
  it("3.renders all fields", () => {
    const CreateHotelpage = render(<CreateHotel />);
    expect(CreateHotelpage.getByTitle("name")).toBeTruthy();
    expect(CreateHotelpage.getByTitle("country")).toBeTruthy();
    expect(CreateHotelpage.getByTitle("a20")).toBeTruthy();
    expect(CreateHotelpage.getByTitle("Address")).toBeTruthy();
    expect(CreateHotelpage.getByTitle("Description")).toBeTruthy();
  });
});

describe("CreateHotel Validation", () => {
  it("4.ignores the name validation if name input is not onfocused", async () => {
    const user = userEvent.setup();
    const CreateHotelpage = render(<CreateHotel />);
    let nameInput = await CreateHotelpage.findByRole("textbox", {
      name: "Name",
    });

    act(() => {
      nameInput.focus();
    });
    await waitFor(() => {
      expect(nameInput).toHaveFocus();
    });
    await user.type(nameInput, "Sahar");

    expect(CreateHotelpage.queryByText("Please enter your name")).toBeNull();
  });
  it("5.ignores the address validation if address input is not onfocused", async () => {
    const user = userEvent.setup();
    const CreateHotelpage = render(<CreateHotel />);
    let addInput = await CreateHotelpage.findByRole("textbox", {
      name: "Address",
    });

    act(() => {
      addInput.focus();
    });
    await waitFor(() => {
      expect(addInput).toHaveFocus();
    });
    await user.type(addInput, "London, Baker street, 221B");

    expect(CreateHotelpage.queryByText("Please enter your address")).toBeNull();
  });
});

describe("step1 Alert", () => {
  it("6.renders alert text", () => {
    const alertMessage = "Alert Message";
    const alert = render(<Alert>{alertMessage}</Alert>);
    expect(alert.getByText(alertMessage)).toBeTruthy();
  });

  it("7.shows success message properly", () => {
    const alertMessage = "Success Message";
    const alert = render(<Alert severity="success">{alertMessage}</Alert>);
    expect(alert.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");
  });

  it("8.shows error message properly", () => {
    const alertMessage = "Error Message";
    const alert = render(<Alert severity="error">{alertMessage}</Alert>);
    expect(alert.getByRole("alert")).toHaveClass("MuiAlert-filledError");
  });
});

describe("Alert component", () => {
  it("9.changes the severity class based on the severity prop", () => {
    const page = render(<Alert severity="error">Test message</Alert>);
    const alert = page.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledError");
  });
});
