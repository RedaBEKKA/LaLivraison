import chats from './ChatDocs'  
   
const tabgreet =chats.greet ; 
class MessageParser  {

 constructor(actionProvider,state){
     this.actionProvider =actionProvider ;
     this.state=state  ;  
 }

 parse(message)
 {
  
     if(tabgreet.includes(message))
     {
         this.actionProvider.helloWolrdHandler() ; 
     
     }


 }


 

 
}

export default MessageParser
;