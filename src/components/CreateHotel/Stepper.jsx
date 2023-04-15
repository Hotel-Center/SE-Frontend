/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import "./Stepper.scss";

// export default class Stepper extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     // Completed - to add a check mark
  //     // Selected - to fill step with color
  //     // Highlighted - to make text of selected step bold
  //     steps: [],
  //   };
//   }
//   componentDidMount() {
//     const { steps, currentStepNumber } = this.props;
//     const stepsState = steps.map((step, index) => {
//       const stepObj = {};
//       stepObj.description = step;
//       stepObj.highlighted = index === 0 ? true : false;
//       stepObj.selected = index === 0 ? true : false;
//       stepObj.completed = false;
//       return stepObj;
//     });
//     const currentSteps = this.updateStep(currentStepNumber, stepsState);
//     this.setState({
//       steps: currentSteps,
//     });
//   }
//   componentDidUpdate(prevProps) {
//     const { steps } = this.state;
//     const currentSteps = this.updateStep(this.props.currentStepNumber, steps);
//     if (prevProps.currentStepNumber !== this.props.currentStepNumber)
//       this.setState({
//         steps: currentSteps,
//       });
//   }
//   updateStep(stepNumber, steps) {
//     const newSteps = [...steps];
//     let stepCounter = 0;
//     // Completed - to add a check mark
//     // Selected - to fill step with color
//     // Highlighted - to make text of selected step bold
//     while (stepCounter < newSteps.length) {
//       // Current step
//       if (stepCounter === stepNumber) {
//         newSteps[stepCounter] = {
//           ...newSteps[stepCounter],
//           highlighted: true,
//           selected: true,
//           completed: false,
//         };
//         stepCounter++;
//       } else if (stepCounter < stepNumber) {
//         // Past step
//         newSteps[stepCounter] = {
//           ...newSteps[stepCounter],
//           highlighted: false,
//           selected: true,
//           completed: true,
//         };
//         stepCounter++;
//       } else {
//         // Future step
//         newSteps[stepCounter] = {
//           ...newSteps[stepCounter],
//           highlighted: false,
//           selected: false,
//           completed: false,
//         };
//         stepCounter++;
//       }
//     }
//     return newSteps;
//   }

//   render() {
//     const { direction, stepColor } = this.props;
//     const { steps } = this.state;
//     const stepsJSX = steps.map((step, index) => {
//       return (
//         <div className="step-wrapper  mt-5" key={index}>
//           <div className="row"></div>

//           <div
//             className={`step-number ${
//               step.selected ? "step-number-selected" : "step-number-disabled"
//             }`}
//             style={{ background: `${step.selected ? stepColor : "none"}` }}
//           >
//             {step.completed ? <span>&#10003;</span> : index + 1}
//           </div>

//           <div
//             className={`step-description ${
//               step.highlighted && "step-description-active"
//             }`}
//           >
//             {step.description}
//           </div>

//           {index !== steps.length - 1 && (
//             <div className={`divider-line divider-line-${steps.length}`} />
//           )}
//         </div>
//       );
//     });

//     return <div className={`stepper-wrapper-${direction}`}>{stepsJSX}</div>;
//   }
// }

// Stepper.propTypes = {
//   direction: PropTypes.string.isRequired,
//   currentStepNumber: PropTypes.number.isRequired,
//   steps: PropTypes.array.isRequired,
//   stepColor: PropTypes.string.isRequired,
// };

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ["Initial Hotel info", "Upload Header Image", "Upload Hotel Images"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}