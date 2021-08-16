import { Input ,makeStyles } from "@material-ui/core";
import React from 'react';
//import "./style.css";

const useStyles =makeStyles((theme) => ({
  
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',alignItems: 'center',
        height: "40px !important",
        
    }
    ,input:{
        
      width:"310px " , 
      padding:" 7px 10px",
      borderColor: "transparent",
      boxShadow: " inset 2px 2px 5px #BABECC, inset -5px -5px 10px #fff"  , 
      transition: 'all 0.2s ease-in-out',
      appearance: "none",
      fontSize:"17px" ,    
      outline: "transparent",
      borderRadius: "20px",
    }
    ,    
    paragrapheVisble:{
       fontSize: "11px",
        color: 'red',
        alignSelf:' flex-start' , 
        marginLeft:'20px ', 
        transform :'translateY(0px)'
    } ,
     paragrapheHidden:{
        fontSize: "11px",
        color: 'transparent',
        alignSelf:' flex-start' , 
        marginLeft:'20px ', 
        transform :'translateY(0px)'
     }
    
    
   
   
   })) ; 

const NewInput = ({
  name,
  handelChange,
  label,
  autoFocus,
  type,
  helperText,
  error,
}) => {
    const classes = useStyles() ; 
  return (
    <div className={classes.container}>
      <Input
        className={classes.input}
        type={type}
        name={name}
        onChange={handelChange}
        placeholder={label}
        size="large"
        disableUnderline={true}
        autoFocus={autoFocus}
      />
      <p className={ error ? classes.paragrapheVisble : classes.paragrapheHidden}>
       
         {  helperText } 
      </p>
    </div>
  ) ; 
};

export default NewInput;
