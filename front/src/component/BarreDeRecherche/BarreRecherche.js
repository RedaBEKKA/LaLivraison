import { makeStyles, Button, Select, MenuItem } from "@material-ui/core";

import { useState } from "react";
import "./barreRecherche.css";
import Search from "./Search";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      margin: 5,
      width: 800,
      zIndex: 1,
      // backgroundColor:"#fff",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "auto" /**40 */,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 1,
      },
    },
    icons: {
      backgroundColor: "#fff",
      width: 30,
      height: 60,
    },
    select: {
      width: 180,
      height: 60,
      margin: 10,
      paddingLeft: 10,
      backgroundColor: "#fff",

      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    bouton: {
      height: 62,
      width: 150,
      backgroundColor: "black !important",
      color: "white",
      textTransform: "none",
      fontSize: "18px ",

      [theme.breakpoints.down("sm")]: {
        marginTop: 20,
      },
    },
    menuItem: {
      backgroundColor: "#784512 ",
    },
  };
});

function BarreDeRecherche({ onChangeValue, valeur }) {
  const [selectValue, setSelectValue] = useState(1);
  const [val, setVal] = useState("");

  const updateItem = (e) => {
    let val = e.target.value;
    setSelectValue(val);
  };

  const classes = useStyles();

  return (
    <div>
      <form className={classes.container}>
        <Search
          divClassName="recherche"
          inputClassName="input"
          clearClassName="clear"
        />

        <Select
          value={selectValue}
          onChange={updateItem}
          className={classes.select}
          style={{color:'black' }}
        >
          <MenuItem value="1" style={{ backgroundColor: "#fff" }}>
            Livrer Maintenant
          </MenuItem>
          <MenuItem value="2" style={{ backgroundColor: "#fff" }}>
          
            Planifier Apres
          </MenuItem>
        </Select>
      

        <Button className={classes.bouton}>Order now</Button>
      </form>
    </div>
  );
}

export default BarreDeRecherche;
