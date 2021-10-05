import BoutonSignUp from "../newBarreMenu/BoutonSignUp";
import "./menu.css";
import Search from "../BarreDeRecherche/Search";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { createTheme } from '@material-ui/core/styles';
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

import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { dispatchLogin, fetchUser, dispatchGetUser ,} from '../../redux/actions/authAction'


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

    nom_profil: {

      marginLeft: '15px',
      color: 'red',

      [theme.breakpoints.down("sm")]: {
        fontSize: '14px',
        color: 'black'
      },

    },
  };
});



const ShinBarreMenu = ({ }) => {
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

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)

  const auth = useSelector(state => state.auth)

  // console.log(`auth`, auth)
  // console.log(`token auth`, token)
  const { user, isLogged } = auth


  const handleLogout = async () => {
    try {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    } catch (err) {
        window.location.href = "/";
    }
}
  const userLink = () => {
    return (

      <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
        <li>
          <Link to='/'>
            <img src={user.avatar} alt='' /> {user.fullName}
          </Link>
        
        </li>
        <ul className="dropdown" style={{ display: "flex", flexDirection: 'row' }}>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/"  onClick={handleLogout}  >Logout</Link></li> 
           
         </ul>
      </div>

    )
  }
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post('/user/refreshtoken', null)
       // console.log(`res resresresresresresres`, res)
       // console.log(`token`, token)
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
      }
      getToken()
    }
  }, [auth.isLogged, dispatch])


  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin())
        const res = fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res));
        })
        // console.log(`token 2 fetchUser`, token)
        // console.log(`res res res res  `, res )        
      }
      getUser()
    }
  }, [token, dispatch])

  // useEffect(() => {
  //   if (token) {
  //     const getRestaurants = () => {
  //       dispatch(dispatchLogin())
  //       const res = fetchUser(token).then(res => {
  //         dispatch(dispatchGetUser(res));
  //       })
  //       // console.log(`token 2 fetchUser`, token)
  //       // console.log(`res res res res  `, res )        
  //     }
  //     getRestaurants()
  //   }
  // }, [token, dispatch])

  return (
    <AppBar
      className={`${animateAppBar} ${classes.appBarInitial} `}
      elevation={0}
    >
      <Toolbar className={classes.menuBarre}>
        <ShinMenu nomLogo={nomLogo}
        // User={User} 
        // Logout={logout} 
        />

        <div id="champTextContainer">
          {
            <Collapse in={animateChampText} direction="up">
              <Search divClassName="rechercheMenu" inputClassName="inputMenu" />
            </Collapse>
          }
        </div>


        {isLogged ? userLink()


          : (
            <BoutonSignUp nomClassName="signUpBtn" />
          )}
      </Toolbar>
    </AppBar>
  );
};

export default ShinBarreMenu;






























  // useEffect(() => {
  //   const token = User?.token;

  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);
            //  <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', width: 'auto' }}>

          //  </div>

          //   {/* </div> */}
          //   {/* <Avatar
          //     className={classes.purple}
          //     alt={isLogged?.user.name}
          //     src={null}
          //   > */}
          //   {/* {User?.result.fullName.charAt(0)} */}
          //   {/* </Avatar> */}
          //   {/* <div className={classes.nom_profil}> {User?.result.fullName} </div> */}

          //   {/* {mediaquery ? null : (
          //     <Button onClick={logout} style={{ backgroundColor: "black", color: 'white', marginLeft: '15px', fontSize: '15px', textTransform: 'none' }}>
          //       {" "}
          //       se deconnecter{" "}
          //     </Button>
          //   )} */}

            // const [User, setUser] = useState(JSON.parse(localStorage.getItem("firstLogin")));



  // const logout = () => {
  //   dispatch({ type: "LOGOUT" });

  //   history.push("/");

  //   setUser(null);
  // };