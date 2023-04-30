import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../../Utils/common";
import references from "../../../assets/References.json";
import Sidebar from "../../../components/Profile/Sidebar";
import SingleFavoriteCard from "../../../components/Profile/SingleFavoriteCard";

export default function Favorites2() {
  const [favoritehotels, setFavoritehotels] = useState(null);

  useEffect(() => {
    // console.log(isFavorite);
    axios
      .get(makeURL(references.url_addfavoritehotel), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("this is favorite hotel response: ", response.data);
        setFavoritehotels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container favorites">
      <div className="row pt-5">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {favoritehotels
              ? favoritehotels.map((item) => (
                  <SingleFavoriteCard
                    img={item.hotel_info.header}
                    title={item.hotel_info.name}
                    description={item.hotel_info.description.slice(0, 250)}
                    isFavorite={item.hotel_info.is_favorite}
                    id={item.hotel_info.id}
                  />
                ))
              : null}
            {/* <SingleFavoriteCard
              img={image1}
              title="The landmark london"
              description="In the heart of London's fashionable Marylebone, this deluxe
              hotel has a stunning glass-roofed 8-story atrium with
              towering palm trees, an award-winning restaurant, luxurious
              bedrooms and an indoor..."
              isFavorite={true}
            />
            <SingleFavoriteCard
              img={image2}
              title="The Montague Gardens"
              description="Overlooking private, secluded gardens, this 4-star luxury
              hotel offers 2 restaurants, an on-site gym and 2 sun rooms.
              Russell Square Underground Station is a 4 minute walk away"
              isFavorite={true}
            />
            <SingleFavoriteCard
              img={image4}
              title="Presidential Apartments"
              description="On the corner of a beautiful garden square, in London's
              prestigious Kensington, this modernised period building
              offers spacious, air-conditioned serviced apartments with
              free Wi-Fi."
              isFavorite={true}
            />
            <SingleFavoriteCard
              img={image3}
              title="Eden hotel Amsterdam"
              description="Situated in the heart of the city centre, Eden Hotel
              Amsterdam offers warm-coloured rooms and free WiFi. The
              famous Rembrandt Square is right around the corner."
              isFavorite={true}
            /> */}
            {/* <div class="col">
              <div class="card h-100">
                <img src={image1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-primary view-hotel-button"
                  >
                    View details
                  </button>
                  <button
                    className="btn favorite-btn-style"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    {isFavorite ? (
                      <FavoriteIcon className="favorite-icon-style" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src={image2} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src={image4} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src={image2} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
