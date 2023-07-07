import * as React from "react";
import TextField from "@mui/material/TextField";
import "../../css/Stepper.css";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  hotelname: yup
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

export default function Hotelinfo() {
  const formik = useFormik({
    initialValues: {
      hotelname: "",
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
  return (
    <div className="container hotel-info-container">
      <div className="row">
        <div className="col-lg-8">
          <TextField
            required
            placeholder=""
            id="hotelname"
            size="small"
            label="Hotel name"
            InputLabelProps={{ shrink: true }}
            value={formik.values.hotelname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hotelname && Boolean(formik.errors.hotelname)}
            helperText={formik.touched.hotelname && formik.errors.hotelname}
          />
        </div>
      </div>
    </div>
  );
}
