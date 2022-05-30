import Stepper from './Stepper';
import React, { Component } from 'react';
import HotelInfo2 from './HotelInfo2';
import HotelInfo3 from './HotelInfo3';
import HotelInfo4 from './HotelInfo4';
import HotelInfo from './HotelInfo';
import '../../css/Profile.css';
import Editprofile1 from '../Profile/Editprofile1';
import profiledata2 from '../Profile/profiledata2';
export default class steps extends Component {
	constructor() {
		super();

		this.state = {
			btn: null,
			btn2: null,

			currentStep: 1,
			page: null
		};
	}

	handleClick(clickType) {
		const { currentStep } = this.state;
		let newStep = currentStep;
		clickType === 'next' ? newStep++ : newStep--;

		if (newStep > 0 && newStep <= 5) {
			this.setState({
				currentStep: newStep
			});
		}
	}

	render() {
		const { currentStep } = this.state;
		if (this.state.currentStep === 1) {
			this.state.page = <HotelInfo />;
			this.state.btn = (
				<button className="btn edit-hotel" onClick={() => this.handleClick('next')}>
					Next
				</button>
			);

			this.state.btn2 = (
				<button className="btn edit-hotel" onClick={() => this.handleClick()}>
					Previous
				</button>
			);
		} else if (this.state.currentStep === 2) {
			this.state.page = <HotelInfo2 />;
			this.state.btn = (
				<button className="btn edit-hotel" onClick={() => this.handleClick('next')}>
					Next
				</button>
			);

			this.state.btn2 = (
				<button className="btn edit-hotel" onClick={() => this.handleClick()}>
					Previous
				</button>
			);
		} else if (this.state.currentStep === 3) {
			this.state.page = <HotelInfo3 />;
			this.state.btn = (
				<button className="btn edit-hotel" onClick={() => this.handleClick('next')}>
					Next
				</button>
			);
			this.state.btn2 = (
				<button className="btn edit-hotel" onClick={() => this.handleClick()}>
					Previous
				</button>
			);
		} else if (this.state.currentStep === 4) {
			this.state.btn = (
				<button className="btn edit-hotel" onClick={() => this.handleClick()}>
					Previous
				</button>
			);
			this.state.btn2 = <div />;

			this.state.page = <HotelInfo4 />;
		}
		return (
			<div className="containter m-5">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8">
						<div className="card-body">
							<div className="shadow p-3 mb-5 bg-body rounded">
								<div className="stepper-container-horizontal  ">
									<div className="d-none d-lg-block">
										<Stepper
											direction="horizontal"
											currentStepNumber={currentStep - 1}
											steps={stepsArray}
											stepColor="#cd9a2d"
										/>
									</div>
									<br />
									<br />
									<div className="row">
										<div className="col-5 col-md-1" />
										<div className="col-5 col-md-8" />

										<div className="col-1 col-md-1 ">
										{this.state.btn2}
										</div>
										<div className="col-1 col-md-1  zero ">{this.state.btn}</div>
									</div>

									{this.state.page}

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
const stepsArray = [ 'Initial Hotel info', 'Add details', 'Upload images', 'Hotel facilities' ];
