import Carousel from "react-bootstrap/Carousel";
import { makeStyles} from '@material-ui/core' ; 
import './carouselle.css'

const imageFond =process.env.PUBLIC_URL+'/images/jus.jpg' ; 
const imageFond2 =process.env.PUBLIC_URL+'/images/burger.jpg';
const imageFond3=process.env.PUBLIC_URL+'/images/darkfood.jpg'


const useStyles =makeStyles(theme=>{
  return {
   
    divText:{      
      position:'absolute' , 
      top:'35%' , 
      left :'0' , 
      width:'100%' , 

      display :'flex' , 
      flexDirection:'column' , 
      justifyContent:'center' , 
      alignItems:'center' ,

      color:'white !important',
      
      textAlign:'center' , 



    },
   pText:{
      
    color:'#fff' , 
    [theme.breakpoints.only('xs')]:{

      display:'none' , 
    }
   },
   divImageContainer:{
     
     height:'100vh'  ,

     [theme.breakpoints.down('sm')]:{
      height:'100vh'  ,


    } ,  [theme.breakpoints.only('md')]:{
      height:'100vh'  ,

    } , 
   } , 
   img:
    {
    width:'100%' ,
     height:'100%' ,
    } , 
  
  }})


const Carouselle=()=>{
  const classes=useStyles(); 
    return(
               <div>
                 
            <Carousel controls={false}  interval={2500} pause={false} className={classes.Carousel}>
            <Carousel.Item>
              <div className={ classes.divImageContainer }  >{/** className={ classes.divItem } */}
              {/* <div className={classes.divText}>
                <h3> Premier slide jamais je pensais que ca aller marcher </h3>
                <p className={classes.pText}>
               et oui en fin de compte boku wa kira 
                </p>
              </div> */}
                 <img 
                 src={imageFond} 
                 alt='wallpaper dark food' 
                 className={classes.img}                 />
            
            </div>
              <div className={classes.divText}>
                <h3> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h3>
                <p className={classes.pText}>
                Lorem ipsum dolor sit amet
                </p>
              </div>              </Carousel.Item>

              {/***************************************************/}
              <Carousel.Item>
              <div className={ classes.divImageContainer }> 
              <img 
                 src={imageFond3} 
                 alt='wallpaper dark food' 
                 className={classes.img}    
                 />
            
              </div>
              <div className={classes.divText}>
                <h3> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h3>
                <p className={classes.pText}>
                Lorem ipsum dolor sit amet               </p>
              </div>
            
              </Carousel.Item>

             {/***************************************************/}

              <Carousel.Item>
              <div className={classes.divImageContainer}>  
                 <img 
                 src={imageFond2} 
                 alt='wallpaper dark food' 
                 className={classes.img}    
                 />
              </div>
              <div className={classes.divText}>
                <h3> Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                <p className={classes.pText}>
                Lorem ipsum dolor sit amet
                </p>
              </div>
              
              </Carousel.Item>
      
      </Carousel>
      </div>
    );
}
export default Carouselle;