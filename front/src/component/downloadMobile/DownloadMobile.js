 
 import {Paper ,makeStyles ,Grid } from '@material-ui/core' ; 

import ButtonDownload from './ButtonDownload'

 const urlFond=process.env.PUBLIC_URL+'/images/elegant.jpg' ; 
 const google =process.env.PUBLIC_URL+'/images/icons/google-play.png' ; 
 const apple =process.env.PUBLIC_URL+'/images/icons/apple.jpg' ; 

 const useStyles =makeStyles(theme=>{
     return {

container:{
    height:'auto' ,
    minHeight:'700px',
    background: 'linear-gradient(45deg, #757F9A 30%, #D7DDE8 90%)',

    display:'flex' , 
    width:"100%", 
    paddingTop:' 150px' ,  
    paddingBottom :50 ,
   
    [theme.breakpoints.down('sm')]:{
        display:'flex' , 
        flexDirection:'row',

        background: 'linear-gradient(45deg, #757F9A 30%, #D7DDE8 90%)',
        height:'auto',
        minHeight:'500px',
        paddingTop:' 50px' ,  


        
    }

} , 
gauche:{
    marginTop : 5 , marginBottom : 5,     
    paddgin :10 , 
    textAlign :"center" ,
    display:'flex' , 
    flexDirection :'column' , 
    justifyContent:'flex-start' , 
    alignItems :'center' ,
    [theme.breakpoints.only('sm')]:{
   
    }
} ,
droite :{
    marginTop : 5 , marginBottom : 5,
    paddgin :10 ,
    display:'flex' , 
    flexDirection:'row' , 
    justifyContent :'space-evenly',
    [theme.breakpoints.only('sm')]:{
         maxWidth :'30vh'  ,
         marginLeft :'9%'
     }


} ,
image :{
    width:180, 
    height:340, 
    
} ,
image1 :{
    background :'#201545' ,
   
    transform:'translateY(0%)' ,
    '&:hover':{
        animation:'animateCard1 .5s linear' ,
        transform:'translateY(0%) scale(1.1)' , 
    } ,
    animation:'animateCard1Exit .2s linear' ,

},
image2 :{
    background :'#365248' ,
    
    transform: 'translateY(10%)',
    '&:hover':{
        animation:'animateCard2 .5s linear' ,

        transform:'translateY(5%) scale(1.1)' ,
    } , 
    animation:'animateCard2Exit .2s linear' ,
    [theme.breakpoints.down('sm')]:{
        display:'none'
    }
},
  '@global':{
        
    "@keyframes animateCard1":{
        '0%' :{ transform:'translateY(0%) scale(1)' ,} ,
        '100%' :{ transform:'translateY(0%) scale(1.1)' } , 
    }
    ,
    "@keyframes animateCard1Exit":{
        '0%' :{ transform:'translateY(0%) scale(1.1)' ,} ,
        '100%' :{ transform:'translateY(0%) scale(1)' } , 
    } ,
    /****************************************************** */
    "@keyframes animateCard2":{
        '0%' :{ transform:'translateY(10%) scale(1)' ,} ,
        '100%' :{ transform:'translateY(5%) scale(1.1)' } , 
    }
    ,
    "@keyframes animateCard2Exit":{
        '0%' :{ transform:'translateY(5%) scale(1.1)' ,} ,
        '100%' :{ transform:'translateY(10%) scale(1)' } , 
    } ,
    /****************************************************** */

   


    
  }

}


 }) ;

const DownloadMobile =()=>{

    const classes=useStyles() ;


    return (
         <Grid container className={classes.container}>
           
           <Grid item className={classes.gauche} sm={6} md={6} xs={12} lg={6}  > 
           <h2> Telechargez notre application mobile  </h2>

           <div className={classes.sectionMobile}>
              
                <p style={{color:'black'}}> elle est disponible sur : </p>
               <div style={{display:'flex' , flexDirection:'column' }}>
                    <ButtonDownload icon={google} text='Get it on'  titre='Google Play'/>
                    <ButtonDownload icon={apple} text='Get it on'  titre='Apple Store'/>
                </div>
           </div>

           <div>

           </div>
 

           </Grid>
           <Grid item className={classes.droite}  sm={false} md={6} xs={12} lg={6} > 

         <Paper className={`${classes.image} ${classes.image1}`} elevation={5}>

         </Paper> 
         <Paper className={`${classes.image} ${classes.image2}`}  elevation={5}>

          </Paper >
          </Grid>           


         </Grid>
    )

}

export default DownloadMobile  ; 