import { useRouter } from "next/router";
import {
  one_hotel_connection,
  one_hotel_image,
  one_hotel_rooms,
} from "src/Utils/connection";
import * as React from "react";
import Helmet from "react-helmet";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
// import Hotelpage2 from "../Homepage/layouts/Hotelpage2";
import { useState } from "react";
import { useEffect } from "react";
import SimpleAccordion from "src/components/HotelPage/accordion";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import ReviewsList from "@/components/hotel_reviews/ReviewsList";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import AddReviewForm from "@/components/hotel_reviews/AddReviewForm";
import addComment from "src/services/reveiws/add";
import getComments from "src/services/reveiws/get";
import { number } from "yup";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function HotelPage() {
  const initialState = {
    id: null,
    manager: null,
    phone_number: "",
    country: "",
    longitude: null,
    latitude: null,
    address: "",
    images: [],
    name: "",
    header: null,
    city: "",
    state: "",
    description: "",
    rate: "",
    phone_numbers: "",
    start_date: "",
  };

  const [id, setId] = useState(null);
  const [hotel, setHotel] = useState(initialState);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  function loadComments() {
    getComments(id).then((data) => {
      setReviews(data);
    });
  }

  function handleAddComment(values) {
    values.hotel = id;
    values.tag = values.tag.map((tag) => tag.id);
    addComment(values).then(() => {
      loadComments();
    });
  }

  useEffect(() => {
    if (router.query.id !== undefined) {
      setId(router.query.id);
    }
  }, [router.query]);

  useEffect(() => {
    if (id === null) {
      return;
    }
    one_hotel_connection(id).then((res) => {
      if (res !== "false") {
        setHotel(res);
        // console.log("ASD", hotel.images);
      }
    });
    // one_hotel_image(id).then((res) => {
    //   if (res !== false) {
    //     setImages(res.forEach((data) => data.image));
    //   }
    // });
    loadComments();
  }, [id]);

  useEffect(() => {
    if (id === null) {
      return;
    }
    one_hotel_rooms(id).then((res) => {
      if (res !== "false") {
        setRooms(res);
      }
    });
  }, [id]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = hotel.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="div">
      <div className="div">
        <div className="div">
          <div className="container mt-2 mt-sm-3 mt-md-4 mt-lg-5">
            <div className="row-md-12" title="HotelName">
              <h2>{hotel.name}</h2>
            </div>

            <div className="row ">
              <div className="col-5 icon2  gx-3 col-sm-1 d-flex">
                <FmdGoodIcon />
                <span style={{ whiteSpace: "nowrap" }}>
                  {hotel.country}, {hotel.city}
                </span>
              </div>
              {/* 
              <br />
              <div className="col-12 icon col-md-2 d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                  style={{ marginRight: 5 }}
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>{" "}
                <span>{hotel.rate}</span> 
              </div>
               */}
            </div>

            <div className="row mt-3 mt-lg-4">
              <div className="col">
                <SimpleAccordion description={hotel.description} />
              </div>
            </div>
            {hotel.images.length > 0 ? (
              <div className="mt-2 mt-lg-3 d-none d-md-block">
                <ImageList variant="masonry" cols={3} gap={8}>
                  {hotel.images.map((item) => (
                    <ImageListItem key={item.image}>
                      <img
                        src={`${item.image}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={
                          "Image of: " +
                          hotel.name +
                          ". Image courtesy of HotelCenter"
                        }
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            ) : (
              <h6 className="mt-4">
                Sorry! No images have been submitted for this hotel.
              </h6>
            )}
            {hotel.images.length > 0 ? (
              <div className="d-md-none mt-3 mt-sm-4">
                <Box sx={{ flexGrow: 1 }}>
                  <Box className="d-flex" sx={{ p: 0 }}>
                    <img
                      src={hotel.images[activeStep]?.image}
                      alt={
                        "Image of: " +
                        hotel.name +
                        ". Image courtesy of HotelCenter"
                      }
                      loading="lazy"
                      className="mx-auto"
                      style={{ maxWidth: "100%", maxHeight: "255px" }}
                    />
                  </Box>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>
              </div>
            ) : null}

            <h6 className="mt-3 mt-sm-4 mt-md-5">Available Rooms</h6>
            <div className="" style={{ width: "100%" }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Type</TableCell>
                      <TableCell align="right">Capacity</TableCell>
                      <TableCell align="right">View</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Facilities</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow
                        // key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="div" scope="row">
                          <div
                            className="d-sm-none"
                            style={{
                              maxHeight: 80,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "100%",
                            }}
                          >
                            <span>{room.description}</span>
                          </div>
                          <div
                            className="d-none d-sm-block d-md-none"
                            style={{
                              maxHeight: 120,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "100%",
                            }}
                          >
                            <span>{room.description}</span>
                          </div>
                          <div
                            className="d-none d-md-block"
                            style={{
                              maxHeight: 160,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "100%",
                            }}
                          >
                            <span>{room.description}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">{room.type}</TableCell>
                        <TableCell align="right">{room.capacity}</TableCell>
                        <TableCell align="right">{room.view}</TableCell>
                        <TableCell align="right">{room.price}</TableCell>
                        <TableCell align="right">
                          {room.room_facilities.length == 1
                            ? room.room_facilities[0].name
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {/*
            <div className="row">
              <div className="col-6">
                <div className="row ">
                  <div className="col-12 gy-3 ">
                    <img
                      src={hotel.images[0]?.image}
                      className="img-fluid imggh"
                      alt="..."
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6 gy-3">
                    <img
                      src={hotel.images[1]?.image}
                      className="img-fluid imgg"
                      alt="..."
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                  <div className="col-6 gy-3">
                    <img
                      src={hotel.images[2]?.image}
                      className="img-fluid imgg"
                      alt="..."
                      style={{ borderRadius: "5px" }}
                    />
                  </div>

                  <div className="col-6 gy-3">
                    <img
                      src={hotel.images[3]?.image}
                      className="img-fluid imgg"
                      alt="..."
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                  <div className="col-6 gy-3">
                    <img
                      // src={pic4}
                      src={hotel.images[4]?.image}
                      className="img-fluid imgg"
                      alt="..."
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
             */}
          </div>
        </div>
        {/* 
        <div
          id="carouselExampleIndicators"
          className="carousel slide d-md-none"
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
                src={hotel.images[0].image}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={hotel.images[1].image}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={hotel.images[2].image}
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
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
         */}
      </div>

      <div className="container">
        <Helmet bodyAttributes={{ style: "background-color : #f5f5f5" }} />
        <Card
          sx={{
            width: "fit-content",
            mx: "auto",
            mt: 4,
          }}
        >
          <CardHeader
            title={
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Rating readOnly value={5.0} />
                {reviews.length} Reviews
              </Box>
            }
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <ReviewsList reviews={reviews} />
              <AddReviewForm handleSubmit={handleAddComment} />
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
