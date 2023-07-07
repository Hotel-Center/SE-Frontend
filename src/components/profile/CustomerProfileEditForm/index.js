/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */

import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { cookies, makeURL } from "src/Utils/common";
import references from "src/assets/References.json";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import Sidebar from "src/components/Profile/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";

const validationSchema = yup.object({
  first_name: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required!"),
  last_name: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required!"),
  user: yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    phone_number: yup
      .string()
      .required("Required!")
      .max(15, "Must be less than 15 digits"),
  }),
});

export default function CustomerProfileEditForm() {
  const CHARACTER_LIMIT = 250;
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function loadInfo() {
    axios
      .get(makeURL(references.url_profile), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        formik.setValues(response.data);
      });
  }

  function updateProfile(values) {
    axios
      .patch(makeURL(references.url_profile), values, {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        setMessage("Your profile was updated!");
        setOpen(true);
        loadInfo();
      });
  }

  const formik = useFormik({
    initialValues: {
      user: {
        email: "",
        phone_number: "",
      },
      first_name: "",
      last_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: updateProfile,
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <form
            onSubmit={formik.handleSubmit}
            className="container edit-profile-form border"
          >
            <div className="row">
              <Typography variant="h4">Your Profile</Typography>
            </div>

            <div className="mt-5 col-12">
              <div className="row">
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography>Name</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      required
                      fullWidth
                      placeholder="Eric"
                      id="first_name"
                      size="small"
                      label="First Name"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.first_name &&
                        Boolean(formik.errors.first_name)
                      }
                      helperText={
                        formik.touched.first_name && formik.errors.first_name
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      required
                      fullWidth
                      placeholder="Hodson"
                      id="last_name"
                      size="small"
                      label="Last Name"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.last_name &&
                        Boolean(formik.errors.last_name)
                      }
                      helperText={
                        formik.touched.last_name && formik.errors.last_name
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="mt-5 col-12">
              <div className="row">
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="mt-1 form-label"
                    >
                      Phone Number
                    </label>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      required
                      fullWidth
                      placeholder="09912141869"
                      id="user.phone_number"
                      size="small"
                      label="Phone Number"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.user.phone_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.user?.phone_number &&
                        Boolean(formik.errors.user?.phone_number)
                      }
                      helperText={
                        formik.touched.user?.phone_number &&
                        formik.errors.user?.phone_number
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="mt-5 col-12">
              <div className="row">
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <label
                      htmlFor="exampleFormControlInput4"
                      className="mt-1 form-label"
                    >
                      Email Address
                    </label>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      required
                      fullWidth
                      placeholder="yf7901@gamil.com"
                      id="user.email"
                      size="small"
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.user.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.user?.email &&
                        Boolean(formik.errors.user?.email)
                      }
                      helperText={
                        formik.touched.user?.email && formik.errors.user?.email
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="row mt-4 d-fit-content">
              <div className="col-4"></div>
              <div className="col-4"></div>
              <div className="col-4 edit-profile">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  {loading ? (
                    <CircularProgress style={{ color: "#fff" }} size="1.5rem" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity={
                  message === "Please fill in the blanks." ? "error" : "success"
                }
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </form>
        </div>
      </div>
    </div>
  );
}
