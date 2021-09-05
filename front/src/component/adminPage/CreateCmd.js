import { makeStyles } from "@material-ui/core";
import React from "react";
import "./style.css";

const CreatCmd = () => {
    const classes = useStyles();

    return (
        <div style={{justifyContent:'center',display: "flex",alignItems:'center',flexDirection:'column'}}>
         <h1 style={{marginTop:20}}>   Admin page</h1>
            <div className={classes.container}>
                <input
                    style={{ margin: 10 }}
                    placeholder='California Pizza'
                />

                <input
                    style={{ margin: 10 }}

                    placeholder='Pizza, Fast food'
                />
                <input
                    style={{ margin: 10 }}

                    placeholder='prix'
                />
                <input
                    style={{ margin: 10 }}

                    placeholder='debut'
                />
                <input
                    style={{ margin: 10 }}

                    placeholder='nombre de start'
                />
                <input
                    style={{ margin: 10 }}

                    placeholder='temps de préparation'
                />
            </div>
                <button style={{margin:20}}> comfirmer </button>
        </div>
    );
}

export default CreatCmd;

const useStyles = makeStyles((theme) => {
    return {
        container: {
            flexDirection: "column",
            display: "flex",
            padding: 10,
            width: '50%',
            backgroundColor:'#cddc'


        },
    }
})