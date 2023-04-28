// import React, { useEffect, useState } from "react";
import Header from "./layouts/Header";
// import NewHotels from "./NewHotels";
import TopHotels from "./TopHotels";
// import axios from "axios";
// import { cookies, makeURL } from "../../Utils/common";
// import references from "../../assets/References.json";
import image1 from "../../../public/img/pics/london1.jpg";
import image2 from "../../../public/img/pics/london2.jpg";
import image3 from "../../../public/img/pics/london3.jpg";
import image4 from "../../../public/img/pics/Amsterdom1.jpg";

// const NewHotelsMock = [
//   {
//     image: image1,
//     name: "The landmark london",
//     city: "London",
//     country: "England",
//     score: "0.0",
//     isFavorite: false,
//   },
//   {
//     image: image2,
//     name: "The Montague Gardens",
//     city: "London",
//     country: "England",
//     score: "0.0",
//     isFavorite: false,
//   },
//   {
//     image: image3,
//     name: "Presidential Apartments",
//     city: "London",
//     country: "England",
//     score: "0.0",
//     isFavorite: false,
//   },
//   {
//     image: image4,
//     name: "Eden hotel Amsterdam",
//     city: "Amsterdam",
//     country: "Netherland",
//     score: "0.0",
//     isFavorite: false,
//   },
// ];

const TopHotelsMock = [
  {
    id: 10001,
    image: image2,
    description: "Offer #1",
    name: "The Montague Gardens",
    city: "London",
    country: "England",
    rate: "4.9",
    isFavorite: false,
  },
  {
    id: 10002,
    image: image3,
    description: "Offer #2",
    name: "Presidential Apartments",
    city: "London",
    country: "England",
    rate: "4.9",
    isFavorite: true,
  },
  {
    id: 10003,
    image: image1,
    description: "Offer #3",
    name: "The landmark london",
    city: "London",
    country: "England",
    rate: "4.8",
    isFavorite: true,
  },
  {
    id: 10004,
    image: image4,
    description: "Offer #4",
    name: "Eden hotel Amsterdam",
    city: "Amsterdam",
    country: "Netherland",
    rate: "4.7",
    isFavorite: true,
  },
];

export default function Homepage() {
  // const [hotels, setHotels] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(makeURL(references.url_allhotels), {
  //       headers: {
  //         Authorization: cookies.get("Authorization"),
  //       },
  //     })
  //     .then((response) => {
  //       console.log("this is the homepage response: ", response.data);
  //       setHotels(response.data);
  //       console.log("this response is for homepage: ", response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      {/* <Header setHotels={setHotels} /> */}
      <Header />
      {/* <NewHotels hotels={NewHotelsMock} /> */}
      <TopHotels hotels={TopHotelsMock} />
      {/* <Homepagecontent hotels={hotels} /> */}
    </div>
  );
}
