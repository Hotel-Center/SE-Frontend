import React from "react";
import SingleNewHotelCard from "./SingleNewHotelCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";

export default function NewHotels() {
  const [newhotels, setNewhotels] = useState(null);

  useEffect(() => {
    axios
      .get(makeURL(references.url_newhotels), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("this response is for new hotels: ", response.data);
        setNewhotels(response.data.slice(0, 4));
      })
      .catch((error) => {
        console.log("this is the error for new hotels request: ", error);
      });
  }, []);

  return (
    <div className="container new-hotels mt-5">
      <h3 className="mb-4 fw-bold">New Hotels</h3>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        {newhotels
          ? newhotels.map((hotel) => (
              <SingleNewHotelCard
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
