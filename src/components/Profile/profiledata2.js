import * as React from "react";
import { TextField, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
import "../../css/Profile.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

const datePickerTheme = createTheme({
  palette: {
    primary: {
      main: "#cd9a2b",
      dark: "#cd9a2b",
      light: "#d7ae55",
      contrastText: "#fff",
    },
  },
});

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
  nationalcode: yup.string().required("Required!"),
  email: yup.string().email("Invalid email address").required("Required"),
  phone: yup.number().required("Required!"),
  aboutme: yup.string().max(250, "Can't be more than 250 characters."),
  telephone: yup.number(),
  gender: yup.string().required("Required!"),
  birthdate: yup.date().required("Required!"),
});

function Profile() {
  const CHARACTER_LIMIT = 250;
  const [genValue, setGenValue] = useState("Male");
  const [birthdate, setBirthdate] = useState(null);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
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
    },
    validationSchema: validationSchema,
  });

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
        // console.log('response of profile: ',res.data);
        setState(res.data);
        formik.setValues({
          firstname: res.data.firstName || "",
          lastname: res.data.lastName || "",
          nationalcode: res.data.national_code || "",
          email: res.data.email || "",
          phone: res.data.phone_number || "",
          aboutme: res.data.description || "",
          telephone: "",
        });
        setSelectedImage(
          res.data.avatar || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
        );
        setBirthdate(res.data.birthday || "");
        setGenValue(res.data.gender || "");
      });
  }, []);

  const handleClick = () => {
    let filled =
      !formik.errors.firstname &&
      !formik.errors.lastname &&
      !formik.errors.nationalcode &&
      !formik.errors.email &&
      !formik.errors.phone &&
      genValue.length != 0 &&
      formattedDate != "Invalid date";
    console.log("filled:", filled);

    if (filled) {
      // console.log(selectedImage);
      let form_data = new FormData();
      form_data.append("avatar", selectedImage, selectedImage.name);
      form_data.append("email", formik.values.email);
      form_data.append("firstName", formik.values.firstname);
      form_data.append("lastName", formik.values.lastname);
      form_data.append("birthday", formattedDate);
      form_data.append("gender", genValue);
      form_data.append("phone_number", formik.values.phone);
      form_data.append("national_code", formik.values.nationalcode);
      form_data.append("description", formik.values.aboutme);
      axios
        .put(makeURL(references.url_edit_profile), form_data, {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        })
        .then((response) => {
          console.log("status code: ", response.status);
          document.location.reload(true);
        })
        .catch((error) => {
          console.log("error: ", error);
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

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-lg-12">
          <div className="container edit-profile-form border">
            <div className="row">
              <div style={{ display: "none" }}>
                <div className="col-lg-3">
                  <div className="profile-img">
                    <img
                      src={"http://127.0.0.1:8000" + selectedImage}
                      className="rounded-circle"
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div className="col-lg-8" style={{ marginTop: "52px" }}>
                  <input
                    type="file"
                    name="myImage"
                    accept="image/*"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                </div>
              </div>

              <hr className="dashed" />

              <div className="mb-3 col-9">
                <div className="row">
                  <div className="col-lg-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="ms-2 mt-1 form-label"
                    >
                      Full name
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          required
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

                    {/* <input
                    type="name"
                    className="form-control"
                    id="exampleFormControlInput1"
                    // value={formik.values.fullname}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    // helperText={formik.touched.fullname && formik.errors.fullname}
                  ></input> */}
                  </div>
                </div>
              </div>

              <hr className="dashed" />

              <div className="mb-3 col-9">
                <div className="row">
                  <div className="col-lg-3">
                    <label
                      htmlFor="exampleFormControlInput2"
                      className="ms-2 mt-1 form-label"
                    >
                      National code
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
                        formik.touched.nationalcode &&
                        formik.errors.nationalcode
                      }
                    />
                  </div>
                </div>
              </div>

              <hr className="dashed" />

              <div className="mb-3 col-9">
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

              <hr className="dashed" />

              <div className="mb-3 col-9">
                <div className="row">
                  <div className="col-lg-3 ms-2">
                    <label htmlFor="date" className="col-1 col-form-label">
                      Birthday
                    </label>
                  </div>
                  <div className="col-lg-8 birthday-inp">
                    <ThemeProvider theme={datePickerTheme}>
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
                    </ThemeProvider>
                  </div>
                </div>
              </div>

              <hr className="dashed" />
            </div>

            <div>
              <div className="mb-3 col-9">
                <div className="row">
                  <div className="col-lg-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="ms-2 mt-1 form-label"
                    >
                      Phone number
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <TextField
                      required
                      fullWidth
                      placeholder="09912141869"
                      id="phone"
                      size="small"
                      label="Phone number"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </div>
                </div>
              </div>

              <hr className="dashed" />

              <div className="mb-3 col-9">
                <div className="row">
                  <div className="col-lg-3">
                    <label
                      htmlFor="exampleFormControlInput4"
                      className="ms-2 mt-1 form-label"
                    >
                      Email address
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>
                </div>
              </div>

              <hr className="dashed" />

              <div className="mb-3 col-9">
                <div className="row">
                  <div className="col-lg-3">
                    <label
                      htmlFor="exampleFormControlInput5"
                      className="ms-2 mt-1 form-label"
                    >
                      Telephone
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <TextField
                      fullWidth
                      placeholder="02632552012"
                      id="telephone"
                      size="small"
                      label="Telephone"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.telephone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.telephone &&
                        Boolean(formik.errors.telephone)
                      }
                      helperText={
                        formik.touched.telephone && formik.errors.telephone
                      }
                    />
                  </div>
                </div>
              </div>

              <hr className="dashed" />

              <div className="mb-3 col-9">
                <div className="row">
                  <div className="col-lg-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="ms-2 form-label"
                    >
                      About me
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
            </div>
            <div className="row mt-2 d-fit-content">
              <div className="col-4" />
              <div className="col-4" />
              <div className="col-4 edit-profile">
                <button className="btn edit-hotel" onClick={handleClick}>
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
