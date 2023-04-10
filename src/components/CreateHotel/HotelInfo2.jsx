/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
import { Box, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { createTheme } from "@mui/material/styles";
import moment from "moment";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
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
  const [message, setMessage] = useState("");
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
            facilities: facilitiesListForBack,
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
              hotelId +
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
    <div
      className={`admin-panel ${toggled ? "toggled" : ""} d-flex`}
      title="a1"
    >
      <div className="w-100" title="a2">
        <div className="container py-5 px-lg-5" title="a3">
          <h2 className="mb-4 fw-bold d-flex" title="a4">
            <DomainAddIcon className="me-2" fontSize="large" title="a5" />
            Header
          </h2>
          <div className="container mt-4 p-4 edit-hotel-form border" title="a6">
            <div className="mb-3 col-12" title="a12">
              <div className="row mt-3" title="a13">
                <div className="col-lg-3" title="a14">
                  <label
                    for="exampleFormControlInput2"
                    className="ms-2 mt-1 form-label"
                    title="f2"
                  >
                    Header Picture
                  </label>
                </div>
                <div className="col-lg-9" title="a16">
                  <input
                    title="a15"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateHotel;
