import React from "react";
import { makeStyles } from "@material-ui/core";
import ChatBot from "../chatBot/ChatBot";
import Carouselle from "../Carouselle";
import ShinBarreMenu from "../newBarreMenu/shinBarreMenu";
import AllServices from "../nosService/allServices";
import SectionPartenaires from "../partenaire/SectionPartenaires";
import DownloadMobile from "../downloadMobile/DownloadMobile";
import BarreDeRecherche from "../BarreDeRecherche/BarreRecherche";
import Footer from "../footer/Footer";

const useStyles = makeStyles((theme) => {
  return {
    barre: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: "auto",
      position: "absolute",
      top: "50%",
      left: 0,

      [theme.breakpoints.down("xs")]: {
        minWidth: 350,
        width: "100%",
      },

      [theme.breakpoints.only("sm")]: {
        width: "100%",
      },
    },
  };
});

function LandingPage() {
  const classes = useStyles();
  return (
    <div style={{ minWidth: 350 }}>
      <ChatBot />
      <div className={classes.carousel}>
        <Carouselle />

        <div className={classes.barre}>
          {" "}
          <BarreDeRecherche />{" "}
        </div>
      </div>

      <div className="App">
        <ShinBarreMenu />
        <AllServices />
        <SectionPartenaires />

        <DownloadMobile />
        <Footer />

      </div>
    </div>
  );
}

export default LandingPage;
