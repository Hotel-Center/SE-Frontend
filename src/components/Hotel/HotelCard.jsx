import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useHotelInfo from "./useHotelInfo";

import Image from "next/image";

export default function HotelCard(props) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { hotel, isHotelFavorite, toggleIsHotelFavorite } = useHotelInfo(
    props.hotel
  );

  const handleClick = () => {
    toggleIsHotelFavorite()
      .then(() => {
        setOpen(true);
        setMessage(
          isHotelFavorite === false
            ? "Hotel was added to your favorites successfully!"
            : "Hotel was removed from your favorites successfully!"
        );
        setTimeout(() => window.location.reload(true), 1000);
      })
      .catch(() => {
        setOpen(true);
        setMessage("An error occured. Please try again.");
      });
  };

  const handleRedirect = () => {
    window.location = "http://localhost:3000/" + "hotelpage/" + hotel.id;
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div class="col mt-5">
      <div class="card h-100">
        <Image
          src={props.image}
          style={{ width: "100%" }}
          height={200}
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">
            <a className="link hotel-links" href={"/hotelpage/" + hotel.id}>
              {hotel.name}
            </a>
          </h5>
          <Box
            sx={{
              width: 50,
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              marginLeft: "2px",
            }}
          >
            <Rating
              name="read-only"
              value={hotel.rate}
              readOnly
              precision={0.5}
            />
          </Box>
          <a href="">{hotel.address}</a>
          <p class="card-text">{hotel.description.slice(0, 250) + " ..."}</p>
        </div>
        <div className="card-footer p-3">
          <Button variant="contained" onClick={handleRedirect}>
            View details
          </Button>

          <button className="btn favorite-btn-style" onClick={handleClick}>
            {isHotelFavorite ? (
              <FavoriteIcon className="favorite-icon-style" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={
                message === "An error occured.Please try again."
                  ? "error"
                  : "success"
              }
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
