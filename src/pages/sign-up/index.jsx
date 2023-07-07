import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignupForm from "src/components/signup/SignupForm";
import { useState } from "react";
import SignupRoleSelection from "src/components/signup/SignupRoleSelection";
import { useReducer } from "react";
import Stack from "@mui/material/Stack";
import Image from "next/image";

export default function Signup() {
  function signupReducer(state, action) {
    if (action.type == "set_role") {
      return {
        ...state,
        role: action.value,
      };
    }
    return state;
  }

  const [signupState, dispatch] = useReducer(signupReducer, {
    role: "unknown",
    submitted: false,
  });

  const [activeStep, setActiveStep] = useState(0);

  function handleNext() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          mt: 4,
          gap: 8,
          display: "flex",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Stack alignItems="center">
          <Avatar sx={{ m: 0.5, backgroundColor: "black", color: "white" }} />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Image src="/img/s3.png" width={300} height={300} />
        </Stack>
        <Box flexGrow={1} sx={{ height: "80%" }}>
          {activeStep === 0 && (
            <SignupRoleSelection
              nextStep={handleNext}
              role={signupState.role}
              dispatch={dispatch}
            />
          )}
          {activeStep === 1 && (
            <SignupForm
              prevStep={handleBack}
              role={signupState.role}
              dispatch={dispatch}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
