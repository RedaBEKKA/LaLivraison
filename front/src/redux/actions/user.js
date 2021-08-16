import { inscrireUser, authentifierUser } from "../../api";
// action creators
export const inscrireAction = (donnee, history) => async (dispatch) => {
  try {
    console.log("ACTION INSCR");
    const { data } = await inscrireUser(donnee);

    console.log(data);

    let action;
    if (data.message) {
      console.log(data.message);
      action = { type: "AUTH_ERROR", payload: data.message };
      dispatch(action);

    } else {
      console.log("data");
      action = { type: "AUTH", payload: data };
      dispatch(action);
      }

    history.push("/"); // ca c'est bien  dont work
  } catch (error) {
    console.log(error);
  }
};

export const authentifierAction = (donnee, history) => async (dispatch) => {
  try {
    console.log("ACTION Auth");

    const { data } = await authentifierUser(donnee);
    let action ; 

    if(data.error){
      
      action = { type: "AUTH_ERROR", payload: data.error};
      dispatch(action);
    }else {
      action = { type: "AUTH", payload: data };
      dispatch(action);
    }

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const logoutAction = (history) => async (dispatch) => {
  console.log("logoutAction");
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
  history.push("/");
};
