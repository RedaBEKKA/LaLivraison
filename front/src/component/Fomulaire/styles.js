import { makeStyles } from "@material-ui/core";

const slideWidthLeft = 360;
const slideWidthright = 540;

const slideheight = 550;
const widthContainer = 350;

//const backColor="linear-gradient(45deg ,#054225 30% , #055211 90%)"; 
const backColor='linear-gradient(45deg ,#f00000 30% , #dc281e 90%)'
// const backColor ='linear-gradient(45deg , #e1eec3 30% ,#f05053 90% )'
// const backColor ='linear-gradient(45deg , #f53803 30% ,#f5d020 90% )'  ; 
// const backColor ='linear-gradient(45deg , #010101 30% ,#000111 90% )'  ; 
const autherColor ='linear-gradient(45deg , #f5f7fa 30% ,#b8c6db 90% )'  ; 


const useStyles = makeStyles((theme) => ({
  /// ANIMATION WITH KEY FRAMES SA MERE ETT OUI FRERE  C'EST CA LE VIE
  "@global": {
    "@keyframes widthAnimation1": {
      "0%": { width: slideWidthLeft },
      "50%": { width: slideWidthLeft + slideWidthright },
      "100%": { width: slideWidthLeft },
    },

    "@keyframes widthAnimation2": {
      "0%": { width: slideWidthLeft },
      "50%": { width: slideWidthLeft + slideWidthright },
      "100%": { width: slideWidthLeft },
    },

    "@keyframes heightAnimation1": {
      "0%": { height: 100 },
      "50%": { height: slideheight },
      "100%": { height: 100 },
    },
    "@keyframes heightAnimation2": {
      "0%": { height: 100 },
      "50%": { height: slideheight },
      "100%": { height: 100 },
    },
  },

  container: {
    height: 550, minHeight:'550' , 
    width: 900,
    margin: "auto",
    marginTop:50,
    padding: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: '#f1f1f1',
    [theme.breakpoints.down("sm")]: {
      height: slideheight, //500
      width: widthContainer,
      display: "flex",
      flexDirection: "column",
    },
  },
  slider: {
    height:550 ,
    width: slideWidthLeft,
    position: "absolute",
    zIndex: 100,
    background: backColor,
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: 100,
      width: widthContainer,
    },
  },
  sliderAnimatedLeftToRight: {
    // atilit the right
    background: backColor,
    animation: `widthAnimation1 2.5s ${theme.transitions.easing.easeInOut} forwards `,
    [theme.breakpoints.down("sm")]: {
      animation: `heightAnimation1 2s ${theme.transitions.easing.easeInOut} forwards `,
    },
  },

  sliderAnimatedRightToLeft: {
    // atilit a gaucher
    background: backColor,
    animation: `widthAnimation2 2.5s ${theme.transitions.easing.easeInOut}  forwards`,
    [theme.breakpoints.down("sm")]: {
      animation: `heightAnimation2 2s ${theme.transitions.easing.easeInOut} forwards `,
    },
  },
  slideText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  TextP:{
    margin:10
  },
///////////////////////////////////////

  insciptionPart: {
    width: slideWidthright,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: slideWidthLeft,
    [theme.breakpoints.down("sm")]: {
      height: slideheight-100, // 100 de marginTop
      width: widthContainer,
      marginLeft: 0,
      marginTop: 100,
    },
  },

  
  titreInscrption:{
    fontSize:50 ,  
    fontWeight:"500" , 
    color:'#000' , 
    [theme.breakpoints.down('sm')]:{
      fontSize:35 , 
      transform:'translateY(-0%)' , 
      marginBottom:5 , 
    },
    marginBottom:15 , 
  }
  ,bouton: {
    margin: "auto",
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    width: 140,
    borderRadius: 20,
    background: backColor ,  // "linear-gradient(45deg ,#054225 30% , #055211 90%)",
    [theme.breakpoints.down('sm')]:{
      marginTop: 0,
      marginBottom: 5,
    } ,
 
  },


InputsdivAuth:{
        display:'flex' , 
        flexDirection:'column' , 
        justifyContent:'space-around' , 
        height:190 ,
        transform:'TranslateY(40px)' ,  
  }


  ,InputdivInsc:{
     transform:'TranslateY(20px)' ,  
     display:'flex' , 
     flexDirection:'column' , 
     justifyContent:'space-between' , 
     height:280 ,

    [theme.breakpoints.down('sm')]:{
      // height:300,
      // display:'flex' , 
      // flexDirection:'column' , 
      // justifyContent:'space-between' , 
      // marginBottom:'15px', 
      flexDirection:'column ' , 
      marginBottom :'20px' , 
      transform:'TranslateY(25px)' , 
      justifyContent:'space-between' , 

    }
  }
  ,forgotPassword:{ // pour bien positionner le textField password 
  
    [theme.breakpoints.down('sm')]:{
      transform:'TranslateY(-30px)' ,
      marginTop:35 , 
    }
  } 

   , 
  inscForm: {
    width: "90%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("sm")]:{
      marginTop:'10px' , 
      height:'75%' ,  // good choice
     
    }
  },
  confirmMdp:{
    [theme.breakpoints.down('sm')]:{
     transform:'translateY(-25px)' , 
    }
  }

}));

export default useStyles;
