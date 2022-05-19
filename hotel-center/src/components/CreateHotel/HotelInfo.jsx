import React, { Component } from 'react';

const formvalid2 = ({ error, ...rest }) => {
	let isValid = false;

	Object.values(error).forEach((val) => {
		if (val.length > 0) {
			isValid = false;
		} else {
			isValid = true;
		}
	});

	Object.values(rest).forEach((val) => {
		if (val === null) {
			isValid = false;
		} else {
			isValid = true;
		}
	});

	return isValid;
};

class HotelInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			fields: {},
			get_price: 1,
			error: {
				Name: {
					u1: '',
					u2: ''
				},

				Name: {
					u1: '',
					u2: ''
				},

				Name: {
					u1: '',
					u2: ''
				}
			}
		};

		this.formValChange = this.formValChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	formValChange = (e) => {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		const { name, value } = e.target;
		let error = { ...this.state.error };

		switch (name) {
			case 'Name':
				error.Name.u1 =
					(typeof value !== 'undefined' && value.length < 3) ||
					value.length > 15 ||
					!value.match(/^[A-Z a-z]+$/)
						? '*Please enter a valid  name'
						: '';

				error.Name.u2 = !value ? '*This field must not be empty!' : '';
				break;

			case 'Name':
				error.Name.u1 =
					(typeof value !== 'undefined' && value.length < 3) ||
					value.length > 15 ||
					!value.match(/^[A-Z a-z]+$/)
						? '*Please enter a valid  name'
						: '';

				error.Name.u2 = !value ? '*This field must not be empty!' : '';
				break;

			case 'Name':
				error.Name.u1 =
					(typeof value !== 'undefined' && value.length < 3) ||
					value.length > 15 ||
					!value.match(/^[A-Z a-z]+$/)
						? '*Please enter a valid  name'
						: '';

				error.Name.u2 = !value ? '*This field must not be empty!' : '';
				break;

			default:
				break;
		}

		this.setState({
			fields,
			error,
			[name]: value
		});
	};

	onSubmit(e) {
		e.preventDefault();

		if (formvalid2(this.state)) {
			let fields = {};
			fields['Name'] = '';
			fields['lastname'] = '';
			fields['phone'] = '';
			fields['nationalcode'] = '';
			this.setState({ fields: fields });
		}
	}
	render() {
		return (
			<div>
				<br />
				<br />
				<br />
				<br />
				<form noValidate onSubmit={this.onSubmit} className="row g-3 needs-validation mx-3">
					<div className="row">
						<div className="col-md-8">
							<div className="row">
								<div className="col-md-4">
									<label className="ms-2 mt-1 form-label">Name :</label>
								</div>
								<div className="col-md-8">
									{' '}
									<input
										required
										fullWidth
										id="Name"
										label="Name"
										name="Name"
										placeholder="Name*"
										autoComplete="text"
										aria-describedby="inputGroup-sizing-sm"
										className={
											this.state.error.Name.u1.length > 0 ||
											this.state.error.Name.u2.length > 0 ? (
												'is-invalid form-control lg'
											) : (
												'form-control'
											)
										}
										value={this.state['Name']}
										onChange={this.formValChange}
									/>
									<div className="mt-3 ">
										{this.state.error.Name.u1.length > 0 && (
											<p className="err">
												{this.state.error.Name.u1}
												<br />
											</p>
										)}
										{this.state.error.Name.u2.length > 0 && (
											<p className="err">
												{this.state.error.Name.u2}
												<br />
											</p>
										)}
									</div>
								</div>
							</div>

							<hr class="dashed" />

							<div className="row">
								<div className="col-md-4">
									<label className="ms-2 mt-1 form-label">Country :</label>
								</div>
								<div className="col-md-8">dsf</div>
							</div>

							<hr class="dashed" />

							<div className="row">
								<div className="col-md-4">
									<label className="ms-2 mt-1 form-label">State :</label>
								</div>
								<div className="col-md-8">
									{' '}
									<input
										required
										fullWidth
										id="Name"
										label="Name"
										name="Name"
										placeholder="Name*"
										autoComplete="text"
										aria-describedby="inputGroup-sizing-sm"
										className={
											this.state.error.Name.u1.length > 0 ||
											this.state.error.Name.u2.length > 0 ? (
												'is-invalid form-control lg'
											) : (
												'form-control'
											)
										}
										value={this.state['Name']}
										onChange={this.formValChange}
									/>
									<div className="mt-3 ">
										{this.state.error.Name.u1.length > 0 && (
											<p className="err">
												{this.state.error.Name.u1}
												<br />
											</p>
										)}
										{this.state.error.Name.u2.length > 0 && (
											<p className="err">
												{this.state.error.Name.u2}
												<br />
											</p>
										)}
									</div>
								</div>
							</div>

							<hr class="dashed" />

							<div className="row">
								<div className="col-md-4">
									<label className="ms-2 mt-1 form-label">Address :</label>
								</div>
								<div className="col-md-8">
									{' '}
									<input
										required
										fullWidth
										id="Name"
										label="Name"
										name="Name"
										placeholder="Name*"
										autoComplete="text"
										aria-describedby="inputGroup-sizing-sm"
										className={
											this.state.error.Name.u1.length > 0 ||
											this.state.error.Name.u2.length > 0 ? (
												'is-invalid form-control lg'
											) : (
												'form-control'
											)
										}
										value={this.state['Name']}
										onChange={this.formValChange}
									/>
									<div className="mt-3 ">
										{this.state.error.Name.u1.length > 0 && (
											<p className="err">
												{this.state.error.Name.u1}
												<br />
											</p>
										)}
										{this.state.error.Name.u2.length > 0 && (
											<p className="err">
												{this.state.error.Name.u2}
												<br />
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
                        
                        <div className="card-containter ">
								<div className="card-body">
									<div class="shadow p-3 mb-5 bg-body rounded">
									
                                    </div>
                                    </div>
                                    </div>
                                    </div>
					</div>
				</form>
			</div>
		);
	}
}

export default HotelInfo;
