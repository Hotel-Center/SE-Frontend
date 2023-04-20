import * as React from "react";
import { Typography } from "@mui/material";
import PreviewMultipleImages from "../../../../components/CreateHotel/PreviewMultipleImages";
import DomainAddIcon from "@mui/icons-material/DomainAdd";

function CreateHotelImages() {
  return (
    <div className="containter m-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card-body">
            <div className="shadow p-3 mb-5 bg-body rounded">
              <div className="stepper-container-horizontal  ">
                <div className="col"></div>
                <div className={` d-flex`} title="a1">
                  <div className="w-100" title="a2">
                    <div className="container py-5 px-lg-5" title="a3">
                      <h2 className="mb-4 fw-bold d-flex" title="a4">
                        <DomainAddIcon
                          className="me-2"
                          fontSize="large"
                          title="a5"
                        />
                        Create Hotel
                      </h2>
                      <div
                        className="container mt-4 p-4 edit-hotel-form border"
                        title="a6"
                      >
                        <div className="mb-3 col-12">
                          <Typography sx={{ mb: 3 }}>
                            Please upload other photos of hotel here.
                          </Typography>
                          <PreviewMultipleImages />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateHotelImages;
