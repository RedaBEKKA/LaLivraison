import { Message } from "@material-ui/icons";

class ActionProvider{

    constructor(createChatBotMessage , setStateFunc){
        this.createChatBotMessage = createChatBotMessage  ;  // le bind
        this.setState = setStateFunc  ; // nani ?? 
    }

     

    helloWolrdHandler=()=>{ // faire aussi un tableau de reponse qui ont le mm sens et choisir une par hasard , cool non ???

       const tab= ['ohayo ! genki ??' ,'bonjour comment vas tu ? ' ,'sbah el khir frere ' , 'oooy teeme'] ; 

     const message = this.createChatBotMessage(tab[Math.floor(Math.random()*4)]) ; 
     this.setChatBotMessage(message) ; 
     
    }


    restaurantHandler=()=>{
        const tab= ['ohayo ! genki ??' ,'bonjour comment vas tu ? ' ,'sbah el khir frere ' , 'oooy teeme'] ; 

    }
    



    setChatBotMessage=(message)=>{
        this.setState( state=>({...state, messages:[...state.messages , message]})) ; // cette ligne est flou ada idiwi state , anda idiwi messageS ??????
    }
}



export  default ActionProvider ; ; 