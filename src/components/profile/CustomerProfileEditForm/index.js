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
import moment from "moment";
import Sidebar from "src/components/Profile/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";

const validationSchema = yup.object({
  firstname: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required!"),
  lastname: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required!"),
  user: yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    phone_number: yup
      .number()
      .required("Required!")
      .max(15, "Must be less than 15 digits"),
  }),
});

export default function CustomerProfileEditForm() {
  const CHARACTER_LIMIT = 250;
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [message1, setMessage1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genValue, setGenValue] = useState("Male");
  const [birthdate, setBirthdate] = useState(null);

  const [state, setState] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  let date = birthdate; // value from your state
  let formattedDate = moment(date).format("YYYY-MM-DD");
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
    onSubmit: (values) => {},
  });

  function loadInfo() {
    axios
      .get(makeURL(references.url_profile), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("response of profile: ", response.data);
        formik.setValues(response.data);
      });
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpen1(false);
  };

  const genhandleChange = (event, newValue) => {
    setGenValue(newValue);
  };

  useEffect(() => {
    loadInfo();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(makeURL(references.url_edit_profile), {
  //       headers: {
  //         Authorization: cookies.get("Authorization"),
  //       },
  //     })
  //     .then((res) => {
  //       console.log("response of profile: ", res.data);
  //       setState(res.data);
  //       formik.setValues({
  //         firstname: res.data.firstName || "",
  //         lastname: res.data.lastName || "",
  //         nationalcode: res.data.national_code || "",
  //         email: res.data.email || "",
  //         phone: res.data.phone_number || "",
  //         aboutme: res.data.description || "",
  //         telephone: "",
  //         gender: "",
  //         birthdate: "",
  //         balance: "",
  //         // telephone: res.data.phone_number || "",
  //         // balance: res.data.balance || 0,
  //       });
  //       // setSelectedImage(res.data.avatar);
  //       // setBirthdate(res.data.birthday || "");
  //       // setGenValue(res.data.gender || "");
  //     });
  // }, []);

  const handleClick = () => {
    // let filled =
    //   !formik.errors.firstname &&
    //   !formik.errors.lastname &&
    //   !formik.errors.nationalcode &&
    //   !formik.errors.email &&
    //   genValue.length != 0 &&
    //   formattedDate != "Invalid date";
    // console.log("filled:", filled);
    // if (!filled) {
    //   setOpen(true);
    //   setMessage("Please fill in the blanks.");
    // }
    // if (filled) {
    //   setLoading(true);
    //   axios
    //     .put(
    //       makeURL(references.url_edit_profile),
    //       {
    //         email: formik.values.email,
    //         firstName: formik.values.firstname,
    //         lastName: formik.values.lastname,
    //         birthday: formattedDate,
    //         gender: genValue,
    //         phone_number: phone2,
    //         national_code: formik.values.nationalcode,
    //         description: formik.values.aboutme,
    //       },
    //       {
    //         headers: {
    //           Authorization: cookies.get("Authorization"),
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log("status code: ", response.status);
    //       // document.location.reload(true);
    //       setOpen(true);
    //       setLoading(false);
    //       setMessage("Your profile was submitted successfully!");
    //     })
    //     .catch((error) => {
    //       console.log("error: ", error);
    //       setLoading(false);
    //       setOpen(true);
    //       setMessage("Please fill in the blanks.");
    //     });
    // }
    // console.log(
    //   formik.values.firstname,
    //   formik.values.lastname,
    //   formik.values.nationalcode,
    //   genValue,
    //   formattedDate,
    //   formik.values.email,
    //   formik.values.phone,
    //   formik.values.aboutme,
    //   formik.values.telephone,
    //   selectedImage
    // );
  };

  const handleUploadClick = () => {
    setLoading(true);
    if (!selectedImage) {
      setOpen1(true);
      setLoading(false);
      setMessage1("Please upload a picture.");
    }

    if (selectedImage) {
      let form_data = new FormData();
      form_data.append("avatar", selectedImage, selectedImage.name);
      axios
        .put(makeURL(references.url_profile), form_data, {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        })
        .then((res) => {
          console.log("uploading profile image: ", res.data);
          setLoading(false);
          setOpen1(true);
          setMessage1("Your image uploaded successfully!");
          window.location.reload(true);
        })
        .catch((err) => {
          console.log("unable to upload.error: ", err);
          setLoading(false);
          setOpen1(true);
          setMessage1("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div className="container edit-profile-form border">
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
                      id="firstname"
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
                      id="lastname"
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
                      id="phone"
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
                      id="email"
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
                <Button variant="contained" onClick={handleClick}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
