import * as React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "src/Utils/common";
import references from "src/assets/References.json";
import { useFormik } from "formik";
import * as yup from "yup";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import PreviewMultipleImages from "src/components/AdminPanel/Pages/PreviewMultipleImages";
import MySidebar from "src/components/AdminPanel/layout/Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";

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
  phone: yup
    .number()
    .required("Required!")
    .max(15, "Must be less than 15 digits."),
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

function Edithotel() {
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const [phone2, setphone2] = useState(null);
  const CHARACTER_LIMIT = 1000;
  // const [type, setType] = useState(null);
  // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
  const [value, setValue] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  let tempcheckin = checkin; // value from your state
  let tempcheckout = checkout; // value from your state
  let formattedcheckinDate = moment(tempcheckin).format("hh:mm");
  let formattedcheckoutDate = moment(tempcheckout).format("hh:mm");

  useEffect(() => {
    setHotelId(parseInt(window.location.pathname.split("/")[2], 10));
  }, []);

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

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

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

  // const handletypeChange = (event, newValue) => {
  //   setType(newValue);
  // };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  let hotelid = window.location.pathname.split("/")[2];

  useEffect(() => {
    let facilityarray = [];
    console.log(hotelid);
    axios
      .get(makeURL(references.url_one_hotel + hotelid + "/"), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((res) => {
        setValue(res.data);
        console.log(res.data);
        formik.setValues({
          name: res.data.name || "",
          address: res.data.address || "",
          description: res.data.description || "",
          phone: res.data.phone_numbers || "",
          country: res.data.country || "",
          city: res.data.city || "",
        });
        for (var i = 0; i < res.data.facilities.length; i++) {
          facilityarray.push(res.data.facilities[i].name);
        }
        setFacilities(facilityarray || "");
        var temp1 = res.data.check_in_range.split(":");
        var temp2 = res.data.check_out_range.split(":");
        setCheckin(
          new Date(2022, 5, 29, parseInt(temp1[0]), parseInt(temp1[1])) || ""
        );
        setCheckout(
          new Date(2022, 5, 29, parseInt(temp2[0]), parseInt(temp2[1])) ||
          "" ||
          ""
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    let filled =
      !formik.errors.name &&
      !formik.errors.address &&
      !formik.errors.description &&
      !formik.errors.country &&
      !formik.errors.city &&
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
      !formik.errors.phone,
      "\n",
      facilities.length,
      "\n",
      formattedcheckinDate,
      "\n",
      formattedcheckoutDate,
      "\n",
      !formik.errors.name &&
      !formik.errors.address &&
      !formik.errors.description &&
      !formik.errors.phone &&
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

    var facilitiesListForBack = [];
    for (var i = 0; i < facilities.length; i++) {
      let temp = { name: facilities[i] };
      facilitiesListForBack.push(temp);
    }
    console.log("facilities list: ", facilitiesListForBack);

    if (filled) {
      setLoading(true);

      axios
        .put(
          makeURL(references.url_one_hotel + hotelid + "/"),
          {
            name: formik.values.name,
            address: formik.values.address,
            description: formik.values.description,
            facilities: facilitiesListForBack,
            phone_number: phone2,
            country: formik.values.country,
            city: formik.values.city,
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
          console.log(res.data);
          setOpen(true);
          setLoading(false);
          setMessage("Your hotel was editted successfully!");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setOpen(true);
          setMessage("Please fill in the blanks.");
        });
    }
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
      form_data.append("image", selectedImage, selectedImage.name);
      axios
        .post(
          makeURL(
            references.url_onehotelImage +
            "/" +
            hotelid +
            "/images/?is_header=true"
          ),
          form_data,
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((res) => {
          console.log("uploading hotel header: ", res.data);
          setLoading(false);
          setOpen1(true);
          setMessage1("Your image uploaded successfully!");
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
    <div className={`admin-panel ${toggled ? "toggled" : ""} d-flex`}>
      <MySidebar
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        id={hotelId}
      />
      <div className="w-100 admin-content">
        <div className="adminpanel-header-mobile">
          <div
            className="btn-toggle d-md-none"
            onClick={() => handleToggleSidebar(true)}
          >
            <MenuIcon fontSize="large" />
          </div>
          <a href="/" className="navbar-brand logo d-md-none">
            <span className="fw-bold logo-text-font">Hotel Center</span>
            <Image
              src={"/logo/logo2.png"}
              width={48}
              height={48}
              alt="Hotel Center"
            />
          </a>
        </div>
        <div className="container py-5 px-lg-5">
          <h2 className="mb-4 fw-bold d-flex">
            <EditIcon className="me-2" fontSize="large" />
            Edit Hotel
          </h2>
          <div className="container mt-4 p-4 edit-hotel-form border">
            <div className="mb-3 col-12">
              <div className="row mt-3">
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlInput2"
                    className="ms-2 mt-1 form-label"
                    title="e1"
                  >
                    Name
                  </label>
                </div>
                <div className="col-lg-9">
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

            <hr class="dashed" />

            <div className="mb-3 col-12">
              <div className="row mt-3">
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlInput2"
                    className="ms-2 mt-1 form-label"
                    title="e2"
                  >
                    Header Picture
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="file"
                    name="myImage"
                    accept="image/*"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  <button
                    className="btn m-2 edit-hotel"
                    onClick={handleUploadClick}
                  >
                    {loading ? (
                      <CircularProgress
                        style={{ color: "#fff" }}
                        size="1.5rem"
                      />
                    ) : (
                      "Upload"
                    )}
                  </button>
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
                  {imageUrl && selectedImage && (
                    <Box mt={2} textAlign="left">
                      <div>Image Preview:</div>
                      <img
                        className="company-logo"
                        src={imageUrl}
                        alt={selectedImage.name}
                        height="82px !important"
                        width="150px !important"
                      />
                    </Box>
                  )}
                </div>
              </div>
            </div>

            <hr class="dashed" />

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlInput2"
                    className="ms-2 mt-1 form-label"
                    title="e3"
                  >
                    Address
                  </label>
                </div>
                <div className="col-lg-9">
                  <ThemeProvider theme={textfieldTheme}>
                    <TextField
                      required
                      fullWidth
                      placeholder="London, 21B Baker street"
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

            {/* <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-2 col-md-3">
                  <label
                    for="exampleFormControlInput2"
                    className="ms-2 mt-1 form-label"
                  >
                    Type
                  </label>
                </div>
                <div className="col-lg-9">
                  <RadioGroup
                    row
                    aria-label="level"
                    name="row-radio-buttons-group"
                    value={type}
                    onChange={handletypeChange}
                  >
                    <FormControlLabel
                      value="Hotel"
                      control={
                        <Radio
                          classes={{
                            root: c.root,
                            checked: c.checked,
                          }}
                        />
                      }
                      label="Hotel"
                    />
                    <FormControlLabel
                      value="Villa"
                      control={
                        <Radio
                          classes={{
                            root: c.root,
                            checked: c.checked,
                          }}
                        />
                      }
                      label="Villa"
                    />
                    <FormControlLabel
                      value="House"
                      control={
                        <Radio
                          classes={{
                            root: c.root,
                            checked: c.checked,
                          }}
                        />
                      }
                      label="House"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>

            <hr class="dashed"></hr> */}

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-4">
                      <label
                        for="exampleFormControlInput2"
                        className="ms-2 mt-1 form-label"
                        title="e4"
                      >
                        Country
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <ThemeProvider theme={textfieldTheme}>
                        <TextField
                          required
                          fullWidth
                          placeholder="USA"
                          id="country"
                          size="small"
                          label="County"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.country}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.country &&
                            Boolean(formik.errors.country)
                          }
                          helperText={
                            formik.touched.country && formik.errors.country
                          }
                        />
                      </ThemeProvider>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-2">
                      <label
                        for="exampleFormControlInput2"
                        className="ms-2 mt-1 form-label"
                        title="e5"
                      >
                        City
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <ThemeProvider theme={textfieldTheme}>
                        <TextField
                          required
                          fullWidth
                          placeholder="New York"
                          id="city"
                          size="small"
                          label="City"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.city && Boolean(formik.errors.city)
                          }
                          helperText={formik.touched.city && formik.errors.city}
                        />
                      </ThemeProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr class="dashed" />

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlInput2"
                    className="ms-2 mt-2 form-label"
                    title="e6"
                  >
                    Time Range
                  </label>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="mb-2 mt-2 col-lg-6">
                      <div className="col-lg-12 checkin-inp">
                        <ThemeProvider theme={textfieldTheme}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Checkin time"
                              ampm={false}
                              value={checkin}
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
                    <div className="mb-2 mt-2 col-lg-6">
                      <div className="col-lg-12 checkout-inp">
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
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlInput3"
                    className="ms-2 mt-1 form-label"
                    title="e7"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="col-lg-9">
                  <ThemeProvider theme={textfieldTheme}>
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
                    {/* <TextField
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
                    /> */}
                  </ThemeProvider>
                </div>
              </div>
            </div>

            <hr class="dashed" />

            <div className="mb-3 col-12">
              <div className="row">
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlInput4"
                    className="ms-2 mt-1 form-label"
                    title="e8"
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
              <div className="row">
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlTextarea1"
                    className="ms-2 form-label"
                    title="e9"
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
                <div className="col-lg-2">
                  <label
                    for="exampleFormControlTextarea1"
                    className="ms-2 form-label"
                    title="e10"
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

            <hr class="dashed" />

            <div className="mb-3 col-12">
              <Typography sx={{ mb: 3 }}>
                Please upload other photos of hotel here.
              </Typography>
              <PreviewMultipleImages />
            </div>

            <div className="row mt-2 d-fit-content">
              <div className="col-lg-4 col-md-2" />
              <div className="col-lg-4 col-md-2" />
              <div className="col-lg-4 col-md-8 edit-hotel mb-3">
                <button className="btn edit-hotel" onClick={handleClick}>
                  {loading ? (
                    <CircularProgress style={{ color: "#fff" }} size="1.5rem" />
                  ) : (
                    "Edit Hotel"
                  )}
                </button>
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

export default Edithotel;
