import React from "react";
import SingleTopHotelCard from "./SingleTopHotelCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";

export default function TopHotels() {
  const [besthotels, setBesthotels] = useState(null);

  useEffect(() => {
    axios
      .get(makeURL(references.url_besthotels), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("this is the response for best hotels: ", response.data);
        setBesthotels(response.data);
      })
      .catch((error) => {
        console.log("this is the error for best hotels request: ", error);
      });
  }, []);

  return (
    <div className="container top-hotels mt-5">
      <h3 className="mb-4 fw-bold">Top Hotels</h3>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {besthotels
          ? besthotels.map((hotel) => (
              <SingleTopHotelCard
                image={hotel.header}
                name={hotel.name}
                city={hotel.city}
                country={hotel.country}
                score={hotel.rate}
                isFavorite={hotel.is_favorite}
                id={hotel.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}
