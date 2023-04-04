// import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import "./style.css";
import { Sign_up_connection } from "../../Utils/connection";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";

function SignupForm(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirm: "",
    },
    validate: function (values) {
      const errors = {};
      if (!values.email) {
        errors.email = "*Email field must not be empty!";
      } else if (
        !values.email.match(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        )
      ) {
        errors.email = "*Please enter a valid email.";
      }

      if (!values.password) {
        errors.password = "*Password field must not be empty";
      } else if (values.password.length < 8) {
        errors.password = "*Password length should be at least 8 characters.";
      } else if (!values.password.match(/^.*(?=.*[@#$%&]).*$/)) {
        errors.password =
          "*Password should contain at least one special character ( @, #, %, &,  $,).";
      } else if (!values.password.match(/^.*(?=.*[A-Z]).*$/)) {
        errors.password =
          "*Password should contain at least one uppercase letter(A-Z).";
      } else if (!values.password.match(/^.*(?=.*[a-z]).*$/)) {
        errors.password =
          "*Password should contain at least one lowercase letter(a-z).";
      } else if (!values.password.match(/^.*(?=.*\d).*$/)) {
        errors.password = "*Password should contain at least one digit(0-9). ";
      }

      if (!values.password_confirm) {
        errors.password_confirm = "*This field must not be empty!";
      } else if (values.password_confirm != values.password) {
        errors.password_confirm = "*Confirm password doesnt match!";
      }

      return errors;
    },
    onSubmit: function (values) {
      props.dispatch({
        type: "set_login_info",
        value: values,
      });
      const is_registered = Sign_up_connection(values.email, values.password);

      if (is_registered) {
        window.location.replace("/verify-email");
      }
    },
  });

  return (
    <Box
      fullWidth
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack spacing={1} fullWidth>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          className={
            formik.errors.email ? "is-invalid form-control" : "form-control"
          }
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <p className="err">
          {formik.errors.email || " "}
          <br />
        </p>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          className={
            formik.errors.password ? "is-invalid form-control" : "form-control"
          }
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <p className="err">
          {formik.errors.password || " "}
          <br />
        </p>
        <TextField
          required
          fullWidth
          name="password_confirm"
          label="Confirm Password"
          type="password"
          id="password_confirm"
          autoComplete="new-password"
          className={
            formik.errors.password_confirm
              ? "is-invalid form-control"
              : "form-control"
          }
          value={formik.values.password_confirm}
          onChange={formik.handleChange}
        />
        <p className="err">
          {formik.errors.password_confirm || " "}
          <br />
        </p>
      </Stack>
      <Box
        fullWidth
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mt: "auto",
          mb: 2,
        }}
      >
        <Button
          sx={{
            height: "40px",
            width: "45%",
          }}
          variant="outlined"
          onClick={props.prevStep}
        >
          Back
        </Button>
        <Button
          sx={{
            height: "40px",
            width: "45%",
            ml: "auto",
          }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
      <Link
        to="./login"
        variant="body2"
        sx={{
          color: "black",
          mt: 2,
        }}
      >
        Already have an account? Sign in
      </Link>
    </Box>
  );
}

export default SignupForm;
