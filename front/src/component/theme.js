import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({

    palette :{
        primary : {
            main :'#e32929',
            
        } ,
        secondary : {
            main :'#2a2a2a' ,
        }
        ,
        zIndex :{
            modal :`2 !important` ,
        }
    }
})


export default theme ; 