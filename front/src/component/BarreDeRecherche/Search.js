import {makeStyles,Button} from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import { useState } from "react";
import './barreRecherche.css'


const useStyles=makeStyles({
    icons:{
       
        backgroundColor:'#fff', 
        color :"black !important" ,
        width:30,
        maxHeight:60
    
    } ,

    icons_menu :{
        color :"black !important" ,
        width:30,
        height:'55px !important',
        backgroundColor:"#f1f1f1" ,
        marginLeft:'auto !important',
    
    },
    clear :{
        height:60,
        backgroundColor:'inherit',
        textTransform:'none',
        '&:hover':{
            backgroundColor:'#f1f1f1',


        }
    },  clearMenu :{
        height:55,
        borderRadius:'0' , 
        backgroundColor:'#f1f1f1 !important',
        padding:10,
        textTransform:'none',
        width:'15% !important',
        border:0 , 
       
    }
   
})



function Search({divClassName,inputClassName ,clearClassName='clearMenu' ,onChangeValue ,valeur}) {

    const classes=useStyles() ; 
    const [val,setVal]=useState('') ; 
    const  handelChange=(e)=>{   
      
        setVal(e.target.value) ; 
       }


       
return (

    <div className={divClassName}> 
  
    <RoomIcon className={   divClassName === "rechercheMenu" ? classes.icons_menu : classes.icons} />
    <input type='text'  value={val} onChange={handelChange} className={inputClassName} placeholder="Saisissez votre adresse ..." />
   
    <Button className={clearClassName === 'clear' ? classes.clear : classes.clearMenu }  variant='text' onClick={(e)=>{ e.preventDefault(); setVal('') ; }}>effacer</Button>
    </div>
) ;
   
}


export default Search