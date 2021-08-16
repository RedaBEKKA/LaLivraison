
const postReducer=(postReducer=[],action)=>{
  

    switch(action.type){
  
      case 'GETALLPOSTS' :   {
      return action.payload ;  

      }
        default : return postReducer ; 
    }
  }
  
  
  export default postReducer ; 
  