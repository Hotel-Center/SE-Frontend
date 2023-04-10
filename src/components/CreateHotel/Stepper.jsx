import Stepper from "./Stepper";
import React, { Component } from "react";
import HotelInfo2 from "./HotelInfo2";
import HotelInfo3 from "./HotelInfo3";
import HotelInfo from "./HotelInfo";
import "../../css/Profile.css";
import "../CreateHotel/create.css";
export default class steps extends Component {
  constructor() {
    super();

    this.state = {
      btn: null,
      btn2: null,

      currentStep: 1,
      page: null,
    };
  }

  handleClick(clickType) {
    const { currentStep } = this.state;
    let newStep = currentStep;
    clickType === "next" ? newStep++ : newStep--;

    if (newStep > 0 && newStep <= 3) {
      this.setState({
        currentStep: newStep,
      });
    }
  }

  render() {
    const { currentStep } = this.state;
    if (this.state.currentStep === 1) {
      this.state.page = <HotelInfo />;
      this.state.btn = (
        <span className="ms-4">
          <button
            className="btn edit-hotel1"
            onClick={() => this.handleClick("next")}
          >
            Next
          </button>
        </span>
      );
    } else if (this.state.currentStep === 2) {
      this.state.page = <HotelInfo2 />;
      this.state.btn = (
        <span className="ms-4">
          <button
            className="btn edit-hotel1"
            onClick={() => this.handleClick("next")}
          >
            Next
          </button>
        </span>
      );

      this.state.btn2 = (
        <span className="me-4">
          <button
            className="btn edit-hotel1"
            onClick={() => this.handleClick()}
          >
            Previous
          </button>
        </span>
      );
    } else if (this.state.currentStep === 3) {
      this.state.page = <HotelInfo3 />;
      this.state.btn = (
        <span className="ms-4">
          <button
            className="btn edit-hotel1"
            onClick={() => this.handleClick("next")}
          >
            Next
          </button>
        </span>
      );
    }
    return (
      <div className="containter m-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card-body">
              <div className="shadow p-3 mb-5 bg-body rounded">
                <div className="stepper-container-horizontal  ">
                  <div className="col">
                    <div className="row">
                      <div className="d-none d-lg-block">
                        <Stepper
                          direction="horizontal"
                          currentStepNumber={currentStep - 1}
                          steps={stepsArray}
                          stepColor="#cd9a2d"
                        />
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="row">
                      <br />
                      <br />
                      <div className="row">
                        {/* d-sm-none
										 d-none d-sm-block
                      */}
                        <div className="col-1 col-lg-1 d-none d-md-block" />

                        <div className="col-4 col-lg-8 d-md-none" />
                        <div className="col-5 col-lg-8 d-none d-md-block" />

                        <div
                          className="col-2 col-lg-1 float-right  d-md-none"
                          style={{ marginRight: "30px" }}
                        >
                          {this.state.btn2}
                        </div>
                        <div
                          className="col-2 col-lg-1 float-right d-none d-md-block"
                          style={{ marginRight: "20px" }}
                        >
                          {this.state.btn2}
                        </div>

                        <div
                          className="col-2 col-lg-1  zero d-md-none"
                          style={{ marginRight: "1px" }}
                        >
                          {this.state.btn}
                        </div>
                        <div
                          className="col-2 col-lg-1  zero d-none d-md-block"
                          style={{ marginRight: "10px" }}
                        >
                          {this.state.btn}
                        </div>

                        <div className="col-1 col-lg-1 d-md-none" />
                      </div>
                    </div>
                    <div className="row">{this.state.page}</div>
                  </div>

                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const stepsArray = [
  "Initial Hotel info",
  "Upload Header Image",
  "Upload Hotel Images",
];
