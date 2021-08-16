import { createChatBotMessage } from "react-chatbot-kit";
import "./config.css"


const config ={
    initialMessages:[createChatBotMessage('hello world')] , 
    botName:'telligent bot', 
    customComponents: {
        // Replaces the default header
         
    } , 
    customStyles:{
    

    }
}


export default config