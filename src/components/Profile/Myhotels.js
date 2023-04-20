import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
import { Box } from "@mui/material";
import "../../css/Profile.css";
import MyhotelsCard from "./Myhotelscard";
import Sidebar from "./Sidebar";
import image1 from "../../statics/img/pics/add_files.svg";

export default function Myhotels() {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    axios
      .get(makeURL(references.url_myhotels), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("my hotels response: ", response.data.owners);
        setHotel(response.data.owners);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  const handleClick = () => {
    window.location.href = "http://localhost:3000/createHotel";
  };
  // useEffect(() => {
  //   // console.log(cookies.get("Authorization"));
  //   axios
  //     .get(makeURL(references.url_allhotels), {
  //       headers: {
  //         Authorization: cookies.get("Authorization"),
  //       },
  //     })
  //     .then((response) => {
  //       setHotel(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // console.log(")))))))))) ");
  // }, []);

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {hotel
              ? hotel.map((h) => (
                  <MyhotelsCard
                    img={references.base_address + h.header}
                    title={h.name}
                    description={h.description.slice(0, 250) + " ..."}
                    id={h.id}
                  />
                ))
              : null}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div className="container" style={{ textAlign: "center" }}>
                <img
                  className="add-hotel-img"
                  style={{ height: "100px", cursor: "pointer" }}
                  src={image1}
                  onClick={handleClick}
                />
              </div>
            </Box>

            {/* <MyhotelsCard
              img={image2}
              title="The Montague Gardens"
              description="Overlooking private, secluded gardens, this 4-star luxury
              hotel offers 2 restaurants, an on-site gym and 2 sun rooms.
              Russell Square Underground Station is a 4 minute walk away"
            />
            <MyhotelsCard
              img={image4}
              title="Presidential Apartments"
              description="On the corner of a beautiful garden square, in London's
              prestigious Kensington, this modernised period building
              offers spacious, air-conditioned serviced apartments with
              free Wi-Fi."
            />
            <MyhotelsCard
              img={image3}
              title="Eden hotel Amsterdam"
              description="Situated in the heart of the city centre, Eden Hotel
              Amsterdam offers warm-coloured rooms and free WiFi. The
              famous Rembrandt Square is right around the corner."
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
