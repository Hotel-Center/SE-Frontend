// import React from "react";
// import SlideOne from "../../../../public/img/slide01.jpg";
// import SlideTwo from "../../../../public/img/slide02.jpg";
// import SlideThree from "../../../../public/img/slide03.jpg";
// import SearchForm from "./SearchForm";

// function Header(props) {
//   return (
//     <div className="header">
//       <div
//         id="carousel"
//         className="carousel slide w-100 "
//         data-bs-ride="carousel"
//       >
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img src={SlideOne} className="d-block w-100" alt="Slide 1" />
//           </div>
//           <div className="carousel-item">
//             <img src={SlideTwo} className="d-block w-100" alt="Slide 2" />
//           </div>
//           <div className="carousel-item">
//             <img src={SlideThree} className="d-block w-100" alt="Slide 3" />
//           </div>
//         </div>
//       </div>
//       <div className="d-flex px-2 px- justify-content-center">
//         <SearchForm setHotels={props.setHotels} />
//       </div>
//     </div>
//   );
// }

// export default Header;

import React from "react";
import SearchForm from "./SearchForm";
import Image from "next/image";
import Box from "@mui/material/Box";
import LocationSearchForm from "@/components/HotelSearch/LocationSearchForm";

function Header(props) {
  return (
    <div className="header justify-content-center">
      <div
        id="carousel"
      // className="carousel slide w-100"
      // data-bs-ride="carousel"
      >
        {/* <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div> */}
        {/* <div className="carousel-inner"> */}
        <div style={{ width: "100%", height: "100%" }}>
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <Image quality={100} fill src="/img/slide01.jpg" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <Image quality={100} fill src="/img/slide02.jpg" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <Image quality={100} fill src="/img/slide03.jpg" alt="Slide 3" />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5 className="carousel-caption-style">Third slide label</h5>
              <p className="carousel-caption-style">
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="px-2 px-sm-0 d-flex flex-column justify-content-center">
      </div> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <SearchForm />
        \br
        <LocationSearchForm />
      </Box>
    </div>
  );
}

export default Header;
