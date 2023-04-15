/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
import { CircularProgress, Autocomplete } from "@mui/material";
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

const facilitieslist = [
  "Taxi service",
  "Sofa",
  "Bathroom",
  "Telephone",
  "WiFi",
  "Room service",
  "Television",
  "Gym",
  "Restaurant",
  "Bar",
];

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
  const [open, setOpen] = useState(false);
  const [message1, setMessage1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [toggled, setToggled] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const CHARACTER_LIMIT = 1000;
  // const [type, setType] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [region, setRegion] = useState(null);
  const [city, setCity] = useState(null);

  let tempcheckin = checkin; // value from your state
  let tempcheckout = checkout; // value from your state
  let formattedcheckinDate = moment(tempcheckin).format("hh:mm");
  let formattedcheckoutDate = moment(tempcheckout).format("hh:mm");

  // useEffect(() => {
  //   setHotelId(parseInt(window.location.pathname.split("/")[2], 10));
  // }, []);

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
    setOpen1(false);
  }; // const handletypeChange = (event, newValue) => {
  //   setType(newValue);
  // };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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
      facilities.length,
      "\n",
      formattedcheckinDate,
      "\n",
      formattedcheckoutDate,
      "\n"
    );
    console.log("checkin time: ", formattedcheckinDate);
    console.log("checkout time: ", formattedcheckoutDate);
    if (!filled) {
      setOpen(true);
      setMessage("Please fill in the blanks.");
    }
    var facilitiesListForBack = [];
    for (var i = 0; i < facilities.length; i++) {
      let temp = { name: facilities[i] };
      facilitiesListForBack.push(temp);
    }
    console.log("facilities list: ", facilitiesListForBack);

    if (filled) {
      axios
        .post(
          makeURL(references.url_addhotel),
          {
            name: formik.values.name,
            address: formik.values.address,
            description: formik.values.description,
            // facilities: facilitiesListForBack,
            phone_number: formik.values.phone,
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
          console.log(res.data);
          setOpen(true);
          setLoading(false);
          setMessage("Your hotel was submitted successfully!");
          setHotelId(res.data.id);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setOpen(true);
          setMessage("Please fill in the blanks.");
        });
    }
  };

  return (
    <div
      className={`admin-panel ${toggled ? "toggled" : ""} d-flex`}
      title="a1"
    >
      <div className="w-100" title="a2">
        <div className="container py-5 px-lg-5" title="a3">
          <h2 className="mb-4 fw-bold d-flex" title="a4">
            <DomainAddIcon className="me-2" fontSize="large" title="a5" />
            Create Hotel
          </h2>
          <div className="container mt-4 p-4 edit-hotel-form border" title="a6">
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
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
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
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </ThemeProvider>
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
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                      country={"us"}
                      required
                      fullWidth
                      style={{ width: "100" }}
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
                  </ThemeProvider>
                </div>
              </div>
            </div>
            <hr class="dashed" />
            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    for="exampleFormControlInput4"
                    className="ms-2 mt-1 form-label"
                    title="f8"
                  >
                    Email
                  </label>
                </div>
                <div className="col-lg-9">
                  <ThemeProvider theme={textfieldTheme}>
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
            <hr class="dashed" />
            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="ms-2 form-label"
                    title="f10"
                  >
                    Facilities
                  </label>
                </div>
                <div className="col-lg-9">
                  <Autocomplete
                    multiple
                    id="facilities"
                    value={facilities}
                    options={facilitieslist}
                    onChange={(event, value) => {
                      setFacilities(value);
                    }}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <ThemeProvider theme={textfieldTheme}>
                        <TextField
                          fullWidth
                          required
                          {...params}
                          label="Facilities"
                        />
                      </ThemeProvider>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2 d-fit-content">
              <div className="col-4" />
              <div className="col-4" />
              <div className="col-4 edit-hotel mb-3">
                <button className="btn edit-hotel" onClick={handleClick}>
                  {loading ? (
                    <CircularProgress style={{ color: "#fff" }} size="1.5rem" />
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
  );
}

export default CreateHotel;
