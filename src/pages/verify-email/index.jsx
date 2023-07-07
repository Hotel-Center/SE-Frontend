/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Helmet from "react-helmet";
import Image from "next/image";

export default function Verify() {
  return (
    <div>
      <Helmet bodyAttributes={{ style: "background-color : #f5f5f5" }}></Helmet>
      <Container
        component="main"
        maxWidth="md"
        style={{ alignItems: "center" }}
      >
        <Box
          className="verify-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 6,
            flexGrow: 1,
            justifyContent: "center",
          }}
          style={{
            backgroundColor: "#ffffff",
            marginTop: "20vh",
          }}
        >
          <Grid container style={{ padding: "10px", justifyContent: "center" }}>
            <Grid item style={{ textAlign: "center", padding: "10px" }} xs={12}>
              <Typography variant="h5">
                Thanks for signing up in our website!
              </Typography>
            </Grid>
            {/* <Grid item xs={12} style={{justifyContent:'center'}}> */}
            <div className="verify-img">
              <Image src="/img/pics/opened.svg" width={200} height={200} />
            </div>
            {/* </Grid> */}
            <Grid item style={{ textAlign: "center", padding: "10px" }} xs={12}>
              <Typography variant="h7">
                We're happy you're here!Please check your inboxes and verify
                your email.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
