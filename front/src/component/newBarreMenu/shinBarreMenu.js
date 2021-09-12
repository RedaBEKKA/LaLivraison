import BoutonSignUp from "../newBarreMenu/BoutonSignUp";
import "./menu.css";
import Search from "../BarreDeRecherche/Search";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  useMediaQuery,
  Collapse,
  makeStyles,
  Toolbar,
  Avatar,
  Button,
} from "@material-ui/core";
import ShinMenu from "./shinMenu";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const useStyles = makeStyles((theme) => {
  return {
    vide: {
      /**j ai de besoin de cette classes vide  */
    },
    appBarInitial: {
      padding: 0,
      width: "100%",
      height: 80,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "fixed",
      background: "transparent",
    },
    animatetransParentToWhite: {
      animation: `transParentToWhite  linear `,
      animationDuration: "500ms",
      height: 90,
      backgroundColor: "white",
    },
    animatewhiteToTransparent: {
      animation: `whiteToTransparent  linear `,
      animationDuration: "500ms",
      height: 90,
    },

    "@global": {
      "@keyframes transParentToWhite": {
        "  0% ": { backgroundColor: "transparent" },
        "100% ": { backgroundColor: "white" },
      },
      "@keyframes whiteToTransparent": {
        "  0% ": { backgroundColor: "white" },
        "100% ": { backgroundColor: "transparent" },
      },
    },
    menuBarre: {
      width: "97%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "auto",
    },
    BtnSignUp: {
      backgroundColor: "red !important",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },

    nom_profil:{
       
      marginLeft:'15px' ,
      color:'red' , 
     
      [theme.breakpoints.down("sm")]: {
        fontSize:'14px' ,   
      color:'black'    },

    } , 
  };
});

const ShinBarreMenu = ({}) => {
  const classes = useStyles();
  const [fadeAnimation, setFadeAnimation] = useState(false);
  const [animateChampText, setAnimateChampText] = useState(false);
  const [animateAppBar, setAnimateAppBar] = useState(classes.vide);
  const [nomLogo, setNomLogo] = useState("nomApp");
  const mediaquery = useMediaQuery("(max-width:600px)");

  const scroller = () => {
    if (window.pageYOffset > 50) {
      setAnimateAppBar(classes.animatetransParentToWhite);
      setFadeAnimation(true);
      setNomLogo("nomAppBlack");
    } else {
      if (animateAppBar === classes.animatetransParentToWhite) {
        setAnimateAppBar(classes.animatewhiteToTransparent);
      }

      setFadeAnimation(false);
      setNomLogo("nomApp");
    }

    if (window.pageYOffset > 600) {
      setAnimateChampText(true);
    } else {
      setAnimateChampText(false);
    }
  };

  window.addEventListener("scroll", scroller);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/"); 

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      className={`${animateAppBar} ${classes.appBarInitial} `}
      elevation={0}
    >
      <Toolbar className={classes.menuBarre}>
        <ShinMenu nomLogo={nomLogo}  user={user} Logout={logout}/>

        <div id="champTextContainer">
          {
            <Collapse in={animateChampText} direction="up">
              <Search divClassName="rechercheMenu" inputClassName="inputMenu" />
            </Collapse>
          }
        </div>

        {user?.result ? (
          <div style={{ display: "flex" , flexDirection :'row' , alignItems:'center' , width:'auto' }}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={null}
            >
              {user?.result.fullName.charAt(0)}
            </Avatar>
            {/* <div className={classes.nom_profil}> {user?.result.fullName} </div> */}

            {mediaquery ? null : (
              <Button onClick={logout} style={{ backgroundColor: "black" ,color:'white' , marginLeft :'15px' , fontSize:'15px',textTransform:'none'}}>
                {" "}
                se deconnecter{" "}
              </Button>
            )}
          </div>
        ) : (
          <BoutonSignUp nomClass="signUpBtn" />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ShinBarreMenu;
