import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
// import { cookies, makeURL, set_cookie } from '../../../Utils/common';
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function PreviewMultipleImages() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [images, setImages] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function uploadSingleFile(e) {
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
    setImages([...images, e.target.files[0]]);
    // console.log("images", images);
  }

  function upload(e) {
    // console.log(url);
    let hotelid = window.location.pathname.split("/")[3];
    e.preventDefault();
    console.log(images);
    let filled = images.length != 0;

    if (!filled) {
      setOpen(true);
      setMessage("Please choose a picture to upload.");
    }

    if (filled) {
      images.forEach((image) => {
        let form_data = new FormData();
        form_data.append("image", image, image.name);
        axios
          .post(
            makeURL(references.url_onehotelImage + "/" + hotelid + "/images/"),
            form_data,
            {
              headers: {
                Authorization: cookies.get("Authorization"),
              },
            }
          )
          .then((response) => {
            console.log("status code: ", response.data);
            setOpen(true);
            setLoading(false);
            setMessage("Your picture was uploaded successfully!");
            // document.location.reload(true);
            if (
              window.location.pathname ===
              "/CreateHotel/steps/" + hotelid + "/3"
            ) {
              window.location.replace("/myhotels");
            }
          })
          .catch((error) => {
            console.log("error: ", error);
            setLoading(false);
            setOpen(true);
            setMessage("An error occurred.Please try again.");
          });
      });
    }
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    const i = images.filter((item, index) => index != e);
    setFile(s);
    setImages(i);
    console.log(i);
  }

  useEffect(() => {
    console.log("images: ", images);
  }, [images]);

  return (
    <form>
      <div className="form-group preview">
        {file.length > 0 &&
          file.map((item, index) => {
            return (
              <div className="col" key={item}>
                <img
                  src={item}
                  className="m-3"
                  alt=""
                  style={{ width: "200px", height: "100px" }}
                />
                <button
                  type="button"
                  className="btn edit-hotel"
                  onClick={() => deleteFile(index)}
                >
                  delete
                </button>
              </div>
            );
          })}
      </div>

      <div className="col-lg-8">
        <input
          type="file"
          name="myImage"
          accept="image/*"
          disabled={file.length === 5}
          onChange={uploadSingleFile}
        />
      </div>
      <button type="button" className="btn m-2 edit-hotel" onClick={upload}>
        Upload
      </button>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            message === "Your picture was uploaded successfully!"
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </form>
  );
}
export default PreviewMultipleImages;
