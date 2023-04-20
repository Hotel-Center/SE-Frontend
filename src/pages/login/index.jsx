/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import references from "../../assets/References.json";
import { cookies, makeURL } from "../../Utils/common";
import axios from "axios";
import { set_cookie } from "../../Utils/common";
import { useFormik } from "formik";
import { useState } from "react";
import Image from "next/image";

const theme = createTheme();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  function handleSubmit(values) {
    if (cookies.get("Authorization") != undefined) {
      setPopupMessage("Already logged in");
      setPopupIsOpen(true);
    } else {
      console.table(values);
      axios
        .post(makeURL(references.url_login), {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setPopupMessage("login successfully");
          setPopupIsOpen(true);
          set_cookie(response.data.auth_token);
          window.location.replace("/");
        })
        .catch((error) => {
          if (error.response.status == 400) {
            setPopupMessage("wrong email or password");
            setPopupIsOpen(true);
          }
        });
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src="/img/icon.png" width={40} height={40} />

          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Image src="/img/s4.png" width={300} height={300} />

          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* <div>
                <h5 styles={{ color: "red", fontSize: "14.5px" }}>
                  {formik.errors.email}
                </h5>
              </div> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
              style={{
                mt: 2,
                mb: 2,
                backgroundColor: "black",
                color: "white",
                marginTop: "20px",
                height: "43px",
                marginBottom: "10px",
              }}
            >
              Login
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-up" className="lnk_Login">
                  Don't have an account yet? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={popupIsOpen}
          autoHideDuration={2000}
          onClose={() => setPopupIsOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setPopupIsOpen(false)}
            severity={
              popupMessage ===
              ("wrong email or password" || "Already logged in")
                ? "error"
                : "success"
            }
            sx={{ width: "100%" }}
          >
            {popupMessage}
          </Alert>
        </Snackbar>{" "}
      </Container>
    </ThemeProvider>
  );
}
