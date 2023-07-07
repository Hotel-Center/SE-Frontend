
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const CHARACTER_LIMIT = 1000;

  const [region, setRegion] = useState(null);
  const [city, setCity] = useState(null);
  const [phone, setPhone] = useState(null);

  // let tempcheckin = checkin; // value from your state
  // let tempcheckout = checkout; // value from your state
  // let formattedcheckinDate = moment(tempcheckin).format("hh:mm");
  // let formattedcheckoutDate = moment(tempcheckout).format("hh:mm");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };
  function uploadSingleFile(e) {
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
    setImages([...images, e.target.files[0]]);
    // console.log("images", images);
    let hotelid = window.location.pathname.split("/")[3];
    console.log(
      window.location.pathname,
      "\n",
      "/createHotel/steps/3/" + hotelid
    );
  }
  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    const i = images.filter((item, index) => index != e);
    setFile(s);
    setImages(i);
    console.log(i);
  }
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      description: "",
      country: "",
      city: "",
    },
    validationSchema: validationSchema,
  });








  if (!selectedImage) {
    setOpen1(true);
    setLoading(false);
    setMessage1("Please upload a picture.");
  }
  let filled =
    !formik.errors.name &&
    !formik.errors.address &&
    !formik.errors.description;
  console.log("filled: ", filled);
  console.log(
    "informations validation: ",
    !formik.errors.name,
    "\n",
    !formik.errors.address,
    "\n",
    !formik.errors.description,
    "\n",
    !formik.errors.name &&
      !formik.errors.address &&
      !formik.errors.description
  );
  if (!filled) {
    setOpen(true);
    setMessage("Please fill in the blanks.");
    setLoading(false);
  }

  if (filled && filled_hotel && selectedImage) {
    let form_data_header = new FormData();
    console.log("header: ", selectedImage);
    form_data_header.append(
      "hedaer_images",
      selectedImage,
      selectedImage.name
    );
    console.log("form_data_header: ", form_data_header);
    let image = form_data_header;

    let form_data_hotel = new FormData();
    console.log("before each image");
    let i = 0;
    images.forEach((image) => {
      form_data_hotel = new FormData();
      console.log("1.", i, " form_data_hotel: ", form_data_hotel);
      form_data_hotel.append("hotel_image", image, image.name);
      console.log("hotel_image want to be in form data", image, image.name);
      console.log("2", i, " form_data_hotel: ", form_data_hotel);
    });

    console.log("start: phone:", String(phone));
    axios
      .get(makeURL(references.url_me), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((res) => {
        let manager = res.data.id;
        console.log("manager:", res.data.id, res);
        return manager;
      })
      .then((manager) => {
        axios
          .post(
            makeURL(references.url_addhotel),
            // form_data_hotel,
            // form_data_header,
            // image,
            {
              manager: manager,
              name: formik.values.name,
              address: formik.values.address,
              description: formik.values.description,
              phone_number: String(phone),
              country: region,
              city: city,
              files: form_data_hotel,
              // longitude: "8:00",
              // latitude: "12:00",
            },
            {
              headers: {
                Authorization: cookies.get("Authorization"),
              },
            }
          )
          .then((res) => {
            setOpen(true);
            setLoading(false);
            console.table(formik.values);
            console.log("end: phone:", String(phone));
            setMessage("Your hotel was submitted successfully!");
            console.log("hotelId:", res.data.id);
            router.push("/myhotels");
          })
          .catch((err) => {
            console.log("ERROR:", "\n", err);
            console.log(
              "eroooor",
              "\n",
              "name:",
              formik.values.name,
              "\n",
              "address:",
              formik.values.address,
              "\n",
              "description:",
              formik.values.description,
              "\n",
              "phone_number:",
              String(phone),
              "\n",
              "country:",
              region,
              "\n",
              "city:",
              city,
              "\n"
            );
            setLoading(false);
            setOpen(true);
            setMessage("We have a problem, try again later.");
          });
      })
      .catch((error) => {
        console.log("get ERROR:", error);
      });
    console.log("phone:", phone);
  }
};












Create Hotel
</h2>
<div className="container mt-4 p-4 edit-hotel-form border">
  <div className="mb-3 col-12" title="a7">
    <div className="row mt-3" title="a8">
      <div className="col-lg-3" title="a9">
        <label
          for="exampleFormControlInput2"
          className="ms-2 mt-1 form-label"
          title="f1"
        >
          Name
        </label>
      </div>
      <div className="col-lg-9" title="a10">
        <ThemeProvider theme={textfieldTheme}>
          <TextField
            required
            fullWidth
            placeholder="Something hotel"
            id="name"
            size="small"
            label="Name"
            InputLabelProps={{ shrink: true }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name &&
              Boolean(formik.errors.name)
            }
            helperText={
              formik.touched.name && formik.errors.name
            }
          />
        </ThemeProvider>
      </div>
    </div>
  </div>
  <hr class="dashed" />
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
  <hr class="dashed" />
  <div className="mb-3 col-12">
    <div className="row">
      <div className="col-lg-3">
        <label
          for="exampleFormControlInput2"
          className="ms-2 mt-1 form-label"
          title="f3"
        >
          Address
        </label>
      </div>
      <div className="col-lg-9" title="a18">
        <ThemeProvider theme={textfieldTheme}>
          <TextField
            required
            fullWidth
            placeholder="London, 22B Baker street"
            id="address"
            size="small"
            label="Address"
            InputLabelProps={{ shrink: true }}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address &&
              Boolean(formik.errors.address)
            }
            helperText={
              formik.touched.address &&
              formik.errors.address
            }
          />
        </ThemeProvider>
      </div>
    </div>
  </div>
  <hr class="dashed" />
  <div className="mb-3 col-12">
    <div className="row">
      <div className="col-lg-3">
        <label
          for="exampleFormControlInput2"
          className="ms-2 mt-1 form-label"
          title="f4"
        >
          Country & City
        </label>
      </div>

      <div className="col-lg-9">
        <div className="row">
          <div className="col-lg-6" title="a19">
            <ThemeProvider theme={textfieldTheme}>
              <div className="div">
                <div className="col-lg-12">
                  <CountryDropdown
                    fullwidth
                    style={{
                      color: "#555",
                      border: "1px solid #555;",
                    }}
                    className={" form-control    "}
                    required
                    fullWidth
                    placeholder="USA"
                    id="country"
                    size="small"
                    label="County"
                    InputLabelProps={{ shrink: true }}
                    value={region}
                    onChange={(val) => {
                      setRegion(val);
                      console.log(val, "region");
                    }}
                  />
                </div>
                <br />
                <div className="col-lg-12">
                  {" "}
                  <RegionDropdown
                    title="a20"
                    style={{
                      color: "#555",
                      border: "1px solid #555;",
                    }}
                    className={" form-control "}
                    country={region}
                    required
                    fullWidth
                    placeholder="New York"
                    id="city"
                    size="small"
                    label="City"
                    InputLabelProps={{ shrink: true }}
                    value={city}
                    onChange={(val) => {
                      setCity(val);
                      console.log("city", val);
                    }}
                  />
                </div>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr class="dashed" />
  <div className="mb-3 col-12">
    <div className="row">
      <div className="col-lg-3">
        <label
          for="exampleFormControlInput3"
          className="ms-2 mt-1 form-label"
          title="f7"
        >
          Phone number
        </label>
      </div>
      <div className="col-lg-9" style={{ width: "100" }}>
        <ThemeProvider
          theme={textfieldTheme}
          style={{ width: "100" }}
        >
          <PhoneInput
            country={"ir"}
            required
            fullWidth
            style={{ width: "100" }}
            placeholder="09912141869"
            id="phone"
            size="small"
            label="Phone number"
            InputLabelProps={{ shrink: true }}
            value={formik.values.phone}
            onChange={(val) => {
              setPhone(val);
              console.log(phone, "phone");
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phone &&
              Boolean(formik.errors.phone)
            }
            helperText={
              formik.touched.phone && formik.errors.phone
            }
          />
        </ThemeProvider>
      </div>
    </div>
  </div>
  <hr class="dashed" />
  <div className="mb-3 col-12">
    <div className="row">
      <div className="col-lg-2">
        <label
          for="exampleFormControlInput4"
          className="ms-2 mt-1 form-label"
          title="e8"
        >
          Email
        </label>
      </div>
      <div className="col-1"></div>
      <div className="col-lg-9">
        <ThemeProvider theme={textfieldTheme}>
          <TextField
            required
            fullWidth
            placeholder="yf7901@gamil.com"
            id="email"
            size="small"
            label="Email"
            InputLabelProps={{ shrink: true }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email && formik.errors.email
            }
          />
        </ThemeProvider>
      </div>
    </div>
  </div>
  <hr class="dashed" />
  <div className="mb-3 col-12">
    <div className="row" title="f5">
      <div className="col-lg-3">
        <label
          for="exampleFormControlTextarea1"
          className="ms-2 form-label"
          title="f9"
        >
          Description
        </label>
      </div>
      <div className="col-lg-9">
        <ThemeProvider theme={textfieldTheme}>
          <TextField
            fullWidth
            id="description"
            placeholder=""
            multiline
            autoComplete="description"
            label="Description"
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: CHARACTER_LIMIT }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description &&
              Boolean(formik.errors.description)
            }
            helperText={`${formik.values.description.length}/${CHARACTER_LIMIT}`}
          />
        </ThemeProvider>
      </div>
    </div>
  </div>
  <hr class="dashed" />
  <div className="mb-3 col-12">
    <Typography sx={{ mb: 3 }}>
      Please upload other photos of hotel here.
    </Typography>
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
                  style={{
                    width: "200px",
                    height: "100px",
                  }}
                />
                {/* <button
                  type="button"
                  className="btn edit-hotel"
                  
                >
                  delete
                </button> */}
                <IconButton aria-label="delete">
                  <DeleteIcon
                    onClick={() => deleteFile(index)}
                  />
                </IconButton>
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

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          severity={
            message ===
            "Your picture was uploaded successfully!"
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </form>
  </div>
  <Snackbar
    open={open}
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
        message === "Please fill in the blanks."
          ? "error"
          : "success"
      }
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>{" "}
  <div className="row mt-2 d-fit-content">
    {/* <div className="col-4" /> */}
    <div className="col-2 edit-hotel mb-3">
      <button
        className="btn edit-hotel"
        onClick={() => {
          setOpen2(true);
        }}
        style={{ background: "gray" }}
      >
        {loading ? (
          <CircularProgress
            style={{ color: "#fff" }}
            size="1.5rem"
          />
        ) : (
          "Cancel"
        )}{" "}
      </button>
      <Dialog
        open={open2}
        // onClose={handleCloseClickDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure to cancel?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By canceling the hotel construction process,
            your information will not be registered and
            you will have to start building the hotel
            again later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen2(false);
            }}
          >
            Back
          </Button>
          <Button
            className="btn edit-hotel"
            onClick={() => {
              setOpen2(false);
              router.push("/myhotels");
            }}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <div className="col-6" />
    <div className="col-4 edit-hotel mb-3">
      <button
        className="btn edit-hotel"
        onClick={handleClick}
      >
        {loading ? (
          <CircularProgress
            style={{ color: "#fff" }}
            size="1.5rem"
          />
        ) : (
          "Create Hotel"
        )}{" "}
      </button>
    </div>
  </div>

  <Snackbar
        open={open}
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
            message === "Please fill in the blanks." ? "error" : "success"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>{" "}