import React from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme=>{
  return {
  root: {
  
 
    zIndex:5 ,
    height :470 ,
    width : 380 ,
    
    [theme.breakpoints.down('md')]:{
        height :450 ,
        width :280 ,
        marginBottom:10 ,
        zIndex:5,
    }  ,
   

  },
  media: {
    height: 250,
    [theme.breakpoints.down('md')]:{
      height: 200,

    }
  },
  contenu:{
    height: 140,
    [theme.breakpoints.down('md')]:{
      height: 170,

    }
  } ,



btnContainer :{
  display :'flex'  , 
  flexDirection :'column', 
  justifyContent:'flex-end' , 
  alignItems :'center' ,
  height :70 , 
  paddingBottom :5  ,
  [theme.breakpoints.down('md')]:{
    marginTop:10 ,  
   }

  
} , 

  bouton:{ width:'50%',  
  
}



}});

export default function Partenaire({information ,id}) {
  const classes = useStyles();

  

  return (

    <Card className={classes.root} id='card' >
         
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={information.url}
          title="Partenaire"
        />
        <CardContent className ={classes.contenu}>
          <Typography gutterBottom variant="h4" component="h4">
            {information.titre} {/* Devenir Livreur  */}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* vous avez marre d'etre de votre vie , vous qui etes un rebuts de la societe vous voulez vous rendre utile avoir un travail et bien cela est possible 
            grace a notre offre *Devenir Livreur*  ,nous vous offrons ici poste de travail stable et au revenus assez consequant       */}  
            {information.description}  </Typography> 
        </CardContent>
      </CardActionArea>
      <CardActions className ={classes.btnContainer}>
        <Button size="small" color="primary" variant='outlined'className={classes.bouton}>
         Devenir 
        </Button>
      </CardActions>
    </Card>

  );
}