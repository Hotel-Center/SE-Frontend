import { lightTheme } from "src/theme/theme";
import "../components/AdminPanel/style/adminpanel.scss";
import "../components/AdminPanel/style/chart.scss";
import "../components/AdminPanel/style/chatBox.scss";
import "../components/AdminPanel/style/roomStatus.scss";
import "../components/AdminPanel/style/widget.scss";
import "../css/Average_rating.css";
import "../css/Chat.css";
import "../css/Edithotel.css";
import "../css/Favorites.css";
import "../css/Homepage.css";
import "../css/Hotelpage.css";
import "../css/Hotelpage2.css";
import "../css/IncreaseCredit.css";
import "../css/Navbar.css";
import "../css/NewAndTopHotels.css";
import "../css/Profile.css";
import "../css/Reserve.css";
import "../css/Verify.css";

import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <>
      <Head>
        <title>Hotel Center</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="bootstrap-cdn"
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
        ></Script>
      </Head>
      <ThemeProvider theme={lightTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  ) : null;
}
