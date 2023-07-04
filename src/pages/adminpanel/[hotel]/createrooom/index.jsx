import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// eslint-disable-next-line unused-imports/no-unused-imports, no-unused-vars
import { TextField, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../../../Utils/common";
import references from "src/assets/References.json";
import { CircularProgress, Autocomplete } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// eslint-disable-next-line unused-imports/no-unused-imports, no-unused-vars
import PreviewMultipleImages from "../../../../components/AdminPanel/Pages/PreviewMultipleImages";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";

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
  "Linen",
  "Upper floors accessible by elevator",
  "Wardrobe or closet",
  "Hand sanitiser",
  "Tea/Coffee maker",
  "Minibar",
  "Air conditioning",
  "Safety deposit box",
  "Soundproofing",
  "Ironing facilities",
  "Iron",
  "Interconnected room(s) available",
  "Heating",
  "Carpeted",
  "Laptop safe",
  "Carbon monoxide detector",
  "Electric kettle",
  "Desk",
  "TV",
  "Telephone",
  "Satellite channels",
  "Radio",
  "Cable channels",
  "Air purifiers",
  "Socket near the bed",
  "Wake up service/Alarm clock",
  "Wake-up service",
  "Pet rooms",
  "Children playground",
  "Hairdryer",
  "Slippers",
];

const validationSchema = yup.object({
  number: yup
    .string()
    .matches(/^[0-9,]+$/, "Please enter your information correctly.")
    .required("Required!"),
  type: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(10, "Must be at least 10 characters")
    .required("Required!"),
  size: yup.number().required("Required"),
  view: yup.string().required("Required!"),
  sleeps: yup
    .number()
    .max(5, "Can't be more than 5.")
    .min(1, "Must be 1 at least!")
    .required("Required!"),
  price: yup
    .number()
    .min(1, "Can't be 0.")
    .max(999999, "Not possible.")
    .required("Required!"),
  morefacilities: yup
    .string()
    .matches(/^[0-9a-zA-Z,]+$/, "Please enter your information correctly."),
});

function Createroom() {
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [type, setType] = useState("");
  const [includebreakfast, setIncludebreakfast] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [roomid, setRoomid] = useState(null);
  const t1 = "singleRoom";
  const t2 = "doubleRoom";
  const t3 = "tripleRoom";
  const t4 = "suiteRoom";
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      number: "",
      size: "",
      view: "",
      sleeps: "",
      price: "",
      morefacilities: "",
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

    setOpen1(false);
    setOpen2(false);
    setOpen(false);
  };

  const handletypeChange = (event) => {
    setType(event.target.value);
    // console.log(event.target.value);
  };

  const handleIncludebreakfast = (event, newValue) => {
    setIncludebreakfast(newValue);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleClick = () => {
    let hotelid = router.query.hotel;
    let option = "";
    includebreakfast === "Yes" ? (option = "Breakfast") : (option = "");
    let filled =
      !formik.errors.size &&
      !formik.errors.view &&
      !formik.errors.sleeps &&
      !formik.errors.price &&
      type != "" &&
      includebreakfast != null;

    var allfacilities = [];
    allfacilities = facilities.concat(formik.values.morefacilities.split(","));
    var listForBack = [];
    for (var i = 0; i < allfacilities.length; i++) {
      let temp = { name: allfacilities[i] };
      listForBack.push(temp);
    }
    console.log("filled:", filled);
    console.log(
      "type:",
      type,
      "\n",
      "size:",
      formik.values.size,
      "\n",
      "view:",
      formik.values.view,
      "\n",
      "sleeps:",
      formik.values.sleeps,
      "\n",
      "price:",
      formik.values.price,
      "\n",
      "option:",
      option,
      "room_facilities:",
      listForBack
    );

    if (!filled) {
      setOpen(true);
      console.log("!filled");
      setMessage("Please fill in the blanks.");
      // window.location.replace("/adminpanel/createrooom/images/" + hotelid);
    }

    if (filled) {
      axios
        .post(
          makeURL(references.url_hotelrooms + hotelid + "/"),
          {
            type: type,
            size: formik.values.size,
            view: formik.values.view,
            sleeps: formik.values.sleeps,
            price: formik.values.price,
            option: option,
            room_facilities: listForBack,
          },
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((res) => {
          console.log("response for createroom page: ", res.data);
          setRoomid(res.data.id);
          setOpen1(true);
          setLoading(false);
          setMsg1("Your room was created successfully!");
          window.location.replace("/");
        })
        .catch((err) => {
          console.log("error for createroom page: ", err);
          setLoading(false);
          setOpen1(true);
          setMsg1("Something went wrong.Please try again.");
        });
    }
    handleRoomSpaceClick();
  };

  const handleRoomSpaceClick = () => {
    var roomSpaces = [];
    var myarr = formik.values.number.split(",");
    for (var j = 0; j < myarr.length; j++) {
      let temp1 = { name: myarr[j] };
      roomSpaces.push(temp1);
    }
    console.log("roomspaces: ", roomSpaces);
    if (roomid) {
      axios
        .post(
          makeURL(references.url_hotelrooms + roomid + "/spaces/"),
          { names: roomSpaces },
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((res) => {
          console.log("response for adding room space: ", res.data);
          setOpen2(true);
          setLoading(false);
          setMsg2("Your room spaces were created successfully!");
        })
        .catch((err) => {
          console.log("error for adding room space: ", err);
          setLoading(false);
          setOpen2(true);
          setMsg2("An error occurred.Please try again.");
        });
    }
  };

  return (
    <div className="containter m-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card-body">
            <div className="shadow p-3 mb-5 bg-body rounded">
              <div className="col"></div>
              <div className={`admin-panel ${toggled ? "toggled" : ""} d-flex`}>
                <div className="w-100">
                  <div className="adminpanel-header-mobile">
                    <div
                      className="btn-toggle d-md-none"
                      onClick={() => handleToggleSidebar(true)}
                    >
                      <MenuIcon fontSize="large" />
                    </div>
                    <a href="/" className="navbar-brand logo d-md-none">
                      <span className="fw-bold logo-text-font">
                        Hotel Center
                      </span>
                      <img
                        src={"/logo/logo2.png"}
                        width={48}
                        height={48}
                        alt="Hotel Center"
                      />
                    </a>
                  </div>
                  <div className="container py-5 px-lg-5">
                    <h2 className="mb-4 fw-bold d-flex">
                      <DomainAddIcon className="me-2" fontSize="large" />
                      Create Room
                    </h2>
                    <div className="container mt-4 p-4 edit-hotel-form border">
                      <div className="mb-3 col-md-12">
                        <div className="row">
                          <div className="col-lg-2 mt-lg-3">
                            <label
                              for="exampleFormControlInput2"
                              className="ms-2 mt-1 form-label"
                              title="element1"
                            >
                              Type Of Room
                            </label>
                          </div>
                          <div className="col-lg-9 mt-lg-3">
                            <ThemeProvider theme={textfieldTheme}>
                              <FormControl fullWidth required>
                                <InputLabel
                                  id="demo-simple-select-label"
                                  style={{ textAlign: "center" }}
                                >
                                  Type
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  placeholder=""
                                  value={type}
                                  label="Type"
                                  onChange={handletypeChange}
                                >
                                  <MenuItem value={t1}>Single Room</MenuItem>
                                  <MenuItem value={t2}>Double Room</MenuItem>
                                  <MenuItem value={t3}>Triple Room</MenuItem>
                                  <MenuItem value={t4}>Suite Room</MenuItem>
                                </Select>
                              </FormControl>
                            </ThemeProvider>
                          </div>
                        </div>
                      </div>

                      <hr class="dashed"></hr>

                      <div className="mb-3 col-12">
                        <div className="row">
                          <div className="col-lg-2">
                            <label
                              for="exampleFormControlInput2"
                              className="ms-2 mt-1 form-label"
                              title="element2"
                            >
                              Breakfast
                            </label>
                          </div>
                          <div className="col-lg-9">
                            <RadioGroup
                              row
                              aria-label="level"
                              name="row-radio-buttons-group"
                              value={includebreakfast}
                              onChange={handleIncludebreakfast}
                            >
                              <FormControlLabel
                                value="Yes"
                                control={
                                  <Radio
                                    classes={{
                                      root: {
                                        "&$checked": {
                                          color: "#cd9a2d",
                                        },
                                      },
                                      checked: {},
                                    }}
                                  />
                                }
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={
                                  <Radio
                                    classes={{
                                      root: {
                                        "&$checked": {
                                          color: "#cd9a2d",
                                        },
                                      },
                                      checked: {},
                                    }}
                                  />
                                }
                                label="No"
                              />
                            </RadioGroup>
                          </div>
                        </div>
                      </div>

                      <hr class="dashed"></hr>

                      <div className="mb-3 col-12">
                        <div className="row">
                          <div className="mb-3 col-6">
                            <div className="row mt-3">
                              <div className="col-lg-3">
                                <label
                                  for="exampleFormControlInput2"
                                  className="ms-2 mt-1 form-label"
                                  title="element3"
                                >
                                  Room View
                                </label>
                              </div>
                              <div className="col-lg-8">
                                <ThemeProvider theme={textfieldTheme}>
                                  <TextField
                                    required
                                    fullWidth
                                    placeholder="Sea"
                                    id="view"
                                    size="small"
                                    label="Room view"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.view}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.view &&
                                      Boolean(formik.errors.view)
                                    }
                                    helperText={
                                      formik.touched.view && formik.errors.view
                                    }
                                  />
                                </ThemeProvider>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3 col-6">
                            <div className="row mt-3">
                              <div className="col-lg-3">
                                <label
                                  for="exampleFormControlInput2"
                                  className="ms-2 mt-1 form-label"
                                  title="element4"
                                >
                                  Room Size
                                </label>
                              </div>
                              <div className="col-lg-8">
                                <ThemeProvider theme={textfieldTheme}>
                                  <TextField
                                    required
                                    fullWidth
                                    placeholder="32"
                                    id="size"
                                    size="small"
                                    label="Room size"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.size}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.size &&
                                      Boolean(formik.errors.size)
                                    }
                                    helperText={
                                      formik.touched.size && formik.errors.size
                                    }
                                  />
                                </ThemeProvider>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr class="dashed"></hr>

                      <div className="mb-3 col-12">
                        <div className="row">
                          <div className="mb-3 col-6">
                            <div className="row mt-3">
                              <div className="col-lg-3">
                                <label
                                  for="exampleFormControlInput2"
                                  className="ms-2 mt-1 form-label"
                                  title="element5"
                                >
                                  Room Price
                                </label>
                              </div>
                              <div className="col-lg-8">
                                <ThemeProvider theme={textfieldTheme}>
                                  <TextField
                                    required
                                    fullWidth
                                    placeholder="2000"
                                    id="price"
                                    size="small"
                                    label="Room price"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.price &&
                                      Boolean(formik.errors.price)
                                    }
                                    helperText={
                                      formik.touched.price &&
                                      formik.errors.price
                                    }
                                  />
                                </ThemeProvider>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 col-6">
                            <div className="row mt-3">
                              <div className="col-lg-3">
                                <label
                                  for="exampleFormControlInput2"
                                  className="ms-2 mt-1 form-label"
                                  title="element6"
                                >
                                  Room Sleeps
                                </label>
                              </div>
                              <div className="col-lg-8">
                                <ThemeProvider theme={textfieldTheme}>
                                  <TextField
                                    required
                                    fullWidth
                                    placeholder="3"
                                    id="sleeps"
                                    size="small"
                                    label="Room sleeps"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.sleeps}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.sleeps &&
                                      Boolean(formik.errors.sleeps)
                                    }
                                    helperText={
                                      formik.touched.sleeps &&
                                      formik.errors.sleeps
                                    }
                                  />
                                </ThemeProvider>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr class="dashed"></hr>

                      <div className="mb-3 col-12">
                        <div className="row">
                          <div className="col-lg-2 mt-3">
                            <label
                              for="exampleFormControlTextarea1"
                              className="ms-2 form-label"
                              title="element7"
                            >
                              Room Facilities
                            </label>
                          </div>
                          <div className="col-lg-9">
                            <Autocomplete
                              multiple
                              id="facilities"
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
                      <div className="row">
                        {/* <div className="col-lg-4 col-md-2"></div> */}

                        <div className="col-lg-2 col-md-8 edit-hotel mb-3">
                          <button
                            className="btn edit-hotel"
                            onClick={() => {
                              setOpen3(true);
                            }}
                            style={{ background: "gray" }}
                          >
                            {loading ? (
                              <CircularProgress
                                style={{ color: "#fff" }}
                                size="1.5rem"
                              />
                            ) : (
                              "Cancel"
                            )}{" "}
                          </button>
                          <Dialog
                            open={open3}
                            // onClose={handleCloseClickDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Are you Sure to cancel?"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                By canceling the room creation process,
                                your information will not be registered and you
                                will have to start building the room again
                                later.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => {
                                  setOpen3(false);
                                }}
                              >
                                Back
                              </Button>
                              <Button
                                className="btn edit-hotel"
                                onClick={() => {
                                  setOpen3(false);
                                  router.push("/");
                                }}
                                autoFocus
                              >
                                Cancel
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                        <div className="col-lg-4 col-md-2"></div>
                        <div className="col-lg-2 col-md-2"></div>
                        <div className="col-lg-4 col-md-8 edit-hotel mb-3">
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
                              "Create Room"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <Snackbar
                        open={open1}
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
                            msg1 === "Something went wrong.Please try again."
                              ? "error"
                              : "success"
                          }
                          sx={{ width: "100%" }}
                        >
                          {msg1}
                        </Alert>
                      </Snackbar>

                      <Snackbar
                        open={open2}
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
                            msg2 === "An error occurred.Please try again."
                              ? "error"
                              : "success"
                          }
                          sx={{ width: "100%" }}
                        >
                          {msg2}
                        </Alert>
                      </Snackbar>

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
                      </Snackbar>
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

export default Createroom;
