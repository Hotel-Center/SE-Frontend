import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL, set_cookie } from "../../Utils/common";
import references from "../../assets/References.json";
import { Box, CircularProgress } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import "../../css/Profile.css";
import Myhotelscard from "./Myhotelscard";
import image1 from "../../statics/img/pics/london1.jpg";
import image2 from "../../statics/img/pics/london2.jpg";
import image3 from "../../statics/img/pics/london3.jpg";
import image4 from "../../statics/img/pics/Amsterdom1.jpg";
import image5 from "../../statics/img/pics/Amsterdom2.jpg";
import MyhotelsCard from "./Myhotelscard";
import Sidebar from "./Sidebar";

export default function Myhotels() {
  const [hotel, setHotel] = useState(null);

  const header = {
    header: {
      Authorization: cookies,
    },
  };

  useEffect(() => {
    // console.log(cookies.get("Authorization"));
    axios
      .get(makeURL(references.url_allhotels), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        setHotel(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(")))))))))) ");
  }, []);

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            {/* {listClasses.map((item) => {
              <SingleFavoriteCard
                img={item.img}
                title={item.title}
                description={item.description}
                isFavorite={item.isFavorite}
                id={item.id}
              />;
            })} */}
            <MyhotelsCard
              img={image1}
              title="The landmark london"
              description="In the heart of London's fashionable Marylebone, this deluxe
              hotel has a stunning glass-roofed 8-story atrium with
              towering palm trees, an award-winning restaurant, luxurious
              bedrooms and an indoor..."
            />
            <MyhotelsCard
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
            />
          </div>
        </div>
      </div>
    </div>
  );
  // hotel ? (
  //   <div className="container">
  //     <div className="row">
  //       <div className="col-lg-3"></div>
  //       <div className="col-lg-9">
  //         <div className="row mt-5">
  //           {hotel.map((h) => (
  //             <Myhotelscard
  //               description={h.description}
  //               image={h.header}
  //               name={h.name}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ) : null;
}
