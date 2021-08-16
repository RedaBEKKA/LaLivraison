import Service   from "./service";
import { Paper,makeStyles, Container } from "@material-ui/core";
import Infservices from './informations'

const useStyles =makeStyles(theme=>{
  return{

   container:{
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent:'space-evenly',
    minHeight:'50vh' , 
    height:'auto' ,
    minHeight :'700px',
  
    background: 'linear-gradient(45deg, #6190e8 30%, #a7bfe8 90%)',
    
[theme.breakpoints.up('lg')]:{
  paddingTop:100 , 
  paddingBottom :100  , 
}  , 
[theme.breakpoints.down('sm')]:{
  paddingTop:30 , 
     paddingBottom :30  , 
}

     },


    allservices:{
     width: '100%',
     display: "flex",
     flexDirection: "row",
     justifyContent:'space-evenly',
     height:'auto' ,
     paddingTop :15 , paddingBottom :10 ,
     [theme.breakpoints.only('md')]:{
      width: '75%',
      display: "flex",
     flexDirection: "row", 
     flexWrap:'wrap' , 
     } ,
     [theme.breakpoints.down('sm')]:{
       
      display: "flex",
     flexDirection: "column", 
     
     }
     
    }
    }

})

const AllServices=()=>{

    const classes= useStyles() ; 
    
   


return (
  <Paper className={classes.container} >
  <div>
    <h3>Nos services </h3>
    <p> Big nova deliv vous offre plusieurs services de livaraison a vous d'en profiter</p>
    </div>
    <Container className={classes.allservices}>
    
      {
        Infservices.map((element)=><Service key={element.id} information={element} />)
      }
    </Container>

<p> d'autre service seront prochainement disponible </p>
    </Paper>
) ;
}
export default AllServices ; 

