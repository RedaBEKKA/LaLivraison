import {makeStyles,Paper,Slide} from '@material-ui/core'
import { IconButton ,Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from "react"
import CloseIcon from '@material-ui/icons/Close';
import './menu.css'
import BoutonSignUp from "../newBarreMenu/BoutonSignUp";



const useStyles =makeStyles(theme=>{
  return {
    voile:{
    position: 'absolute', top: 0, left: 0,
    height:'100%' ,
    width:'100%' ,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'fixed',
    zIndex:10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    }
    ,menu:{
        zIndex:10,
        height:'100%' ,
        width: 300,
        backgroundColor:'#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
  
        paddingTop: 15,
        paddingBottom: 15,
    
    } ,
    menuEtTitre :{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
       
    }
    ,nomAppBlack  :{ color:'#000'} 
    ,paperBtnSign:{
        height :'25%' , 
        width :'100%', 
        display :'flex' , 
        justifyContent:'center' ,
        flexDirection:'row'  , 
        alignItems :'center' , 
        [theme.breakpoints.up('sm')]:{
            display:'none' ,
        }

    }

}
    
})



const  ShinMenu=({nomLogo, user , Logout})=> {
    
  const classes=useStyles() ;
    const [showMenu,setShowMenu]=useState(false) ;
    const [animeEnter,setAnimeEnter]=useState(false) ;

    const handelClick=()=>{setShowMenu(!showMenu)  ; 
        setAnimeEnter(true) ;console.log('soeur') }


    const handelClose=()=>{
        
        setTimeout(() => {
            setShowMenu(false) ;
        }, 150);
      setAnimeEnter(false) ; } ; 


      return (
      <React.Fragment>

          <div className={classes.menuEtTitre}>
            <IconButton onClick={handelClick} >
            <MenuIcon  fontSize="large" />
           </IconButton>
           <p style={{transform:'translate(-5%,2%)'}} className={nomLogo}>BigNova<span className='span'>.Deliv</span ></p>

           </div>


         {showMenu && <Paper square={true}  className={classes.voile} onClick={handelClose}></Paper>}
 
          {showMenu &&

            <Slide in={animeEnter} direction='right' mountOnEnter unmountOnExit   >
           

        <Paper className={classes.menu} elevation={3}>
           <div>
              
              <div style={{display:"flex" , justifyContent:"space-between" ,padding:"0px 20px"}}> 
                  <h2>MENU </h2> 
                  <IconButton onClick={handelClose} >
                   <CloseIcon size="large" style={{color:'black'}} />
                  </IconButton>
              </div>

            <ul >
                <li><a href='otherPages/Home.html' className='lien' >Home</a></li>
                <li> <a href='otherPages/AboutUs.html' className='lien'>About</a></li> 
                <li><a href='otherPages/contact.html' className='lien'>Contact</a></li>
                <li><a href='otherPages/blog.html' className='lien'>Blog</a></li>
            </ul>
            </div>
            <Paper className ={classes.paperBtnSign}>


                {user?.result ? 
                <Button onClick={Logout} style={{ backgroundColor: "black" ,color:'white' ,width:'60%', fontSize:'15px',textTransform:'none'}}>se Deconnecter</Button>
                :
                <BoutonSignUp nomClass='paperSignUpBtn'/>

                }
           


            </Paper>
           
            </Paper>
            </Slide> 
            
            
            }
        
      </React.Fragment>

      ) ; 


}



export default ShinMenu