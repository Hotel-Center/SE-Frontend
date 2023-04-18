import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
import { Box, CircularProgress } from "@mui/material";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function CreateHotel() {
  const [message1, setMessage1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [toggled, setToggled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleUploadClick = () => {
    let hotelid = window.location.pathname.split("/")[3];
    console.log("hotel id is:", hotelid);

    setLoading(true);
    if (!selectedImage) {
      setOpen1(true);
      setLoading(false);
      setMessage1("Please upload a picture.");
    }

    if (selectedImage) {
      let form_data = new FormData();
      form_data.append("image", selectedImage, selectedImage.name);
      axios
        .post(
          makeURL(
            references.url_onehotelImage +
              "/" +
              hotelid +
              "/images/?is_header=true"
          ),
          form_data,
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((res) => {
          console.log("uploading hotel header: ", res.data);
          setLoading(false);
          setOpen1(true);
          setMessage1("Your image uploaded successfully!");
          window.location.replace("/CreateHotel/steps/3");
        })
        .catch((err) => {
          console.log("unable to upload.error: ", err);
          setLoading(false);
          setOpen1(true);
          setMessage1("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="containter m-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card-body">
            <div className="shadow p-3 mb-5 bg-body rounded">
              <div className="stepper-container-horizontal  ">
                <div className="col"></div>
                <div
                  className={`admin-panel ${toggled ? "toggled" : ""} d-flex`}
                  title="a1"
                >
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
                        <div className="mb-3 col-12" title="a12">
                          <div className="row mt-3" title="a13">
                            <div className="col-lg-3" title="a14">
                              <label
                                for="exampleFormControlInput2"
                                className="ms-2 mt-1 form-label"
                                title="f2"
                              >
                                Header Picture
                              </label>
                            </div>
                            <div className="col-lg-9" title="a16">
                              <input
                                title="a15"
                                type="file"
                                name="myImage"
                                accept="image/*"
                                onChange={(event) => {
                                  console.log(event.target.files[0]);
                                  setSelectedImage(event.target.files[0]);
                                }}
                              />
                              <button
                                className="btn m-2 edit-hotel"
                                onClick={handleUploadClick}
                              >
                                {loading ? (
                                  <CircularProgress
                                    style={{ color: "#fff" }}
                                    size="1.5rem"
                                  />
                                ) : (
                                  "Upload"
                                )}
                              </button>
                              <Snackbar
                                open={open1}
                                autoHideDuration={4000}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                              >
                                <Alert
                                  onClose={handleClose}
                                  severity={
                                    message1 ===
                                    "Your image uploaded successfully!"
                                      ? "success"
                                      : "error"
                                  }
                                  sx={{ width: "100%" }}
                                >
                                  {message1}
                                </Alert>
                              </Snackbar>
                              {imageUrl && selectedImage && (
                                <Box mt={2} textAlign="left">
                                  <div>Image Preview:</div>
                                  <img
                                    className="company-logo"
                                    src={imageUrl}
                                    alt={selectedImage.name}
                                    height="82px !important"
                                    width="150px !important"
                                  />
                                </Box>
                              )}
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
      </div>
    </div>
  );
}

export default CreateHotel;
