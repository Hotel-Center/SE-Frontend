import * as React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import HandshakeIcon from "@mui/icons-material/Handshake";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PaidIcon from "@mui/icons-material/Paid";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

export default function CreateHotel() {
  return (
    <div class=" bg-white">
      <div className="container ">
        <div className="row align-items-center ">
          <div className="col-md-5 mb-md-0 mb-5 pb-md-0 pb-3 d-md-none">
            <Image src="/img/Hotel_Booking.png" width={400} height={300} />
          </div>
          <div className="col-lg-6 offset-lg-1 col-md-7 text-md-start text-center">
            <div className="mx-md-0 mx-auto">
              <h2
                className="mb-md-5 mb-4"
                style={{ fontWeight: "bolder", fontSize: "29px" }}
              >
                Why Hotel Center
              </h2>
              <div className="d-md-flex align-items-start d-block mb-4 pb-2">
                <HandshakeIcon style={{ color: "#c99015" }} />{" "}
                <div className="ps-md-2">
                  <h3
                    className="h6 mb-2"
                    style={{ fontWeight: "bold", fontSize: "22px" }}
                  >
                    Customer credibility and trust
                  </h3>
                  <p className="mb-0 fs-sm">
                    Your trust in us guarantees your credibility.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="d-md-flex align-items-start d-block mb-4 pb-2">
              <RoomServiceIcon style={{ color: "#c99015" }} />
              <div className="ps-md-2">
                <h3
                  className="h6 mb-2"
                  style={{ fontWeight: "bold", fontSize: "22px" }}
                >
                  Hotel reputation
                </h3>
                <p className="mb-0 fs-sm">
                  Make your hotel known by registering your hotel at the Center
                  Hotel.{" "}
                </p>
              </div>
            </div>
            <div className="d-md-flex align-items-start d-block">
              <PaidIcon style={{ color: " #c99015" }} />
              <div className="ps-md-2">
                <h3
                  className="h6 mb-2"
                  style={{ fontWeight: "bold", fontSize: "22px" }}
                >
                  Profit and save time
                </h3>
                <p className="mb-0 fs-sm">
                  Increase your hotel reservations by registering your hotel at
                  Hotel Center.
                </p>
              </div>
            </div>
          </div>
          <div className="d-none d-md-block col-md-5 mb-md-0 mb-5 pb-md-0 pb-3">
            <Image src="/img/Hotel_booking.png" width={400} height={300} />
          </div>
        </div>
        <div className="row">
          <br />
          <br />
        </div>
      </div>
      <div className="row">
        <br />
        <br />
      </div>
      <div className="row align-items-center">
        <div className="col" />
        <div className="col-12 col-sm-10 col-lg-5">
          <Link href="/createHotel/steps/1">
            <button type="button" class="w-100 btn btn-lg btn-dark">
              Create your hotel now!{" "}
            </button>
          </Link>
          <div className="row align-items-center">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => {
                window.location.replace("/myhotels");
              }}
            >
              Back
            </Button>
          </div>
        </div>

        <div className="col" />
        <br />
        <br />
        <p />
        <br />
        <br />
        <p />
      </div>
    </div>
  );
}
