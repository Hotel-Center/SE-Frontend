/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */

import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "src/Utils/common";
import references from "src/assets/References.json";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import Sidebar from "src/components/Profile/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";

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
  nationalcode: yup
    .string()
    .max(10, "Must be less than 10 digits")
    .required("Required!"),
  email: yup.string().email("Invalid email address").required("Required"),
  phone: yup
    .number()
    .required("Required!")
    .max(15, "Must be less than 15 digits"),
  aboutme: yup.string().max(250, "Can't be more than 250 characters."),
  telephone: yup.number(),
  gender: yup.string().required("Required!"),
  birthdate: yup.date().required("Required!"),
  balance: yup.number(),
});

export default function CustomerProfileEditForm() {
  const CHARACTER_LIMIT = 250;
  const [message, setMessage] = useState("");
  const [phone2, setphone2] = useState(null);
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
      firstname: "",
      lastname: "",
      nationalcode: "",
      email: "",
      phone: "",
      aboutme: "",
      telephone: "",
      gender: "",
      birthdate: "",
      balance: "",
    },
    validationSchema: validationSchema,
  });

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
    axios
      .get(makeURL(references.url_edit_profile), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((res) => {
        console.log("response of profile: ", res.data);
        setState(res.data);
        formik.setValues({
          firstname: res.data.firstName || "",
          lastname: res.data.lastName || "",
          nationalcode: res.data.national_code || "",
          email: res.data.email || "",
          phone: res.data.phone_number || "",
          aboutme: res.data.description || "",
          // telephone: res.data.phone_number || "",
          // balance: res.data.balance || 0,
        });
        // setSelectedImage(res.data.avatar);
        // setBirthdate(res.data.birthday || "");
        // setGenValue(res.data.gender || "");
      });
  }, []);

  const handleClick = () => {
    let filled =
      !formik.errors.firstname &&
      !formik.errors.lastname &&
      !formik.errors.nationalcode &&
      !formik.errors.email &&
      genValue.length != 0 &&
      formattedDate != "Invalid date";
    console.log("filled:", filled);

    if (!filled) {
      setOpen(true);
      setMessage("Please fill in the blanks.");
    }

    if (filled) {
      setLoading(true);
      axios
        .put(
          makeURL(references.url_edit_profile),
          {
            email: formik.values.email,
            firstName: formik.values.firstname,
            lastName: formik.values.lastname,
            birthday: formattedDate,
            gender: genValue,
            phone_number: phone2,
            national_code: formik.values.nationalcode,
            description: formik.values.aboutme,
          },
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((response) => {
          console.log("status code: ", response.status);
          // document.location.reload(true);
          setOpen(true);
          setLoading(false);
          setMessage("Your profile was submitted successfully!");
        })
        .catch((error) => {
          console.log("error: ", error);
          setLoading(false);
          setOpen(true);
          setMessage("Please fill in the blanks.");
        });
    }

    console.log(
      formik.values.firstname,
      formik.values.lastname,
      formik.values.nationalcode,
      genValue,
      formattedDate,
      formik.values.email,
      formik.values.phone,
      formik.values.aboutme,
      formik.values.telephone,
      selectedImage
    );
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
        .put(makeURL(references.url_edit_profile), form_data, {
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
              <div className="col-lg-3">
                <div className="profile-img">
                  {selectedImage !== null ? (
                    <img
                      src={references.base_address + selectedImage}
                      className="rounded-circle"
                      alt="Avatar"
                    />
                  ) : (
                    <Image
                      src="/img/pics/avatar.jpg"
                      width={130}
                      height={130}
                      alt="Avatar"
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-center">
                <input
                  data-testid="no1"
                  type="file"
                  name="myImage"
                  accept="image/*"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                <Button variant="contained" onClick={handleUploadClick}>
                  {loading ? (
                    <CircularProgress style={{ color: "#fff" }} size="1.5rem" />
                  ) : (
                    "Upload"
                  )}
                </Button>
                <Snackbar
                  open={open1}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    onClose={handleClose}
                    severity={
                      message1 === "Your image uploaded successfully!"
                        ? "success"
                        : "error"
                    }
                    sx={{ width: "100%" }}
                  >
                    {message1}
                  </Alert>
                </Snackbar>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="ms-2 mt-1 form-label"
                  >
                    Full Name
                  </label>
                </div>
                <div className="col-lg-8">
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        placeholder="Eric"
                        id="firstname"
                        size="small"
                        label="First name"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstname &&
                          Boolean(formik.errors.firstname)
                        }
                        helperText={
                          formik.touched.firstname && formik.errors.firstname
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        placeholder="Hodson"
                        id="lastname"
                        size="small"
                        label="Last name"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.lastname &&
                          Boolean(formik.errors.lastname)
                        }
                        helperText={
                          formik.touched.lastname && formik.errors.lastname
                        }
                      />
                    </Grid>
                  </Grid>

                  <input
                    type="name"
                    className="form-control"
                    id="exampleFormControlInput1"
                    // value={formik.values.fullname}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    // helperText={formik.touched.fullname && formik.errors.fullname}
                  ></input>
                </div>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="ms-2 mt-1 form-label"
                  >
                    National Code
                  </label>
                </div>
                <div className="col-lg-8">
                  <TextField
                    required
                    fullWidth
                    placeholder="0023839813"
                    id="nationalcode"
                    size="small"
                    label="National code"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.nationalcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.nationalcode &&
                      Boolean(formik.errors.nationalcode)
                    }
                    helperText={
                      formik.touched.nationalcode && formik.errors.nationalcode
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="ms-2 mt-1 form-label"
                  >
                    Gender
                  </label>
                </div>
                <div className="col-lg-9">
                  <RadioGroup
                    row
                    aria-label="level"
                    name="row-radio-buttons-group"
                    value={genValue}
                    onChange={genhandleChange}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3 ms-2">
                  <label htmlFor="date" className="col-1 col-form-label">
                    Birthday
                  </label>
                </div>
                <div className="col-lg-8 birthday-inp">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Birthdate"
                      value={birthdate}
                      onChange={(newValue) => {
                        setBirthdate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="ms-2 mt-1 form-label"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="col-lg-8">
                  <PhoneInput
                    country={"us"}
                    size="large"
                    id="phone"
                    label="Phone number"
                    name="phone"
                    fullWidth
                    required
                    value={phone2}
                    onChange={(val) => {
                      setphone2(val);
                      console.log("pho", val);
                    }}
                  />
                  {/* // <TextField
                    //   required
                    //   fullWidth
                    //   placeholder="09912141869"
                    //   id="phone"
                    //   size="small"
                    //   label="Phone number"
                    //   InputLabelProps={{ shrink: true }}
                    //   value={formik.values.phone}
                    //   onChange={formik.handleChange}
                    //   onBlur={formik.handleBlur}
                    //   error={
                    //     formik.touched.phone && Boolean(formik.errors.phone)
                    //   }
                    //   helperText={formik.touched.phone && formik.errors.phone}
                    // />  */}
                </div>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="ms-2 mt-1 form-label"
                  >
                    Email Address
                  </label>
                </div>
                <div className="col-lg-8">
                  <TextField
                    required
                    fullWidth
                    placeholder="yf7901@gamil.com"
                    id="email"
                    size="small"
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    htmlFor="exampleFormControlInput5"
                    className="ms-2 mt-1 form-label"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="col-lg-8">
                  <TextField
                    fullWidth
                    placeholder="02632552012"
                    id="phone"
                    size="small"
                    label="Phone Number"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: true }}
                    value={formik.values.phone}
                  />
                </div>
              </div>
            </div>

            <hr className="dashed"></hr>

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="ms-2 form-label"
                  >
                    About Me
                  </label>
                </div>
                <div className="col-lg-8">
                  <TextField
                    fullWidth
                    id="aboutme"
                    placeholder=""
                    multiline
                    autoComplete="aboutme"
                    label="About me"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: CHARACTER_LIMIT }}
                    value={formik.values.aboutme}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.aboutme && Boolean(formik.errors.aboutme)
                    }
                    helperText={`${formik.values.aboutme.length}/${CHARACTER_LIMIT}`}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2 d-fit-content">
              <div className="col-4"></div>
              <div className="col-4"></div>
              <div className="col-4 edit-profile">
                <Button variant="contained" onClick={handleClick}>
                  {loading ? (
                    <CircularProgress style={{ color: "#fff" }} size="1.5rem" />
                  ) : (
                    "Edit Profile"
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
