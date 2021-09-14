import {  Button, makeStyles } from "@material-ui/core";
import React, {  useState } from "react";
import {Fade  } from "@material-ui/core";
import Formulaire from "../Fomulaire/Formulaire";

import "./menu.css";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => {
  return {
    signUpBtn: {
      backgroundColor: "black !important",
      fontSize:'15px',
      textTransform:'none', 
      color:'white !important' , 
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    paperSignUpBtn:{
      backgroundColor: "black !important",
      color:'white !important' , 
      textTransform:'none', 
      width: "60% "
      

    },
    formClosed: {
      display: "none",
    },

    formContainer: {
      position: "fixed !important",
      top: 0,
      left: 0,
      height: "100% !important",
      width: "100%  !important",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      backgroundColor: "#01010150",
    },
    closeBtnForm: {
      position: "absolute",
      top: 15,
      right: 15,
      fontSize: "30px",
      color: "#fff",
      [theme.breakpoints.down('sm')]:{
        top: 5,
        right: 10,
        fontSize: "20px",
      }
    },
  };
});



const SignUpBtn = ({ nomClass }) => {
  const classes = useStyles();
  const [showLogin, setShowLogin] = useState(false);
  const [FadeEnter, setFadeEnter] = useState(false);

 
  const history = useHistory()



  const handelSignUpClick = () => {
    // setShowLogin(!showLogin);
    // setFadeEnter(true);
    history.push("/connexion")

  };
  const handelCloseLogin = () => {
    setTimeout(() => {
      setShowLogin(false);
    }, 350);

    setFadeEnter(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className={
          nomClass === "signUpBtn" ? classes.signUpBtn : classes.paperSignUpBtn
        }
        onClick={handelSignUpClick}
      >
        Se connecter
      </Button>

      {showLogin && (
        <Fade in={FadeEnter}>
          <div
            className={showLogin ? classes.formContainer : classes.formClosed}
          >
          
            {/* <Formulaire /> */}
            <Button onClick={handelCloseLogin} className={classes.closeBtnForm}>
              X
            </Button>
          </div>
        </Fade>
      )}
    </React.Fragment>
  );
};

export default SignUpBtn;
