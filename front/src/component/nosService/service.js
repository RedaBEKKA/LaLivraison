import { Button,Paper,makeStyles, Container } from "@material-ui/core";
import React, { useState } from 'react';



const useStyles= makeStyles(theme=>{
    return {
    '@globale':{
        '@keyframes animation1':{
            '0%':{
                transform:'scale(0)' ,

            } ,
            '100%':{
                transform:'scale(1.5)' ,
            }
        }
    },
    container:{
        maxWidth:300,
        maxHeight:300,
        display:'flex',
        flexDirection:'column',
        alignItems:'center' ,
        textAlign:'center' ,
        

    },
    paperRond:{
        width :160, maxWidth :180,
        height : 160 ,  maxHeight : 180 , 
        borderRadius:'50%',
        backgroundColor:'#ae7419',
      
       '&:hover':{
        //  animation:'aniamtion1', 
        //  animationDuration :'200ms'
        
       } ,[theme.breakpoints.down('md')]:{
        width :120,
        height : 120 ,  
       }

    }
    

}

})

const Service=({ information })=>{
const classes=useStyles() ;
    return (
        <React.Fragment>
            <Container className={classes.container}>
            {/* <Paper className={classes.paperRond} elevation={3}
            style={{
                backgroundImage: `url(${information.urlImage})`,
                backgroundPosition: 'center', 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
            }} >
            </Paper> */}
          <Button className={classes.paperRond} elevation={3}
            style={{
                backgroundImage: `url(${information.urlImage})`,
                backgroundPosition: 'center', 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
            }} >
            </Button>
            
            
            <h2> {information.nomService}</h2>
            </Container>

        </React.Fragment>
    )


}

export default Service ; 