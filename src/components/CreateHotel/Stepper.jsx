/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { Component } from "react";
import PropTypes from "prop-types";
import st from "./Stepper.scss";

export default class Stepper extends Component {
  constructor() {
    super();
    this.state = {
      // Completed - to add a check mark
      // Selected - to fill step with color
      // Highlighted - to make text of selected step bold
      steps: [],
    };
  }

  componentDidMount() {
    const { steps, currentStepNumber } = this.props;

    const stepsState = steps.map((step, index) => {
      const stepObj = {};
      stepObj.description = step;
      stepObj.highlighted = index === 0 ? true : false;
      stepObj.selected = index === 0 ? true : false;
      stepObj.completed = false;
      return stepObj;
    });

    const currentSteps = this.updateStep(currentStepNumber, stepsState);

    this.setState({
      steps: currentSteps,
    });
  }

  componentDidUpdate(prevProps) {
    const { steps } = this.state;
    const currentSteps = this.updateStep(this.props.currentStepNumber, steps);

    if (prevProps.currentStepNumber !== this.props.currentStepNumber)
      this.setState({
        steps: currentSteps,
      });
  }

  updateStep(stepNumber, steps) {
    const newSteps = [...steps];
    let stepCounter = 0;

    // Completed - to add a check mark
    // Selected - to fill step with color
    // Highlighted - to make text of selected step bold

    while (stepCounter < newSteps.length) {
      // Current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false,
        };
        stepCounter++;
      } else if (stepCounter < stepNumber) {
        // Past step
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,
        };
        stepCounter++;
      } else {
        // Future step
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
    }

    return newSteps;
  }

  render() {
    const { direction, stepColor } = this.props;
    const swd = st[`stepper-wrapper-${direction}`]
    const { steps } = this.state;
    const stepsJSX = steps.map((step, index) => {
      return (
        <div className={`${st[step-wrapper]}  mt-5`} key={index}>
          <div className="row"></div>

          <div
            className={`${st[step-number]} ${
              step.selected ? st[step-number-selected] : st[step-number-disabled]
            }`}
            style={{ background: `${step.selected ? stepColor : "none"}` }}
          >
            {step.completed ? <span>&#10003;</span> : index + 1}
          </div>

          <div
            className={`${st[step-description]} ${
              step.highlighted && st[step-description-active]
            }`}
          >
            {step.description}
          </div>
          {index !== steps.length - 1 && (
            <div className={`${st[divider-line]} ${steps.length === 2 ? st[divider-line-2] : steps.length === 3 ? st[divider-line-3] : steps.length === 4 ? st[divider-line-4] : st[divider-line-5]}`} />
          )}
        </div>
      );
    });

    return <div className={swd}>{stepsJSX}</div>;
  }

}

Stepper.propTypes = {
  direction: PropTypes.string.isRequired,
  currentStepNumber: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  stepColor: PropTypes.string.isRequired,
};
