import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Carousel from "../../../components/Reservation/carousel";
import references from "../../../assets/References.json";
import { cookies, makeURL } from "../../../Utils/common";
import axios from "axios";
// import Popup from './Popup.jsx';
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import moment from "moment";
// let formattedDate = moment(date).format('YYYY-MM-DD');

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      open: "",
      loading: false,

      person: 0,
      getin: null,
      getout: null,
      im1: null,
      im2: null,
      im3: null,
      im4: null,
      im5: null,
      err: "",
      start_day: "2022-05-18",
      end_day: "2022-05-23",
      price_per_day: "1",
      images: [],
      name: "",
      city: "",
      num_passenger: "10",

      room: 1,
      emailtxt: "",
      fields: {},
      get_price: 1,
      error: {
        firstname: {
          u1: "",
          u2: "",
        },
        lastname: {
          u1: "",
          u2: "",
        },
        phone: {
          p1: "",
          p2: "",
          p3: "",
        },
        nationalcode: {
          p1: "",
          p2: "",
        },
      },
    };

    this.formValChange = this.formValChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  calculatePrice() {
    let s = this.state.getin.split("-")[2];
    console.log(s, "pay");

    let e = this.state.getout.split("-")[2];
    console.log(e, "pay");

    let payment =
      (parseInt(e) - parseInt(s) + 1) * parseInt(this.state.price_per_day);
    this.setState({ get_price: payment });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    if (formvalid2(this.state)) {
      let fields = {};
      fields["firstname"] = "";
      fields["lastname"] = "";
      fields["phone"] = "";
      fields["nationalcode"] = "";
      this.setState({ fields: fields });

      axios
        .post(
          makeURL(references.url_reserveroom),
          {
            start_day: this.state.getin,
            end_day: this.state.getout,
            firstname: this.state.fields["firstname"],
            lastname: this.state.fields["lastname"],
            room: this.state.room,
            price_per_day: this.state.price_per_day,
            national_code: this.state.fields["nationalcode"],
            phone_number: this.state.fields["phone"],
          },
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((response) => {
          console.log("roop:", response.data);
          this.setState({ open: true });
          this.setState({ loading: false });
          this.setState({ message: "Your room is reserved successfully" });
        })
        .catch((error) => {
          if (error.response.status == 400) {
            // window.alert("sss1")
            this.setState({ open: true });
            this.setState({ loading: false });

            this.setState({ message: "Please enter valid data." });
          }
          if (error.response.status == 406) {
            // window.alert("ss2")
            this.setState({ open: true });
            this.setState({ loading: false });

            this.setState({ message: "Your wallet balance is not enough." });
          }
          if (error.response.status == 403) {
            this.setState({ open: true });
            this.setState({ loading: false });

            // window.alert("ss3")

            this.setState({ message: "This room is reserved before." });
          }
          console.log(error);
        });

      // console.log(
      // 	one_room_reserve(
      // 		this.state.getin,
      // 		this.state.getout,
      // 		this.state.fields['firstname'],
      // 		this.state.fields['lastname'],
      // 		this.state.room,
      // 		this.state.price_per_day,
      // 		this.state.fields['nationalcode'],
      // 		this.state.fields['phone']
      // 	)
      // );
    }
  }

  async componentDidMount() {
    this.setState({ images: JSON.parse(localStorage.getItem("items")) });

    var splitted = window.location.toString().split("/");

    await this.setState({ room: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.room);
    console.log(this.state.room, "roo");

    await this.setState({ city: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.city);
    console.log(this.state.city, "city");

    await this.setState({ name: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.name);
    console.log(this.state.name, "nam");

    await this.setState({ price_per_day: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.price_per_day);

    await this.setState({ person: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.person);
    console.log(this.state.person, "per");

    await this.setState({ getout: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.getout);
    this.setState({ getout: moment(this.state.getout).format("YYYY-MM-DD") });
    console.log(this.state.getout, "getout");

    await this.setState({ getin: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.getin);
    this.setState({ getin: moment(this.state.getin).format("YYYY-MM-DD") });
    console.log(this.state.getin, "getin");

    this.calculatePrice();

    axios
      .get(makeURL("/hotel/room/" + this.state.room + "/images/"), {
        // headers: {
        // 	Authorization: cookies.get('Authorization')
        // }
      })
      .then((response) => {
        console.log("rooms immmmg:", response.data);
        this.setState({ images: response.data });

        this.setState({
          im1: "http://127.0.0.1:8000" + this.state.images[0].image,
        });
        this.setState({
          im2: "http://127.0.0.1:8000" + this.state.images[1].image,
        });
        this.setState({
          im3: "http://127.0.0.1:8000" + this.state.images[2].image,
        });
        this.setState({
          im4: "http://127.0.0.1:8000" + this.state.images[3].image,
        });
        this.setState({
          im5: "http://127.0.0.1:8000" + this.state.images[4].image,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formValChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    const { name, value } = e.target;
    let error = { ...this.state.error };

    switch (name) {
      case "firstname":
        error.firstname.u1 =
          (typeof value !== "undefined" && value.length < 3) ||
          value.length > 15 ||
          !value.match(/^[A-Z a-z]+$/)
            ? "*Please enter a valid  name"
            : "";

        error.firstname.u2 = !value ? "*First name must not be empty!" : "";
        break;

      case "lastname":
        error.lastname.u1 =
          (typeof value !== "undefined" && value.length < 3) ||
          value.length > 15 ||
          !value.match(/^[A-Z a-z]+$/)
            ? "*Please enter a valid last name"
            : "";

        error.lastname.u2 = !value ? "*Last name must not be empty!" : "";
        break;

      case "phone":
        error.phone.p1 =
          typeof value !== "undefined" && !value.match(/^[0-9]+$/)
            ? "*Invalid phone number. "
            : "";

        error.phone.p2 =
          value.length < 11 ? "*Too short for a phone number" : "";

        error.phone.p3 = !value ? "*Password field must not be empty" : "";

        break;

      case "nationalcode":
        error.nationalcode.p1 =
          typeof value !== "undefined" &&
          (!value.match(/^[0-9]+$/) || value.length < 10)
            ? "*Invalid national code. "
            : "";

        error.nationalcode.p2 = !value ? "*This field must not be empty" : "";

        break;

      default:
        break;
    }

    this.setState({
      fields,
      error,
      [name]: value,
    });
  };

  render() {
    // this.state.get_price = this.calculatePrice();
    // this.calculatePrice();
    return (
      <div>
        <div className="containter m-5">
          <div className="row justify-content-center">
            <div
              id="carouselExampleIndicators"
              className="carousel slide d-md-none mb-5"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={this.state.im1}
                    style={{ borderRadius: "50px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={this.state.im2}
                    style={{ borderRadius: "50px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={this.state.im3}
                    style={{ borderRadius: "50px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src={this.state.im4}
                    style={{ borderRadius: "50px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card-containter ">
                <div className="card-body">
                  <div className="shadow p-3 mb-5 bg-body rounded">
                    <div className="row   m-3">
                      <div
                        className="col"
                        style={{ display: "flex", alignItems: "left" }}
                      >
                        <div
                          className="col-md-6"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-calendar-date-fill "
                            viewBox="0 0 16 16"
                            color="#cd9a2d"
                          >
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                            <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                          </svg>

                          <div className="col-md-6 m-2 ">
                            <span style={{}}> Check in:</span>
                            <br />
                            <span
                              style={{
                                justifyContent: "end",
                                alignItems: "right",
                                color: "grey",
                              }}
                            >
                              {this.state.getin}
                            </span>
                          </div>
                        </div>
                        <div
                          className="col-md-6"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-calendar-date-fill "
                            viewBox="0 0 16 16"
                            color="#cd9a2d"
                          >
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                            <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                          </svg>

                          <div className="col-md-6 m-2 ">
                            <span style={{}}>
                              {/* {' '} */}
                              Check out:
                            </span>
                            <br />
                            <span
                              style={{
                                justifyContent: "end",
                                alignItems: "right",
                                color: "grey",
                              }}
                            >
                              {/* <small id="dateout" /> */}
                              {this.state.getout}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <hr className="m-3 hr-text" />
                    </div>

                    <div
                      className="col-12  m-4"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                        color="#cd9a2d"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>

                      <div
                        className="col col-sm-8 "
                        style={{ fontWeight: "bold" }}
                      >
                        <span className="ms-2"> Number of passengers : </span>
                      </div>

                      <div
                        className="col col-sm-4"
                        style={{ color: "grey", marginLeft: "1px" }}
                      >
                        {/* {JSON.parse(localStorage.getItem('i3'))} */}
                        {this.state.person}
                      </div>
                    </div>

                    <div className="">
                      <hr className="m-3 hr-text" />
                    </div>
                    <div
                      className="col-12   m-4"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-wallet2"
                        viewBox="0 0 16 16"
                        color="#cd9a2d"
                      >
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                      </svg>
                      <div
                        className="col col-sm-8 "
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        <span className="ms-2">Payment details : </span>
                      </div>
                      <div className="col col-sm-4">
                        {this.state.get_price}$
                      </div>
                      {/* {this.state.price_per_day} */}
                      {/* <div style={{ justifyContent: 'end', color: 'grey' }} id="person" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 ">
              <div className="container d-none d-md-block">
                <br />
                <br />
                <div className="row-md-12" title="HotelName">
                  <h2 style={{ fontWeight: "bold" }}>{this.state.name}</h2>
                </div>

                <div className="row ">
                  <div className="col-5 icon2  gx-3 col-sm-1 d-flex">
                    <FmdGoodIcon />

                    {this.state.city}
                  </div>
                  <br />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="d-none d-md-block m-4">
                  <Carousel show={4}>
                    <div className="m-2">
                      <img
                        src={this.state.im1}
                        className="img-fluid"
                        alt="..."
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <div className="m-2">
                      <img
                        src={this.state.im2}
                        className="img-fluid"
                        alt="..."
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <div className=" m-2">
                      <img
                        src={this.state.im3}
                        className="img-fluid"
                        alt="..."
                        style={{ borderRadius: "20px" }}
                      />
                    </div>

                    <div className=" m-2">
                      <img
                        src={this.state.im4}
                        className="img-fluid"
                        alt="..."
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="">
                <hr className="m-3 hr-text" />
              </div>{" "}
              <div className="row mx-3">
                <h4 style={{ fontWeight: "bold" }}>Supervisor information :</h4>
              </div>
              <div className="row mx-3">
                <p>
                  It is enough to enter the information of one of the passengers
                  as a supervisor.
                </p>
              </div>
              <div className="row">
                <form
                  noValidate
                  onSubmit={this.onSubmit}
                  className="row g-3 needs-validation mx-3"
                >
                  <div className="col-md-4 ">
                    <input
                      required
                      fullWidth
                      id="firstname"
                      label="firstname"
                      name="firstname"
                      placeholder="Firstname*"
                      autoComplete="text"
                      aria-describedby="inputGroup-sizing-sm"
                      className={
                        this.state.error.firstname.u1.length > 0 ||
                        this.state.error.firstname.u2.length > 0
                          ? "is-invalid form-control lg"
                          : "form-control"
                      }
                      value={this.state["firstname"]}
                      onChange={this.formValChange}
                    />

                    <div className="mt-3 ">
                      {this.state.error.firstname.u1.length > 0 && (
                        <p className="err">
                          {this.state.error.firstname.u1}
                          <br />
                        </p>
                      )}
                      {this.state.error.firstname.u2.length > 0 && (
                        <p className="err">
                          {this.state.error.firstname.u2}
                          <br />
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <input
                      required
                      fullWidth
                      id="lastname"
                      label="lastname"
                      name="lastname"
                      autoComplete="text"
                      placeholder="Lastname*"
                      className={
                        this.state.error.lastname.u1.length > 0 ||
                        this.state.error.lastname.u2.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      value={this.state["lastname"]}
                      onChange={this.formValChange}
                    />
                    <div className="mt-3 ">
                      {this.state.error.lastname.u1.length > 0 && (
                        <p className="err">
                          {this.state.error.lastname.u1}
                          <br />
                        </p>
                      )}
                      {this.state.error.lastname.u2.length > 0 && (
                        <p className="err">
                          {this.state.error.lastname.u2}
                          <br />
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <input
                      required
                      fullWidth
                      id="nationalcode"
                      label="nationalcode"
                      name="nationalcode"
                      placeholder="National code*"
                      autoComplete="text"
                      className={
                        this.state.error.nationalcode.p1.length > 0 ||
                        this.state.error.nationalcode.p2.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      value={this.state["nationalcode"]}
                      onChange={this.formValChange}
                    />

                    <div className="mt-3 ">
                      {this.state.error.nationalcode.p1.length > 0 && (
                        <p className="err">
                          {this.state.error.nationalcode.p1}
                          <br />
                        </p>
                      )}
                      {this.state.error.nationalcode.p2.length > 0 && (
                        <p className="err">
                          {this.state.error.nationalcode.p2}
                          <br />
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <PhoneInput
                      country={"us"}
                      id="phone"
                      label="phone"
                      name="phone"
                      fullWidth
                      required
                      value={this.state["phone"]}
                      onChange={(phone) => this.setState({ phone })}
                    />
                  </div>
                  <div className="">
                    <hr className="hr-text" />
                  </div>{" "}
                  <div className="form-check  m-3 checkbox-black">
                    <input
                      className="form-check-input form-control-huge checkbox-black"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                      style={{ fontWeight: "bold" }}
                    >
                      Late arrival :
                    </label>
                    <br />
                    <lable
                      className="col-12 form-check-label"
                      // eslint-disable-next-line react/jsx-no-duplicate-props
                      // className=""
                      htmlFor="flexCheckDefault"
                    >
                      {" "}
                      <p>
                        If your arrival time at the hotel is after 8 pm we
                        assumes no responsibility for the cancellation.
                      </p>
                    </lable>
                  </div>
                  <div className="">
                    <hr className="hr-text" />
                  </div>
                  <div className="form-check  m-3">
                    <input
                      className="form-check-input form-control-huge"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      onClick={this.handlecheck2}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                      style={{ fontWeight: "bold" }}
                    >
                      Default checkbox
                    </label>
                    <br />
                    <lable
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      I have read the site rules and the internal hotel rules
                      and I approve it.
                    </lable>
                  </div>
                  <div className="gap-7 mx-auto m-3  " /> <br />
                  <div
                    className="d-grid   col-5 ms-4"
                    style={{ display: "flex", alignItems: "left" }}
                  >
                    <button
                      type="button"
                      onClick={this.handleSubmit}
                      className="btn btn-dark btn-lg"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Reserve
                    </button>
                  </div>
                  <Snackbar
                    open={this.state.open}
                    autoHideDuration={2000}
                    onClose={() => this.setState({ open: false })}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={() => this.setState({ open: false })}
                      severity={
                        this.state.message ===
                        "Your room is reserved successfully"
                          ? "success"
                          : "error"
                      }
                      sx={{ width: "20%" }}
                    >
                      {this.state.message}
                    </Alert>
                  </Snackbar>{" "}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Reserve
                          </h5>
                          <button
                            type="button"
                            className="btn-close "
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          If confirmed, the room will be reserved for you and
                          the cost will be deducted from your account.
                        </div>
                        <br />
                        <br />
                        <br />

                        <div
                          className="modal-footer"
                          style={{ color: "#000000" }}
                        >
                          <button
                            type="button"
                            className="btn btn-outline-dark"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>

                          <button
                            onClick={this.handleSubmit}
                            type="submit"
                            // class="btn btn-dark"
                            className="btn btn-primary hotel-room"
                            style={{ backgroundColor: "#cd9a2d" }}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Reservation;
