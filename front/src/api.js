import axios from 'axios' ; 

const url='http://localhost:5000/'


//api for users 

export const inscrireUser=(data)=> { return axios.post(url+'user/sign',data) ; } //j'envoie des requetes kn daya non ? 
export const authentifierUser=(data)=>{ return  axios.post(url+'user/auth',data) ;}



