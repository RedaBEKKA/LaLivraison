import  Partenaire  from "./Partenaire";
import information from "./informations" ;
import {makeStyles ,Typography} from '@material-ui/core'

const useStyles= makeStyles(theme=>{
return  {

container:{
    background: 'linear-gradient(45deg, #8e9eab 30%, #eef2f3 90%)',
 display:'flex' ,
 flexDirection:'column' , 
 alignItems:'center' , 
 height:'auto' , 
 width :'100%' , 
 paddingTop : 60 , 
 paddingBottom : 60 , 

 }
 ,cards :{
   display :'flex' , 
   flexDirection :'row'  ,
   justifyContent :'space-evenly' ,
   alignItems :'center' , 
    width :'100%' ,
    flexWrap :'wrap' , 

   [theme.breakpoints.between('sm','md')]:{
   display :'flex' , 
   flexDirection :'row'  ,
   justifyContent :'space-evenly' ,
   alignItems :'center' ,
   flexWrap :'wrap' , 
//    width :'80%' , 
//    backgroundColor:'red' , 
   
} ,[theme.breakpoints.only('xs')]:{
    display :'flex' , 
    flexDirection :'column'  ,
    justifyContent :'space-evenly' ,
    alignItems :'center' ,
    // width :'120%' , 
    // backgroundColor:'red' , 

 }
 }

}
})


const SectionPartenaires =()=>{
const classes = useStyles() ;


 return (
    <div className={classes.container}>
        <div>
        <Typography gutterBottom variant="h4" component="h4">
          Devenez notre partenaire
          </Typography>

          <Typography gutterBottom variant="h5" component="p" color='textPrimary'>
          
     BigNova Deliv offre aussi des postes de travail qui vous permettrons de gagne votre vie de facon cool 

          </Typography>

        </div>
     
     <div  className={classes.cards}>
        {
            information.map( (index) =>
            
                <Partenaire information={index}  item key ={index.id} />
            )
        }

           </div>       
              
                 
           
      
    </div>



)

}


export default SectionPartenaires ; 