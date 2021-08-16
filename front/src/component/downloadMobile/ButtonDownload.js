import {IconButton , makeStyles} from '@material-ui/core' ; 


const useStyles= makeStyles({
    container :{ display:'flex' , 
    flexDirection :'row' ,
    justifyContent:"space-around" ,
    width :'80%' ,
      },

div :{
    display:'flex' , 
    flexDirection :'column' ,
    alignItems:"flex-start" , 
    justifyContent:"center" , 
    fontSize :12,
    lineHeight :0.1,
    transform:'translateY(25%)', 
    

} , btn :{
    backgroundColor:'black' ,
    color :'white' ,
    marginTop:10 , 
    marginBottom:10 , 
    borderRadius:15, 
    width : 200,
    height :60,
    "&:hover":{backgroundColor:'#000' ,}
    
} ,
divImg :{
}

})

const ButtonDownload=({icon , text , titre})=>{
   const classes = useStyles() ; 
    return (
        <IconButton variant='contained'    className={classes.btn}>
            <div className={classes.container}>

              <div style={{backgroundImage:`url(${icon})`,backgroundSize:'cover',width:32 , height:32 }}></div>

            <div className={classes.div} >
            <p style={{fontSize:11,}}>{text}</p>
            <p style={{fontSize:18,}}>{titre}</p>
            </div>

            </div>
           
        </IconButton>
    )


    

}

export default ButtonDownload  ; 