const userReducer = (state = { authData: null }, action) => {
  switch (action.type) {

    case "AUTH_ERROR":{
         
      console.log("Action",action)  ; 
      return {...state,erreur : action?.payload }
         
    } ; 


    case "AUTH": {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload, erreur :'' };
    }

    case "INSCRIRE": {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload , erreur:''};
    }

   
    case "LOGOUT": {
      localStorage.clear();
      return state;
    }

    default:
      return state;
  }
};

export default userReducer;
