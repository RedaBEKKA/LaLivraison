import { Button, Typography } from "@material-ui/core";
import React, { useState , useEffect} from "react";
import { useDispatch ,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { inscrireAction, authentifierAction } from "../../redux/actions/user";
import useStyles from "./styles";
import NewInput from "./newInput";

//const photoUrl = process.env.PUBLIC_URL + "images/register.svg";
const initialForm = { fullName: "", telephone: "", motDePasse: "" };

//variables
var telOk = false;
var nomOk = false;
var mdpOk = false;
var confirmMdpOk = false;
var telError = false;
var nomError = false;
var mdpError = false;

////REGEX ///

const passwordRegex = /^(?=.*\d)([a-zA-Z\d]{8,})$/; //
const nameRegex = /^([a-zA-Z]+[ ]?|[a-zA-Z]+['-]?[])+$/;
const numRegex = /(0|\+213)[5-7]([0-9]{2}){4}$/;

const helperTel = "le numero doit etre composé de 10 chiffre";
const helperName = "require un nom valide";
const helperMdp = "exemple de mot de passe valide :145Badios# ";
const helperConfirmPassword = "mot de passe different";

const Formulaire = () => {
  //styles
  const classes = useStyles();

  //react -redux
  const dispatch = useDispatch();
  const selector = useSelector( state => state)
 
  //react router
  const history = useHistory();

  //states
  const [informations, setInformations] = useState(initialForm);
  const [confirmMdpError, setConfirmMdpError] = useState(false);
  const [errorServer , setErrorServer] = useState(false) ; 
  const [slideClass, setSlideClass] = useState(null);
  const [seConnecter, setSeconnecter] = useState(true); // false ==> inscrire
  const [mdpConfirmation, setMdpConfirmation] = useState("");

  useEffect(()=>{
      setErrorServer(false)
  },[seConnecter])


  // functions
  const handelChange = (e) => {
    switch (e.target.name) {
      case "fullName":
        {
          {
            if (e.target.value === "") {
              nomError = false;
              nomOk = false;
            } else if (nameRegex.test(e.target.value)) {
              nomError = false;
              nomOk = true;
            } else {
              nomError = true;
              nomOk = false;
            }
          }
        }
        break;
      case "telephone":
        {
          if (e.target.value === "") {
            telError = false;
            telOk = false;
          } else if (numRegex.test(e.target.value)) {
            telError = false;
            telOk = true;
          } else {
            telError = true;
            telOk = false;
          }
        }
        break;
      case "motDePasse":
        {
          if (e.target.value === "") {
            mdpError = false;
            mdpOk = false;
          } else if (passwordRegex.test(e.target.value)) {
            mdpError = false;
            mdpOk = true;
          } else {
            mdpError = true;
            mdpOk = false;
          }
        }
        break;
      case "confirmedPassword":
        {
          {
            setMdpConfirmation(e.target.value);
            if (e.target.value === "") {
              confirmMdpOk = false;
              setConfirmMdpError(false);
            }
          }
        }
        break;
      default:
        break;
    }

    if (seConnecter) {
      nomOk = true;
    }
    setInformations({ ...informations, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (seConnecter) {
      confirmMdpOk = true;
    } else {
      if (informations.motDePasse === mdpConfirmation) {
        confirmMdpOk = true;
        setConfirmMdpError(false);
      } else {
        confirmMdpOk = false;
        setConfirmMdpError(true);
      }
    }

    let result = telOk && nomOk && mdpOk && confirmMdpOk;

    if (result) {
      setErrorServer(true)
      if (seConnecter) {
        dispatch(
          authentifierAction(
            {
              telephone: informations.telephone,
              motDePasse: informations.motDePasse,
            },
            history
          )
        );
      } else {
        dispatch(
          inscrireAction({ ...informations, dateCreation: new Date() }, history)
        );
      }
    }
  };

  const handelClassChanges = () => {
    if (slideClass === null) {
      setSlideClass(classes.sliderAnimatedLeftToRight);
    } else {
      if (slideClass === classes.sliderAnimatedRightToLeft) {
        setSlideClass(classes.sliderAnimatedLeftToRight);
      } else {
        setSlideClass(classes.sliderAnimatedRightToLeft);
      }
    }

    setTimeout(() => {
      setSeconnecter(!seConnecter);
    }, 750);
  };

  return (
    <div className={classes.container} id="container">
      <div className={`${classes.slider} ${slideClass}`}>
        <div className={classes.slideText}>
          <h2> {seConnecter ? "Bienvenue" : "Comment vas-tu"}</h2>
          <p className={classes.TextP} >
            {seConnecter
              ? "venez avec nous en enfer et cree un compte "
              : "vous etes deja inscrit , alors connectez vous "}
          </p>
        </div>
        <Button
          variant="contained"
          onClick={handelClassChanges}
          className={classes.bouton}
        >
          {seConnecter ? "inscription" : "connexion"}
        </Button>
      </div>
      <div className={classes.insciptionPart}>
        <Typography className={classes.titreInscrption}>
          {seConnecter ? "connectez-vous" : "Inscrivez-vous"}
        </Typography>
        <form className={classes.inscForm} onSubmit={handelSubmit}>
          <div
            className={
              seConnecter ? classes.InputsdivAuth : classes.InputdivInsc
            }
          >
            {!seConnecter && (
              <NewInput
                name="fullName"
                label="   full Name"
                handelChange={handelChange}
                type="text"
                error={nomError}
                //  helperText={nomError ?  helperName : null}
                helperText={helperName}
              />
            )}
            <NewInput
              name="telephone"
              label="   Email"
              handelChange={handelChange}
              type="text"
              error={telError}
              //  helperText={telError ? helperTel : null}
              helperText={helperTel}
            />
            <div className={classes.forgotPassword}>
              <NewInput
                name="motDePasse"
                label="   Mot de passe "
                handelChange={handelChange}
                error={mdpError}
                type="password"
                //  helperText={mdpError ?  helperMdp : null}
                helperText={helperMdp}
              />

              {seConnecter && (
                <button
                  type="button"
                  variant="text"
                  style={{
                    fontSize: "11",
                    color: "black",
                    background: "#fff",
                    marginTop: "5px",
                    padding: 5,
                    borderRadius: "8px",
                    transform: "translateY(5px)",
                 
               
                  }}
                >
                  mot de passe oublié
                </button>
              )}
            </div>
            {!seConnecter && (
              <div className={classes.confirmMdp}>
                <NewInput
                  name="confirmedPassword"
                  label="   Confirmation mot de passe"
                  type="password"
                  handelChange={handelChange}
                  error={confirmMdpError}
                  // helperText={confirmMdpError ? helperConfirmPassword : null}
                  helperText={helperConfirmPassword}
                />
              </div>
            )}
          </div>
          <Button variant="contained" className={classes.bouton} type="submit">
            Envoyer
          </Button>
        </form>
         
         { errorServer ? 
         <p style={{color:'red'}}>{ selector.userReducer.erreur}</p>
         : null
         }
        
      </div>
    </div>
  );
};
export default Formulaire;
// devlopor
