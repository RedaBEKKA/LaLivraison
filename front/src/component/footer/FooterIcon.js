import {IconButton,makeStyles} from '@material-ui/core'
import React from 'react';









const FooterIcon=({url})=>{
    const useStyles=makeStyles({

        btn:{
           borderRadius:'100%' , 
           backgroundImage:`url(${url})`,
           backgroundSize:'cover',
           backgroundRepeat:'no-repeat',
           margin:5
            }
        
        }) ;

    const classes=useStyles() ;

    return (
        <React.Fragment>

         <IconButton className={classes.btn} size='large'>
         </IconButton>


        </React.Fragment>
    ) ;

}


export default FooterIcon ; 



import React from "react";
import {Grid,makeStyles,Container, Button,Typography, Paper} from '@material-ui/core'
import SettingsPhoneRoundedIcon from '@material-ui/icons/SettingsPhoneRounded';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FooterIcon from './FooterIcon'

const urlFacebook =process.env.PUBLIC_URL+'/images/icons/fb.png' ;
const urlInsta =process.env.PUBLIC_URL+'/images/icons/instagram.png'  ;
const urlGoogle =process.env.PUBLIC_URL+'/images/icons/google-plus.png'   ;
const urlSnap =process.env.PUBLIC_URL+'/images/icons/snapchat.png'   ;
const urlImage =process.env.PUBLIC_URL+'/images/livraison.jpg' ;
const useStyles =makeStyles({
  footer:{
    display:'flex' , 
    width:'100%' ,
    height:'100%' ,
    flexDirection:'column', 
    backgroundColor:'#78d8e3',
    justifyContent:'space-between',
    paddingTop:15,
    
  }
  ,logoContainer:{

    display:'flex' ,
    flexDirection:'column',
    alignItems:'center',

    }
  ,logo:{
    width:128 ,
    height:128,
    marginBottom:25,
    backgroundImage: `url(${urlImage})`,
            backgroundPosition: 'center', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
},
paperDecoration:{
  display:'flex' , 
  flexDirection:'column', 
  alignItems:'center' ,
  height:'100%',
  width:'97%' ,
  backgroundColor:'transparent' , 
  paddingTop:10 , 
  
}
,
  footerDown:{
    display:'flex' , 
    width:'100%' ,
    height:50 ,
    flexDirection:'row', 
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#d4aa37',
  

  },
  infoContact:{
    display:'flex' , 
    flexDirection:'column' ,
    justifyContent:'space-between',


  }

})



const Footer = () => {
  const classes =useStyles() ; 
  return (
    <React.Fragment>

      <Container className={classes.footer}>
      
      <Grid container style={{paddingBottom :15}} >

        <Grid item  xs={12}  sm={4} lg={4}>
        <Paper className={classes.paperDecoration} elevation={5}>
      
        <Container className={classes.logoContainer}>

         
          {/* contenir le logo et klk lien  */}
          <Paper className={classes.logo}   >
          </Paper>

          <div>
            <Button fullWidth variant='text'> <a>Home</a></Button>
            <Button fullWidth variant='text'> <a>Blog</a></Button>
            <Button fullWidth variant='text'> <a>A props</a></Button>
            <Button fullWidth variant='text'> <a>react</a></Button>
          </div>
          </Container>

          </Paper>

    
        

      </Grid>




        <Grid item    xs={12} sm={4} lg={4} style={{textAlign:'center'}}>{/* ABOUT US */}
        <Paper elevation={5} className={classes.paperDecoration}>
         
        <Typography  style={{color:'black', fontSize:15 ,width:'70%'}}>
          
         <h3>
        <u>About us </u>
         </h3>

        Nous avons fondé BigNova Deliv en 2021, nous visons à rendre le quotidien de chaque personnes 
        plus simple et plus agréable en lui livrant tout ce dont il a besoin.dvdsnivdhfgbyudgbyfudkbd
        nfgnbdfb fsiybfsyiu
       Nous exerçons p l’ambition de tout livrer.


        </Typography>
        </Paper>
        </Grid>

        <Grid item   xs={12}  sm={4} lg={4} style={{textAlign:'center'}}>{/* ABOUT US */}
         <Paper className={classes.paperDecoration}  elevation={5}>

            <Container className={classes.infoContact}>

            <div><h3><u>Contactez-nous</u></h3></div>

    <div style={{
      display:'flex',
      flexDirection:'column', 
      alignItems:'flex-start',

    }}>
         <div >
             <HomeRoundedIcon/>:rue du veillajiosdhgus  <br/>

           </div>
           <div>
             <SettingsPhoneRoundedIcon/> : 000-785-966  <br/>
           </div>
           <div>
             <AlternateEmailRoundedIcon/> :reda.beka@gmail.com <br/>
           </div>

    </div>
          
           </Container>


         </Paper>
         </Grid>
        
       
      

</Grid>



<Container className={classes.footerDown}>
            <Typography variant='h8'> 
            &copy; {new Date().getFullYear()} Copyright: BigNova
            </Typography>
           
           <div className={classes.reseaux}>
             <FooterIcon url={urlFacebook}/>
             <FooterIcon url={urlInsta}/>
             <FooterIcon url={urlSnap}/>
             <FooterIcon url={urlGoogle}/>
           </div>

         </Container>
      </Container>

  





    </React.Fragment>
  );
}

export default Footer;