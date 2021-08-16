import Chatbot from 'react-chatbot-kit'  ; 
import config from './view/config'  ; 
import ActionProvider from './actionProvider'; 
import MessageParser from './messageParser' ;
import React  ,{useState}from 'react' ; 
import {makeStyles ,Button,IconButton, Paper, Icon , Fade} from '@material-ui/core' ;  
import ChatIcon from '@material-ui/icons/Chat';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const useStyles = makeStyles( theme=>{

    return {
   
    chat:{
        width :275 , //275
        height :500 ,
        backgroundColor:'#ae7419' ,
     
        position :'fixed' , 
        bottom :80  , right : 65,
    
        zIndex : 15 ,


      

    } , 
    button:{
        backgroundColor:'#e32929' , 
        position : 'fixed' , 
      bottom :0  , right : 0,
      margin:10 , zIndex :15  ,

        '&:hover':{  backgroundColor:'#e32929' , }
    } ,
    divBtn:{
        borderRadius:10 ,
        alignSelf :"flex-end" , 
       
    } ,icons:{
        color:'#fff' ,
      
    }
}
})
const ChatBot =({})=>{
    const classes=useStyles() ; 
  

const [visible, setVisibile]=useState(false)  ; 
const scroller=()=>{
    if(window.pageYOffset >150){setVisibile(true) ;}
    else {setVisibile(false) ;}
  }
  
  window.addEventListener('scroll' ,scroller) ; 
  

    

    const [open , setOpen] =useState(false) ; 
    const [displayContainer,setDisplay] =useState('none')   ; 
    const [animate , setAnimate] =useState(false) ; 
    const handelClick=()=>{
        
      setAnimate(true)
      setOpen(true)  ; 
      setDisplay('block')
    }

    const handelClose=()=>{
        setTimeout(() => {
            setOpen(false)
        }, 150);
        setAnimate(false) ; 
setDisplay('none')

    }


      
 


    return (

<React.Fragment>
    
      
        <div  className={classes.chat} style={{display:`${displayContainer}`}}>
         {open && 
        <Fade in={animate}>
        <Paper elevation={5}>
         <Chatbot
         config={config} 
         messageParser={MessageParser}
         actionProvider={ActionProvider}
         />
        </Paper> 
        </Fade> 
         }
         </div>


         { visible &&(
             <Fade in={visible} >
        <div className={classes.divBtn}>
         
         
   
         
          {open ?(     

        <IconButton variant='contained' color="secondary" onClick={handelClose} className={classes.button}>
        <CancelRoundedIcon fontSize='large' className={classes.icons}/>
        </IconButton>):
     



         (<IconButton className={classes.button}   onClick={handelClick}>
          <ChatIcon fontSize='large' className={classes.icons}  />
          </IconButton>)

          } 

      
          </div>
          </Fade>
         )}




</React.Fragment>
        
    )

}

export default ChatBot