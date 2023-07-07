import HotelLocationSelectionDialog from "@/components/hotel_location/HotelLocationSelectionDialog";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert as MuiAlert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Country, State, City } from "country-state-city";
import * as yup from "yup";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function HotelCreationForm(props) {
  const CHARACTER_LIMIT = 1000;
  const [openDialog, setOpenDialog] = useState(false);
  function startDialog() {
    setOpenDialog(true);
  }
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
    phone: yup.number().required("Required!"),
    description: yup.string().max(1000, "Can't be more than 1000 characters."),
    country: yup.string().required("Required!"),
    state: yup.string().required("Required!"),
    city: yup.string().required("Required!"),
    files: yup.array(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      description: "",
      country: "",
      state: "",
      city: "",
      files: [],
      longitude: null,
      latitude: null,
    },
    validationSchema: validationSchema,
    onSubmit: props.handleSubmit,
  });

  function uploadSingleFile(e) {
    formik.setFieldValue("files", [...formik.values.files, e.target.files[0]]);
  }
  function deleteFile(e) {
    const files = formik.values.files.filter((item, index) => index !== e);
    formik.setFieldValue("files", files);
  }
  const images = formik.values.files.map((file) => URL.createObjectURL(file));

  useEffect(() => {
    if (formik.touched.country) {
      formik.setValues({ ...formik.values, state: "", city: "" });
    }
  }, [formik.values.country]);
  useEffect(() => {
    if (formik.touched.state) {
      formik.setValues({ ...formik.values, city: "" });
    }
  }, [formik.values.state]);

  const countries = Country.getAllCountries();
  const states = formik.values.country
    ? State.getStatesOfCountry(formik.values.country)
    : [];
  const cities = formik.values.state
    ? City.getCitiesOfState(formik.values.country, formik.values.state)
    : [];

  const enableLocation = formik.values.city !== "";
  const changeCenter = ({ longitude, latitude }) => {
    formik.setValues({
      ...formik.values,
      longitude: longitude,
      latitude: latitude,
    });
  };
  const hasLocation =
    formik.values.longitude !== null && formik.values.latitude !== null;
  return (
    <>
      <form
        className="container mt-4 p-4 edit-hotel-form border"
        title="a6"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3 col-12" title="a7">
          <div className="row mt-3" title="a8">
            <div className="col-lg-3" title="a9">
              <label
                htmlFor="exampleFormControlInput2"
                className="ms-2 mt-1 form-label"
                title="f1"
              >
                Name
              </label>
            </div>
            <div className="col-lg-9" title="a10">
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
            </div>
          </div>
        </div>
        <hr className="dashed" title="a11" />
        <div className="mb-3 col-12">
          <div className="row">
            <div className="col-lg-3">
              <label
                htmlFor="exampleFormControlInput2"
                className="ms-2 mt-1 form-label"
                title="f4"
              >
                Location
              </label>
            </div>

            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12" title="a19">
                  <div className="div">
                    <div className="col-lg-12">
                      <FormControl fullWidth>
                        <InputLabel size="small" id="country-label">
                          Country
                        </InputLabel>
                        <Select
                          size="small"
                          labelId="country-label"
                          name="country"
                          label="Country"
                          value={formik.values.country}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.country &&
                            Boolean(formik.errors.country)
                          }
                        >
                          {countries.map((country) => (
                            <MenuItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <FormControl fullWidth>
                        <InputLabel size="small" id="state-label">
                          State
                        </InputLabel>
                        <Select
                          disabled={!formik.values.country}
                          size="small"
                          labelId="state-label"
                          name="state"
                          label="State"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.state && Boolean(formik.errors.state)
                          }
                        >
                          {states.map((state) => (
                            <MenuItem key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <FormControl fullWidth>
                        <InputLabel size="small" id="city-label">
                          City
                        </InputLabel>
                        <Select
                          disabled={!formik.values.state}
                          size="small"
                          labelId="city-label"
                          name="city"
                          label="City"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.city && Boolean(formik.errors.city)
                          }
                        >
                          {cities.map((city) => (
                            <MenuItem key={city.name} value={city.name}>
                              {city.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="row">
                <div className="div">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Button
                      disabled={!enableLocation}
                      onClick={startDialog}
                      variant="contained"
                    >
                      {hasLocation ? "Change Location" : "Add Location"}
                    </Button>
                    {!hasLocation && (
                      <Typography variant="h6">No location selected</Typography>
                    )}
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="dashed" />
        <div className="mb-3 col-12">
          <div className="row">
            <div className="col-lg-3">
              <label
                htmlFor="exampleFormControlInput2"
                className="ms-2 mt-1 form-label"
                title="f3"
              >
                Address
              </label>
            </div>
            <div className="col-lg-9" title="a18">
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
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </div>
          </div>
        </div>
        <hr className="dashed" />
        <div className="mb-3 col-12">
          <div className="row">
            <div className="col-lg-3">
              <label
                htmlFor="exampleFormControlInput3"
                className="ms-2 mt-1 form-label"
                title="f7"
              >
                Phone number
              </label>
            </div>
            <div className="col-lg-9" style={{ width: "100" }}>
              <PhoneInput
                country={"ir"}
                placeholder="09912141869"
                value={formik.values.phone}
                onChange={formik.handleChange("phone")}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>
        <hr className="dashed" />
        <div className="mb-3 col-12">
          <div className="row" title="f5">
            <div className="col-lg-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="ms-2 form-label"
                title="f9"
              >
                Description
              </label>
            </div>
            <div className="col-lg-9">
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
            </div>
          </div>
        </div>
        <div className="row mt-2 d-fit-content">
          <div className="col-4" />
          <div className="col-4" />
          <div className="col-4 edit-hotel mb-3">
            <Button
              disabled={!(formik.isValid && formik.dirty)}
              variant="contained"
              type="submit"
            >
              {props.loading ? (
                <CircularProgress size="1.5rem" />
              ) : (
                "Create Hotel"
              )}{" "}
            </Button>
          </div>
        </div>
        <hr className="dashed" />
        <div className="mb-3 col-12">
          <Typography sx={{ mb: 3 }}>
            Please upload photos of hotel here.
          </Typography>
          <form>
            <div className="form-group preview">
              {formik.values.files.length > 0 &&
                images.map((item, index) => {
                  return (
                    <div className="col" key={item}>
                      <img
                        src={item}
                        className="m-3"
                        alt=""
                        style={{
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => deleteFile(index)} />
                      </IconButton>
                    </div>
                  );
                })}
            </div>

            <div className="col-lg-8">
              <input
                type="file"
                name="myImage"
                accept="image/*"
                disabled={formik.values.files.length === 5}
                onChange={uploadSingleFile}
              />
            </div>
          </form>
        </div>
      </form>

      <HotelLocationSelectionDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onChange={changeCenter}
        value={{
          latitude: formik.values.latitude,
          longitude: formik.values.longitude,
        }}
      />
    </>
  );
}
