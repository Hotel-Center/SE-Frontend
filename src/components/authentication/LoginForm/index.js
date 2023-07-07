import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";

export default function LoginForm(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: props.handleSubmit,
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter a valid email address"),
      password: yup.string().required("Please enter your password"),
    }),
  });

  return (
    <Box
      role="form"
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 1 }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.touched.email) && Boolean(formik.errors.email)
            }
            helperText={(formik.touched.email && formik.errors.email) || " "}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            type="password"
            role="password"
            aria-label="Password"
            autoComplete="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              Boolean(formik.touched.password) &&
              Boolean(formik.errors.password)
            }
            helperText={
              (formik.touched.password && formik.errors.password) || " "
            }
          />
        </Grid>

        {/* <div>
        <h5 styles={{ color: "red", fontSize: "14.5px" }}>
          {formik.errors.email}
        </h5>
      </div> */}
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        // onClick={formik.handleSubmit}
        sx={{
          mt: 2,
          mb: 2,
          marginTop: "20px",
          height: "43px",
          marginBottom: "10px",
        }}
      >
        Login
      </Button>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/sign-up" className="lnk-login">
            {"Don't have an account yet? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
