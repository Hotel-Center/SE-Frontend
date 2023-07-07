import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import LoginForm from ".";

describe("Login Form", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LoginForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has editable login fields", async () => {
    const user = userEvent.setup();
    const loginForm = render(<LoginForm />);

    let emailInput = loginForm.getByRole("textbox", {
      name: "Email Address",
    });
    let passwordField = loginForm.getByRole("password", {
      name: "Password",
    });
    let passwordInput = passwordField.children[1].firstElementChild;

    expect(emailInput.textContent).toBe("");
    expect(passwordInput.textContent).toBe("");

    const email = "email@example.com";
    const password = "example_password";

    await user.type(emailInput, email);
    await user.type(passwordInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);
  });

  it("ignores the email validation if email input is not onfocused", async () => {
    const user = userEvent.setup();
    const loginForm = render(<LoginForm />);
    let emailInput = loginForm.getByRole("textbox", {
      name: "Email Address",
    });

    await user.type(emailInput, "invalid@email");

    expect(loginForm.queryByText("Please enter your email address")).toBeNull();
  });

  it("ignores the password validation if password input is not onfocused", async () => {
    const user = userEvent.setup();
    const loginForm = render(<LoginForm />);
    let passwordField = loginForm.getByRole("password", {
      name: "Password",
    });

    await user.click(passwordField);

    expect(loginForm.queryByText("Please enter your password")).toBeNull();
  });

  it("fails the email validation if email is empty", async () => {
    const user = userEvent.setup();
    const loginForm = render(<LoginForm />);
    let emailInput = loginForm.getByRole("textbox", {
      name: "Email Address",
    });

    await user.click(emailInput);
    await waitFor(() => {
      emailInput.blur();
      expect(emailInput).not.toHaveFocus();
    });

    expect(
      await loginForm.findByText("Please enter your email address")
    ).toBeTruthy();
  });

  it("fails the email validation if email is invalid", async () => {
    const user = userEvent.setup();
    const loginForm = render(<LoginForm />);
    let emailInput = await loginForm.findByRole("textbox", {
      name: "Email Address",
    });

    await user.type(emailInput, "invalid@email");
    await waitFor(() => {
      emailInput.blur();
      expect(emailInput).not.toHaveFocus();
    });

    expect(
      loginForm.queryByText("Please enter a valid email address")
    ).toBeTruthy();
  });

  it("fails the password validation if password is empty", async () => {
    const user = userEvent.setup();
    const loginForm = render(<LoginForm />);
    let passwordField = loginForm.getByRole("password", {
      name: "Password",
    });
    let passwordInput = passwordField.children[1].firstElementChild;

    await user.click(passwordInput);
    await waitFor(() => {
      passwordInput.blur();
      expect(passwordInput).not.toHaveFocus();
    });

    expect(loginForm.queryByText("Please enter your password")).toBeTruthy();
  });

  it("ignores password validation if email is validated", async () => {
    const user = userEvent.setup();
    const loginForm = render(<LoginForm />);
    let emailInput = loginForm.getByRole("textbox", {
      name: "Email Address",
    });

    await user.click(emailInput);
    await waitFor(() => {
      emailInput.blur();
      expect(emailInput).not.toHaveFocus();
    });

    expect(loginForm.queryByText("Please enter your password")).toBeNull();
  });

  it("submits valid inputs", async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    const loginForm = render(<LoginForm handleSubmit={handleSubmit} />);
    let emailInput = loginForm.getByRole("textbox", {
      name: "Email Address",
    });
    let passwordField = loginForm.getByRole("password", {
      name: "Password",
    });
    let submitButton = loginForm.getByRole("button", {
      name: "Login",
    });
    let passwordInput = passwordField.children[1].firstElementChild;

    await user.type(emailInput, "valid@email.address");
    await user.type(passwordInput, "password");
    await waitFor(() => {
      passwordInput.blur();
      expect(passwordInput).not.toHaveFocus();
    });

    expect(loginForm.queryByText("Please enter your email address")).toBeNull();
    expect(
      loginForm.queryByText("Please enter a valid email address")
    ).toBeNull();
    expect(loginForm.queryByText("Please enter your password")).toBeNull();

    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        email: "valid@email.address",
        password: "password",
      },
      expect.anything()
    );
  });
});
