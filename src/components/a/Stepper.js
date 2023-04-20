import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../css/Stepper.css";
import Hotelinfo from "./Hotelinfo";
import Sidebar from "../Profile/Sidebar";
// import $ from 'jquery';
// import "./Stepper";

// //jQuery time
// var current_fs, next_fs, previous_fs; //fieldsets
// var left, opacity, scale; //fieldset properties which we will animate
// var animating; //flag to prevent quick multi-click glitches

// $(document).ready(".next").click(function () {
//   if (animating) return false;
//   animating = true;
//   console.log("next clicked:", animating);

//   current_fs = $(this).parent();
//   next_fs = $(this).parent().next();
//   console.log('current fs: ', current_fs);
//   console.log('next fs activated: ',next_fs);

//   //activate next step on progressbar using the index of next_fs
//   $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//   //show the next fieldset
//   next_fs.show();
//   //hide the current fieldset with style
//   current_fs.animate(
//     { opacity: 0 },
//     {
//       step: function (now, mx) {
//         //as the opacity of current_fs reduces to 0 - stored in "now"
//         //1. scale current_fs down to 80%
//         scale = 1 - (1 - now) * 0.2;
//         //2. bring next_fs from the right(50%)
//         left = now * 50 + "%";
//         //3. increase opacity of next_fs to 1 as it moves in
//         opacity = 1 - now;
//         current_fs.css({
//           transform: "scale(" + scale + ")",
//           position: "absolute",
//         });
//         next_fs.css({ left: left, opacity: opacity });
//       },
//       duration: 800,
//       complete: function () {
//         current_fs.hide();
//         animating = false;
//       },
//       //this comes from the custom easing plugin
//       easing: "easeInOutBack",
//     }
//   );
// });

// $(document).ready(".previous").click(function () {
//   if (animating) return false;
//   animating = true;

//   current_fs = $(this).parent();
//   previous_fs = $(this).parent().prev();

//   //de-activate current step on progressbar
//   $("#progressbar li")
//     .eq($("fieldset").index(current_fs))
//     .removeClass("active");

//   //show the previous fieldset
//   previous_fs.show();
//   //hide the current fieldset with style
//   current_fs.animate(
//     { opacity: 0 },
//     {
//       step: function (now, mx) {
//         //as the opacity of current_fs reduces to 0 - stored in "now"
//         //1. scale previous_fs from 80% to 100%
//         scale = 0.8 + (1 - now) * 0.2;
//         //2. take current_fs to the right(50%) - from 0%
//         left = (1 - now) * 50 + "%";
//         //3. increase opacity of previous_fs to 1 as it moves in
//         opacity = 1 - now;
//         current_fs.css({ left: left });
//         previous_fs.css({
//           transform: "scale(" + scale + ")",
//           opacity: opacity,
//         });
//       },
//       duration: 800,
//       complete: function () {
//         current_fs.hide();
//         animating = false;
//       },
//       //this comes from the custom easing plugin
//       easing: "easeInOutBack",
//     }
//   );
// });

// $(document).ready(".submit").click(function () {
//   return false;
// });

// const theme = createTheme({
//   palette: {
//     inherit: {
//       main: "#b10c59",
//     },
//   },
//   // typography: {
//   //   fontFamily: [
//   //     'Nunito',
//   //   ].join(','),
//   // },
// });

const steps = ["Manager information", "Hotel information", "Hotel images"];

export default function LinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className="container">
      {/* <ThemeProvider theme={theme}> */}
      <Box sx={{ width: "100%" }}>
        <Stepper className={c.root} activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step className={c.root} key={label} completed={completed[index]}>
              <StepButton className={c.root} onClick={handleStep(index)}>
                {label}
              </StepButton>
              {activeStep ? (
                label === "Manager information" ? (
                  <Sidebar />
                ) : label === "Hotel information" ? (
                  <Hotelinfo />
                ) : activeStep === "Hotel images" ? (
                  console.log("Hello world", activeStep)
                ) : null
              ) : null}
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset} sx={{ color: "#cd9a2d" }}>
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1, color: "#cd9a2d" }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block", color: "#cd9a2d" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete} sx={{ color: "#cd9a2d" }}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
      {/* </ThemeProvider> */}
    </div>
  );
}

{
  /* <div className="row">
        <div className="col col-md-offset-3">
          <form id="msform">
            <ul id="progressbar">
              <li className="active">Personal Details</li>
              <li>Social Profiles</li>
              <li>Account Setup</li>
            </ul>

            <fieldset>
              <h2 className="fs-title">Personal Details</h2>
              <h3 className="fs-subtitle">Tell us something more about you</h3>
              <input type="text" name="fname" placeholder="First Name" />
              <input type="text" name="lname" placeholder="Last Name" />
              <input type="text" name="phone" placeholder="Phone" />
              <input
                type="button"
                name="next"
                className="next action-button"
                value="Next"
              />
            </fieldset>
            <fieldset>
              <h2 className="fs-title">Social Profiles</h2>
              <h3 className="fs-subtitle">
                Your presence on the social network
              </h3>
              <input type="text" name="twitter" placeholder="Twitter" />
              <input type="text" name="facebook" placeholder="Facebook" />
              <input type="text" name="gplus" placeholder="Google Plus" />
              <input
                type="button"
                name="previous"
                className="previous action-button-previous"
                value="Previous"
              />
              <input
                type="button"
                name="next"
                className="next action-button"
                value="Next"
              />
            </fieldset>
            <fieldset>
              <h2 className="fs-title">Create your account</h2>
              <h3 className="fs-subtitle">Fill in your credentials</h3>
              <input type="text" name="email" placeholder="Email" />
              <input type="password" name="pass" placeholder="Password" />
              <input
                type="password"
                name="cpass"
                placeholder="Confirm Password"
              />
              <input
                type="button"
                name="previous"
                className="previous action-button-previous"
                value="Previous"
              />
              <input
                type="submit"
                name="submit"
                className="submit action-button"
                value="Submit"
              />
            </fieldset>
          </form>
        </div>
      </div> */
}
