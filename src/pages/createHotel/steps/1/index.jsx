import * as React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../../../Utils/common";
import references from "../../../../assets/References.json";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const textfieldTheme = createTheme({
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
  name: yup
    .string()
    .max(30, "Must be 15 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required!"),
  address: yup
    .string()
    .max(200, "Must be 200 characters or less")
    .min(7, "Must be at least 7 characters")
    .required("Required!"),
  email: yup.string().email("Invalid email address").required("Required"),
  phone: yup.number().required("Required!"),
  description: yup.string().max(1000, "Can't be more than 500 characters."),
  country: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required!"),
  city: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required!"),
});

function CreateHotel() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [toggled, setToggled] = useState(false);
  const CHARACTER_LIMIT = 1000;
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);

  const [region, setRegion] = useState(null);
  const [city, setCity] = useState(null);
  const [phone, setPhone] = useState(null);

  let tempcheckin = checkin; // value from your state
  let tempcheckout = checkout; // value from your state
  let formattedcheckinDate = moment(tempcheckin).format("hh:mm");
  let formattedcheckoutDate = moment(tempcheckout).format("hh:mm");

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      description: "",
      country: "",
      city: "",
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
  };

  const handleClick = () => {
    let filled =
      !formik.errors.name &&
      !formik.errors.address &&
      !formik.errors.description &&
      // facilities.length != 0 &&
      formattedcheckinDate != "Invalid time" &&
      formattedcheckoutDate != "Invalid time";
    console.log("filled: ", filled);
    console.log(
      "informations validation: ",
      !formik.errors.name,
      "\n",
      !formik.errors.address,
      "\n",
      !formik.errors.description,
      "\n",
      formattedcheckinDate,
      "\n",
      formattedcheckoutDate,
      "\n",
      !formik.errors.name &&
        !formik.errors.address &&
        !formik.errors.description &&
        // facilities.length != 0 &&
        formattedcheckinDate != " Invalid date" &&
        formattedcheckoutDate != " Invalid date"
    );
    console.log("checkin time: ", formattedcheckinDate);
    console.log("checkout time: ", formattedcheckoutDate);
    if (!filled) {
      setOpen(true);
      setMessage("Please fill in the blanks.");
    }

    if (filled) {
      axios
        .post(
          makeURL(references.url_addhotel),
          {
            name: formik.values.name,
            address: formik.values.address,
            description: formik.values.description,
            phone_number: String(phone),
            country: region,
            city: city,
            check_in_range: formattedcheckinDate,
            check_out_range: formattedcheckoutDate,
          },
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((res) => {
          console.log("responseeeeeeeee", res.data.id);
          setOpen(true);
          setLoading(false);
          console.log(
            "name:",
            formik.values.name,
            "\n",
            "address:",
            formik.values.address,
            "\n",
            "description:",
            formik.values.description,
            "\n",
            "phone_number:",
            String(phone),
            "\n",
            "country:",
            region,
            "\n",
            "city:",
            city,
            "\n",
            "check_in_range:",
            formattedcheckinDate,
            "\n",
            "check_out_range:",
            formattedcheckoutDate
          );
          setMessage("Your hotel was submitted successfully!");
          console.log("hotelId:", res.data.id);
          // window.location.replace("/createHotel/steps/2/" + res.data.id);
        })
        .catch((err) => {
          console.log(err);
          console.log(
            "name:",
            formik.values.name,
            "\n",
            "address:",
            formik.values.address,
            "\n",
            "description:",
            formik.values.description,
            "\n",
            "phone_number:",
            formik.values.phone,
            "\n",
            "country:",
            region,
            "\n",
            "city:",
            city,
            "\n",
            "check_in_range:",
            formattedcheckinDate,
            "\n",
            "check_out_range:",
            formattedcheckoutDate
          );
          setLoading(false);
          setOpen(true);
          setMessage("We have a problem, try again later.");
        });
    }
  };

  return (
    <div className="containter m-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card-body">
            <div className="shadow p-3 mb-5 bg-body rounded">
              <div className="stepper-container-horizontal  ">
                <div className="col"></div>
                <div
                  className={`admin-panel ${toggled ? "toggled" : ""} d-flex`}
                  title="a1"
                >
                  <div className="w-100" title="a2">
                    <div className="container py-5 px-lg-5" title="a3">
                      <h2 className="mb-4 fw-bold d-flex" title="a4">
                        <DomainAddIcon
                          className="me-2"
                          fontSize="large"
                          title="a5"
                        />
                        Create Hotel
                      </h2>
                      <div
                        className="container mt-4 p-4 edit-hotel-form border"
                        title="a6"
                      >
                        <div className="mb-3 col-12" title="a7">
                          <div className="row mt-3" title="a8">
                            <div className="col-lg-3" title="a9">
                              <label
                                for="exampleFormControlInput2"
                                className="ms-2 mt-1 form-label"
                                title="f1"
                              >
                                Name
                              </label>
                            </div>
                            <div className="col-lg-9" title="a10">
                              <ThemeProvider theme={textfieldTheme}>
                                <TextField
                                  required
                                  fullWidth
                                  placeholder="Something hotel"
                                  id="name"
                                  size="small"
                                  label="Name"
                                  InputLabelProps={{ shrink: true }}
                                  value={formik.values.name}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                  }
                                  helperText={
                                    formik.touched.name && formik.errors.name
                                  }
                                />
                              </ThemeProvider>
                            </div>
                          </div>
                        </div>
                        <hr class="dashed" title="a11" />
                        <div className="mb-3 col-12">
                          <div className="row">
                            <div className="col-lg-3">
                              <label
                                for="exampleFormControlInput2"
                                className="ms-2 mt-1 form-label"
                                title="f4"
                              >
                                Country & City
                              </label>
                            </div>

                            <div className="col-lg-9">
                              <div className="row">
                                <div className="col-lg-6" title="a19">
                                  <ThemeProvider theme={textfieldTheme}>
                                    <div className="div">
                                      <div className="col-lg-12">
                                        <CountryDropdown
                                          fullwidth
                                          style={{
                                            color: "#555",
                                            border: "1px solid #555;",
                                          }}
                                          className={" form-control    "}
                                          required
                                          fullWidth
                                          placeholder="USA"
                                          id="country"
                                          size="small"
                                          label="County"
                                          InputLabelProps={{ shrink: true }}
                                          value={region}
                                          onChange={(val) => {
                                            setRegion(val);
                                            console.log(val, "region");
                                          }}
                                        />
                                      </div>
                                      <br />
                                      <div className="col-lg-12">
                                        {" "}
                                        <RegionDropdown
                                          title="a20"
                                          style={{
                                            color: "#555",
                                            border: "1px solid #555;",
                                          }}
                                          className={" form-control "}
                                          country={region}
                                          required
                                          fullWidth
                                          placeholder="New York"
                                          id="city"
                                          size="small"
                                          label="City"
                                          InputLabelProps={{ shrink: true }}
                                          value={city}
                                          onChange={(val) => {
                                            setCity(val);
                                            console.log("city", val);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </ThemeProvider>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr class="dashed" />
                        <div className="mb-3 col-12">
                          <div className="row">
                            <div className="col-lg-3">
                              <label
                                for="exampleFormControlInput2"
                                className="ms-2 mt-1 form-label"
                                title="f3"
                              >
                                Address
                              </label>
                            </div>
                            <div className="col-lg-9" title="a18">
                              <ThemeProvider theme={textfieldTheme}>
                                <TextField
                                  required
                                  fullWidth
                                  placeholder="London, 22B Baker street"
                                  id="address"
                                  size="small"
                                  label="Address"
                                  InputLabelProps={{ shrink: true }}
                                  value={formik.values.address}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.address &&
                                    Boolean(formik.errors.address)
                                  }
                                  helperText={
                                    formik.touched.address &&
                                    formik.errors.address
                                  }
                                />
                              </ThemeProvider>
                            </div>
                          </div>
                        </div>
                        <hr class="dashed" />
                        <div className="mb-3 col-12">
                          <div className="row">
                            <div className="col-lg-3" title="a17">
                              <label
                                for="exampleFormControlInput2"
                                className="ms-2 mt-1 form-label"
                                title="f6"
                              >
                                Time range
                              </label>
                            </div>
                            <div className="col-lg-9">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="col-lg-12 checkin-inp">
                                    <ThemeProvider theme={textfieldTheme}>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                      >
                                        <TimePicker
                                          label="Checkin time"
                                          value={checkin}
                                          ampm={false}
                                          onChange={(newValue) => {
                                            setCheckin(newValue);
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
                                <div className="col-lg-6">
                                  <div className="col-lg-12 mt-2 mt-lg-0 checkout-inp">
                                    <ThemeProvider theme={textfieldTheme}>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                      >
                                        <TimePicker
                                          label="Checkout time"
                                          ampm={false}
                                          value={checkout}
                                          onChange={(newValue) => {
                                            setCheckout(newValue);
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
                            </div>
                          </div>
                        </div>
                        <hr class="dashed" />
                        <div className="mb-3 col-12">
                          <div className="row">
                            <div className="col-lg-3">
                              <label
                                for="exampleFormControlInput3"
                                className="ms-2 mt-1 form-label"
                                title="f7"
                              >
                                Phone number
                              </label>
                            </div>
                            <div className="col-lg-9" style={{ width: "100" }}>
                              <ThemeProvider
                                theme={textfieldTheme}
                                style={{ width: "100" }}
                              >
                                <PhoneInput
                                  country={"ir"}
                                  required
                                  fullWidth
                                  style={{ width: "100" }}
                                  placeholder="09912141869"
                                  id="phone"
                                  size="small"
                                  label="Phone number"
                                  InputLabelProps={{ shrink: true }}
                                  value={formik.values.phone}
                                  onChange={(val) => {
                                    setPhone(val);
                                    console.log(val, "region");
                                  }}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.phone &&
                                    Boolean(formik.errors.phone)
                                  }
                                  helperText={
                                    formik.touched.phone && formik.errors.phone
                                  }
                                />
                              </ThemeProvider>
                            </div>
                          </div>
                        </div>
                        <hr class="dashed" />
                        <div className="mb-3 col-12">
                          <div className="row" title="f5">
                            <div className="col-lg-3">
                              <label
                                for="exampleFormControlTextarea1"
                                className="ms-2 form-label"
                                title="f9"
                              >
                                Description
                              </label>
                            </div>
                            <div className="col-lg-9">
                              <ThemeProvider theme={textfieldTheme}>
                                <TextField
                                  fullWidth
                                  id="description"
                                  placeholder=""
                                  multiline
                                  autoComplete="description"
                                  label="Description"
                                  InputLabelProps={{ shrink: true }}
                                  inputProps={{ maxLength: CHARACTER_LIMIT }}
                                  value={formik.values.description}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.description &&
                                    Boolean(formik.errors.description)
                                  }
                                  helperText={`${formik.values.description.length}/${CHARACTER_LIMIT}`}
                                />
                              </ThemeProvider>
                            </div>
                          </div>
                        </div>
                        <Snackbar
                          open={open}
                          autoHideDuration={4000}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <Alert
                            onClose={handleClose}
                            severity={
                              message === "Please fill in the blanks."
                                ? "error"
                                : "success"
                            }
                            sx={{ width: "100%" }}
                          >
                            {message}
                          </Alert>
                        </Snackbar>{" "}
                        <div className="row mt-2 d-fit-content">
                          <div className="col-4" />
                          <div className="col-4" />
                          <div className="col-4 edit-hotel mb-3">
                            <button
                              className="btn edit-hotel"
                              onClick={handleClick}
                            >
                              {loading ? (
                                <CircularProgress
                                  style={{ color: "#fff" }}
                                  size="1.5rem"
                                />
                              ) : (
                                "Create Hotel"
                              )}{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateHotel;
