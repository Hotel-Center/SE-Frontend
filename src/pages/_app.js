import "../components/AdminPanel/style/adminpanel.scss";
import "../components/AdminPanel/style/widget.scss";
import "../components/AdminPanel/style/chart.scss";
import "../components/AdminPanel/style/roomStatus.scss";
import "../components/AdminPanel/style/chatBox.scss";
import "../css/Navbar.css";
import "../css/Homepage.css";
import "../css/Verify.css";
import "../css/Average_rating.css";
import "../css/Profile.css";
import "../css/IncreaseCredit.css";
import "../css/Favorites.css";
import "../css/Reserve.css";
import "../css/Hotelpage.css";
import "../css/Hotelpage2.css";
import "../css/Edithotel.css";
import "../css/Edithotel.css";
import "../css/Chat.css";
import "../css/NewAndTopHotels.css";

import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/layout";
// import { NextScript } from "next/document";

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
          crossorigin="anonymous"
        ></Script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  ) : null;
}
