/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordian from "@mui/material/Accordion";
import AccordianSummary from "@mui/material/AccordionSummary";
import AccordianDetails from "@mui/material/AccordionDetails";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Helmet from "react-helmet";
import image1 from "../../../statics/img/pics/london1.jpg";
import image2 from "../../../statics/img/pics/london2.jpg";
import image3 from "../../../statics/img/pics/london3.jpg";
import image4 from "../../../statics/img/pics/Amsterdom1.jpg";
import image5 from "../../../statics/img/pics/Amsterdom2.jpg";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import { Hidden } from "@material-ui/core";
import Backdrop from "@mui/material/Backdrop";
// import './hotelcard.css';

export default function Hotelcard() {
  // rating stars
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [value2, setValue2] = useState(4);

  // facilities checkbox
  const [v1, setVal1] = useState(false);
  const [v2, setVal2] = useState(false);
  const [v3, setVal3] = useState(false);
  const [v4, setVal4] = useState(false);
  const [v5, setVal5] = useState(false);
  const [v6, setVal6] = useState(false);
  const [v7, setVal7] = useState(false);
  const [v8, setVal8] = useState(false);
  const [v9, setVal9] = useState(false);
  const [v10, setVal10] = useState(false);
  const [v11, setVal11] = useState(false);
  const [v12, setVal12] = useState(false);
  const [v13, setVal13] = useState(false);
  const [v14, setVal14] = useState(false);
  //Room facilities checkbox
  const [r1, setRval1] = useState(false);
  const [r2, setRval2] = useState(false);
  const [r3, setRval3] = useState(false);
  const [r4, setRval4] = useState(false);
  const [r5, setRval5] = useState(false);
  const [r6, setRval6] = useState(false);
  const [r7, setRval7] = useState(false);
  const [r8, setRval8] = useState(false);
  const [r9, setRval9] = useState(false);
  const [r10, setRval10] = useState(false);
  const [r11, setRval11] = useState(false);
  const [r12, setRval12] = useState(false);
  //Accordion part
  const [rfacilityExpanded, setRfacilityExpanded] = React.useState(false);
  const [starsExpanded, setStarExpanded] = React.useState(false);
  const [facilityExpanded, setFacilityExpanded] = React.useState(false);

  // for checking search and filter start
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [filterStart, setFilterStart] = useState(false);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [searchStart, setSearchStart] = useState(false);

  // cooperation need to be changed later
  const [ht, setHt] = React.useState(false);
  const [ft, setFt] = React.useState(false);
  const [proj, setProj] = React.useState(false);
  const [remote, setRemote] = React.useState(false);
  const [star5, setStar5] = React.useState(false);
  const [unrate, setUnrate] = React.useState(false);
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Helmet bodyAttributes={{ style: "background-color : #f5f5f5" }}></Helmet>
      <Container component="main" maxWidth="lg">
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Hidden only={["lg", "xl", "md", "sm"]}>
              <Grid item xs={1}></Grid>
            </Hidden>
            <Grid item xs={10} sm={4} md={3} style={{ marginTop: "3rem" }}>
              <div style={{ position: "sticky", top: "11vh" }}>
                <Grid item xs={12}>
                  <Accordion
                    expanded={starsExpanded}
                    variant="outlined"
                    onChange={() => setStarExpanded(!starsExpanded)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownRoundedIcon
                          style={{ color: "#000000" }}
                        />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      style={{ backgroundColor: "#f5f5f5", color: "black" }}
                    >
                      <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
                        Star Ranking
                      </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails style={{ backgroundColor: "#ffffff" }}>
                      <Grid container>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              checked={ht}
                              control={<Checkbox onClick={() => setHt(!ht)} />}
                              label="1 star"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              checked={ft}
                              control={<Checkbox onClick={() => setFt(!ft)} />}
                              label="2 stars"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              checked={proj}
                              control={
                                <Checkbox onClick={() => setProj(!proj)} />
                              }
                              label="3 stars"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              checked={remote}
                              control={
                                <Checkbox onClick={() => setRemote(!remote)} />
                              }
                              label="4 stars"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              checked={star5}
                              control={
                                <Checkbox onClick={() => setStar5(!star5)} />
                              }
                              label="5 stars"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              checked={unrate}
                              control={
                                <Checkbox onClick={() => setUnrate(!unrate)} />
                              }
                              label="Unrated"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion
                    expanded={facilityExpanded}
                    variant="outlined"
                    onChange={() => setFacilityExpanded(!facilityExpanded)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownRoundedIcon
                          style={{ color: "#000000" }}
                        />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      style={{ backgroundColor: "#f5f5f5", color: "black" }}
                    >
                      <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
                        Facilities
                      </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails
                      style={{ backgroundColor: "#ffffff", paddingTop: "5%" }}
                    >
                      {/* <Autocomplete
                                            sx={{ width: '100%' }}
                                            multiple
                                            value={technologies}
                                            id="technologies"
                                            options={facility}
                                            onChange={(event, value) => { setTechnologies(value); console.log('technologies : ', technologies) }}
                                            getOptionLabel={(option) => option}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    fullWidth
                                                    required
                                                    {...params}
                                                    label="Facilities"
                                                />)}
                                        /> */}
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v1}
                            control={<Checkbox onClick={() => setVal1(!v1)} />}
                            label="Parking"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v2}
                            control={<Checkbox onClick={() => setVal2(!v2)} />}
                            label="Restaurant"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v3}
                            control={<Checkbox onClick={() => setVal3(!v3)} />}
                            label="Pets allowed"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v4}
                            control={<Checkbox onClick={() => setVal4(!v4)} />}
                            label="Room service"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v5}
                            control={<Checkbox onClick={() => setVal5(!v5)} />}
                            label="24-hour front desk"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v6}
                            control={<Checkbox onClick={() => setVal6(!v6)} />}
                            label="Fitness centre"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v7}
                            control={<Checkbox onClick={() => setVal7(!v7)} />}
                            label="Non-smoking rooms"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v8}
                            control={<Checkbox onClick={() => setVal8(!v8)} />}
                            label="Airport shuttle"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v9}
                            control={<Checkbox onClick={() => setVal9(!v9)} />}
                            label={
                              <Typography fontSize={15}>
                                Facilities for disabled guests
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v10}
                            control={
                              <Checkbox onClick={() => setVal10(!v10)} />
                            }
                            label="Family rooms"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v11}
                            control={
                              <Checkbox onClick={() => setVal11(!v11)} />
                            }
                            label="Spa and wellness centre"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v12}
                            control={
                              <Checkbox onClick={() => setVal12(!v12)} />
                            }
                            label="Free WiFi"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v13}
                            control={
                              <Checkbox onClick={() => setVal13(!v13)} />
                            }
                            label={
                              <Typography fontSize={13.62}>
                                Electric vehicle charging station
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={v14}
                            control={
                              <Checkbox onClick={() => setVal14(!v14)} />
                            }
                            label="Swimming pool"
                          />
                        </FormGroup>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion
                    expanded={rfacilityExpanded}
                    variant="outlined"
                    onChange={() => setRfacilityExpanded(!rfacilityExpanded)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownRoundedIcon
                          style={{ color: "#000000" }}
                        />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      style={{ backgroundColor: "#f5f5f5", color: "black" }}
                    >
                      <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
                        Room Facilities
                      </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails
                      style={{ backgroundColor: "#ffffff", paddingTop: "5%" }}
                    >
                      {/* <Autocomplete
                                            sx={{ width: '100%' }}
                                            multiple
                                            value={technologies}
                                            id="technologies"
                                            options={facility}
                                            onChange={(event, value) => { setTechnologies(value); console.log('technologies : ', technologies) }}
                                            getOptionLabel={(option) => option}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    fullWidth
                                                    required
                                                    {...params}
                                                    label="Facilities"
                                                />)}
                                        /> */}
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r1}
                            control={<Checkbox onClick={() => setRval1(!r1)} />}
                            label="Kitchen/kitchenette"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r2}
                            control={<Checkbox onClick={() => setRval2(!r2)} />}
                            label="Private bathroom"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r3}
                            control={<Checkbox onClick={() => setRval3(!r3)} />}
                            label="Air conditioning"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r4}
                            control={<Checkbox onClick={() => setRval4(!r4)} />}
                            label="Desk"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r5}
                            control={<Checkbox onClick={() => setRval5(!r5)} />}
                            label="Bath"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r6}
                            control={<Checkbox onClick={() => setRval6(!r6)} />}
                            label="Balcony"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r7}
                            control={<Checkbox onClick={() => setRval7(!r7)} />}
                            label="Flat-screen TV"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r8}
                            control={<Checkbox onClick={() => setRval8(!r8)} />}
                            label="Washing machine"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r9}
                            control={<Checkbox onClick={() => setRval9(!r9)} />}
                            label="View"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r10}
                            control={
                              <Checkbox onClick={() => setRval10(!r10)} />
                            }
                            label="Electric kettle"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r11}
                            control={
                              <Checkbox onClick={() => setRval11(!r11)} />
                            }
                            label="Coffee/tea maker"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            checked={r12}
                            control={
                              <Checkbox onClick={() => setRval12(!r12)} />
                            }
                            label="Coffee machine"
                          />
                        </FormGroup>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginBottom: "2rem", marginTop: "1rem" }}
                >
                  <Button
                    fullWidth
                    style={{ backgroundColor: "#cd9a2d", color: "white" }}
                    type="submit"
                    variant="contained"
                  >
                    Search
                  </Button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={filterStart || searchStart}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress
                        size="3rem"
                        style={{ color: "#000000" }}
                      />
                    </Box>
                  </Backdrop>
                </Grid>
              </div>
            </Grid>
            <Hidden only={["lg", "xl", "md", "sm"]}>
              <Grid item xs={1}></Grid>
            </Hidden>
            <Grid item xs={12} sm={8} md={9}>
              <Card style={{ marginTop: "3rem" }}>
                <Hidden only={["xs", "sm"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image1}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={9} md={6}>
                        <Grid container style={{}}>
                          <Grid item xs={12}>
                            <Typography
                              variant="h5"
                              style={{
                                fontWeight: "bold",
                                textAlign: "justify",
                              }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                The Landmark London
                              </Link>
                              <Rating
                                name="read-only"
                                value={value2}
                                readOnly
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Link>
                              <Typography style={{ textAlign: "left" }}>
                                Westminster Borough, London
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              style={{ textAlign: "left", marginBottom: "5px" }}
                            >
                              Metro access
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography style={{ textAlign: "left" }}>
                              In the heart of London's fashionable Marylebone,
                              this deluxe hotel has a stunning glass-roofed
                              8-story atrium with towering palm trees, an
                              award-winning restaurant, luxurious bedrooms and
                              an indoor...
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3} md={2}>
                        <Grid
                          container
                          spacing={0.5}
                          style={{ textAlign: "end" }}
                        >
                          <Grid item xs={9} style={{ textAlign: "end" }}>
                            <Typography
                              variant="h8"
                              style={{ fontWeight: "bold" }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Superb
                              </Link>
                              <Typography
                                sx={{ fontSize: 12 }}
                                style={{ color: '"#f2f2f2' }}
                              >
                                2,362 reviews
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: "end" }}>
                            <Box
                              style={{
                                backgroundColor: "#000000",
                                color: "#ffffff",
                                textAlign: "center",
                                fontWeight: "bold",
                                borderRadius: 3,
                                width: 30,
                                height: 30,
                                marginTop: "4px",
                              }}
                            >
                              <Typography style={{ textAlign: "center" }}>
                                9.0
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
                {/* <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                <Hidden only={["lg", "xl", "md"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image1}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          style={{ fontWeight: "bold", textAlign: "justify" }}
                        >
                          <Link
                            underline="hover"
                            onClick={() => window.open("_blank")}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            The Landmark London
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Rating name="read-only" value={value2} readOnly />
                      </Grid>

                      <Grid item xs={12}>
                        <Link>
                          <Typography style={{ textAlign: "left" }}>
                            Westminster Borough, London
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography style={{ textAlign: "left" }}>
                          In the heart of London's fashionable Marylebone, this
                          deluxe hotel has a stunning glass-roofed 8-story
                          atrium with towering palm trees, an award-winning
                          restaurant, luxurious bedrooms and an indoor...
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
              </Card>

              <Card style={{ marginTop: "3rem" }}>
                <Hidden only={["xs", "sm"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image2}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={9} md={6}>
                        <Grid container style={{}}>
                          <Grid item xs={12}>
                            <Typography
                              variant="h5"
                              style={{
                                fontWeight: "bold",
                                textAlign: "justify",
                              }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                The Montague Gardens
                              </Link>
                              <Rating
                                name="read-only"
                                value={value2}
                                readOnly
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Link>
                              <Typography style={{ textAlign: "left" }}>
                                Camden, London
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              style={{ textAlign: "left", marginBottom: "5px" }}
                            >
                              Metro access
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography style={{ textAlign: "left" }}>
                              Overlooking private, secluded gardens, this 4-star
                              luxury hotel offers 2 restaurants, an on-site gym
                              and 2 sun rooms. Russell Square Underground
                              Station is a 4 minute walk away.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3} md={2}>
                        <Grid
                          container
                          spacing={0.5}
                          style={{ textAlign: "end" }}
                        >
                          <Grid item xs={9} style={{ textAlign: "end" }}>
                            <Typography
                              variant="h8"
                              style={{ fontWeight: "bold" }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Superb
                              </Link>
                              <Typography
                                sx={{ fontSize: 12 }}
                                style={{ color: '"#f2f2f2' }}
                              >
                                1,468 reviews
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: "end" }}>
                            <Box
                              style={{
                                backgroundColor: "#000000",
                                color: "#ffffff",
                                textAlign: "center",
                                fontWeight: "bold",
                                borderRadius: 3,
                                width: 30,
                                height: 30,
                                marginTop: "4px",
                              }}
                            >
                              <Typography style={{ textAlign: "center" }}>
                                9.3
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
                {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                <Hidden only={["lg", "xl", "md"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image2}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          style={{ fontWeight: "bold", textAlign: "justify" }}
                        >
                          <Link
                            underline="hover"
                            onClick={() => window.open("_blank")}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            The Montague Gardens
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Rating name="read-only" value={value2} readOnly />
                      </Grid>

                      <Grid item xs={12}>
                        <Link>
                          <Typography style={{ textAlign: "left" }}>
                            Camden, London
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography style={{ textAlign: "left" }}>
                          Overlooking private, secluded gardens, this 4-star
                          luxury hotel offers 2 restaurants, an on-site gym and
                          2 sun rooms. Russell Square Underground Station is a 4
                          minute walk away.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
              </Card>

              <Card style={{ marginTop: "3rem" }}>
                <Hidden only={["xs", "sm"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image3}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={9} md={6}>
                        <Grid container style={{}}>
                          <Grid item xs={12}>
                            <Typography
                              variant="h5"
                              style={{
                                fontWeight: "bold",
                                textAlign: "justify",
                              }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Presidential Apartments
                              </Link>
                              <Rating
                                name="read-only"
                                value={value2}
                                readOnly
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Link>
                              <Typography style={{ textAlign: "left" }}>
                                Kensington and Chelsea, London
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              style={{ textAlign: "left", marginBottom: "5px" }}
                            >
                              Metro access
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography style={{ textAlign: "left" }}>
                              On the corner of a beautiful garden square, in
                              London's prestigious Kensington, this modernised
                              period building offers spacious, air-conditioned
                              serviced apartments with free Wi-Fi.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3} md={2}>
                        <Grid
                          container
                          spacing={0.5}
                          style={{ textAlign: "end" }}
                        >
                          <Grid item xs={9} style={{ textAlign: "end" }}>
                            <Typography
                              variant="h8"
                              style={{ fontWeight: "bold" }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Good
                              </Link>
                              <Typography
                                sx={{ fontSize: 12 }}
                                style={{ color: '"#f2f2f2' }}
                              >
                                1,371 reviews
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: "end" }}>
                            <Box
                              style={{
                                backgroundColor: "#000000",
                                color: "#ffffff",
                                textAlign: "center",
                                fontWeight: "bold",
                                borderRadius: 3,
                                width: 30,
                                height: 30,
                                marginTop: "4px",
                              }}
                            >
                              <Typography style={{ textAlign: "center" }}>
                                7.9
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
                {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                <Hidden only={["lg", "xl", "md"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image3}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          style={{ fontWeight: "bold", textAlign: "justify" }}
                        >
                          <Link
                            underline="hover"
                            onClick={() => window.open("_blank")}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            Presidential Apartments
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Rating name="read-only" value={value2} readOnly />
                      </Grid>

                      <Grid item xs={12}>
                        <Link>
                          <Typography style={{ textAlign: "left" }}>
                            Kensington and Chelsea, London
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography style={{ textAlign: "left" }}>
                          On the corner of a beautiful garden square, in
                          London's prestigious Kensington, this modernised
                          period building offers spacious, air-conditioned
                          serviced apartments with free Wi-Fi.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
              </Card>

              <Card style={{ marginTop: "3rem" }}>
                <Hidden only={["xs", "sm"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image4}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={9} md={6}>
                        <Grid container style={{}}>
                          <Grid item xs={12}>
                            <Typography
                              variant="h5"
                              style={{
                                fontWeight: "bold",
                                textAlign: "justify",
                              }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Eden hotel Amsterdam
                              </Link>
                              <Rating
                                name="read-only"
                                value={value2}
                                readOnly
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Link>
                              <Typography style={{ textAlign: "left" }}>
                                Amsterdam City Centre, Amsterdam
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              style={{ textAlign: "left", marginBottom: "5px" }}
                            >
                              Metro access
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography style={{ textAlign: "left" }}>
                              Situated in the heart of the city centre, Eden
                              Hotel Amsterdam offers warm-coloured rooms and
                              free WiFi. The famous Rembrandt Square is right
                              around the corner.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3} md={2}>
                        <Grid
                          container
                          spacing={0.5}
                          style={{ textAlign: "end" }}
                        >
                          <Grid item xs={9} style={{ textAlign: "end" }}>
                            <Typography
                              variant="h8"
                              style={{ fontWeight: "bold" }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Fabulous
                              </Link>
                              <Typography
                                sx={{ fontSize: 12 }}
                                style={{ color: '"#f2f2f2' }}
                              >
                                938 reviews
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: "end" }}>
                            <Box
                              style={{
                                backgroundColor: "#000000",
                                color: "#ffffff",
                                textAlign: "center",
                                fontWeight: "bold",
                                borderRadius: 3,
                                width: 30,
                                height: 30,
                                marginTop: "4px",
                              }}
                            >
                              <Typography style={{ textAlign: "center" }}>
                                8.6
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
                {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                <Hidden only={["lg", "xl", "md"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image2}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          style={{ fontWeight: "bold", textAlign: "justify" }}
                        >
                          <Link
                            underline="hover"
                            onClick={() => window.open("_blank")}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            The Montague Gardens
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Rating name="read-only" value={value2} readOnly />
                      </Grid>

                      <Grid item xs={12}>
                        <Link>
                          <Typography style={{ textAlign: "left" }}>
                            Camden, London
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography style={{ textAlign: "left" }}>
                          Overlooking private, secluded gardens, this 4-star
                          luxury hotel offers 2 restaurants, an on-site gym and
                          2 sun rooms. Russell Square Underground Station is a 4
                          minute walk away.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
              </Card>

              <Card style={{ marginTop: "3rem" }}>
                <Hidden only={["xs", "sm"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image5}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={9} md={6}>
                        <Grid container style={{}}>
                          <Grid item xs={12}>
                            <Typography
                              variant="h5"
                              style={{
                                fontWeight: "bold",
                                textAlign: "justify",
                              }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Hotel Estheréa
                              </Link>
                              <Rating
                                name="read-only"
                                value={value2}
                                readOnly
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Link>
                              <Typography style={{ textAlign: "left" }}>
                                Amsterdam City Centre, Amsterdam
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              style={{ textAlign: "left", marginBottom: "5px" }}
                            >
                              Metro access
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography style={{ textAlign: "left" }}>
                              Hotel Estheréa is set along the Singel canal in
                              the centre of Amsterdam, only 300 metres from Dam
                              Square. This hotel is in a quiet area and benefits
                              from classically-styled decor with wooden
                              paneling....
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3} md={2}>
                        <Grid
                          container
                          spacing={0.5}
                          style={{ textAlign: "end" }}
                        >
                          <Grid item xs={9} style={{ textAlign: "end" }}>
                            <Typography
                              variant="h8"
                              style={{ fontWeight: "bold" }}
                            >
                              <Link
                                underline="hover"
                                onClick={() => window.open("_blank")}
                                style={{ color: "black", cursor: "pointer" }}
                              >
                                Superb
                              </Link>
                              <Typography
                                sx={{ fontSize: 12 }}
                                style={{ color: '"#f2f2f2' }}
                              >
                                2,508 reviews
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: "end" }}>
                            <Box
                              style={{
                                backgroundColor: "#000000",
                                color: "#ffffff",
                                textAlign: "center",
                                fontWeight: "bold",
                                borderRadius: 3,
                                width: 30,
                                height: 30,
                                marginTop: "4px",
                              }}
                            >
                              <Typography style={{ textAlign: "center" }}>
                                9.2
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
                {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                <Hidden only={["lg", "xl", "md"]}>
                  <CardContent style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} style={{ alignSelf: "center" }}>
                        <Grid container className="hotelcard-container">
                          <Avatar
                            className="hotel-img"
                            sx={{ width: "100%", height: "150%" }}
                            variant="rounded"
                            src={image5}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          style={{ fontWeight: "bold", textAlign: "justify" }}
                        >
                          <Link
                            underline="hover"
                            onClick={() => window.open("_blank")}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            Hotel Estheréa
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Rating name="read-only" value={value2} readOnly />
                      </Grid>

                      <Grid item xs={12}>
                        <Link>
                          <Typography style={{ textAlign: "left" }}>
                            Amsterdam City Centre, Amsterdam
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography style={{ textAlign: "left" }}>
                          Hotel Estheréa is set along the Singel canal in the
                          centre of Amsterdam, only 300 metres from Dam Square.
                          This hotel is in a quiet area and benefits from
                          classically-styled decor with wooden paneling....
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Grid container>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              style={{
                                backgroundColor: "#cd9a2d",
                                color: "#FFFFFF",
                                textTransform: "unset",
                              }}
                            >
                              Show Prices
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Hidden>
              </Card>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Container>
    </div>
  );
}
