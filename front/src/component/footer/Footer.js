import React from 'react'
import './Footer.css'
import "bootstrap/dist/css/bootstrap.min.css"
export default function Footer() {
  return (
  
  
    <div className="footer-distributed">
    
    <div className="footer-left">
    
        <h3>BigNova<span>Deliv</span></h3>
        
        <li><a href="#">A propos</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Nous rejoindre</a></li>
        
        
    </div>
    
    
    
      
      
 


    <div className="footer-center">
    
    <div>
    <i className="fa fa-map-marker"></i>
    <p><span>Sidi Ahmed</span> Bejaia, Algerie</p>
    </div>
    
    <div>
    <i className="fa fa-phone"></i>
    <p>+213 782205066</p>
    </div>
    
    <div>
    <i className="fa fa-envelope"></i>
    <p><a href="mailto:support@company.com">contact@bignovacompany.com</a></p>
    </div>
    
    </div>
    
    <div className="footer-right">
    
    <p className="footer-company-about">
    <span>A propos de l'entreprise</span>
    Lorem ipsum dolor sit amet consectetur adipisicing. &amp; Delivery.
    </p>
    
    <div className="footer-icons">
    
      <a href="#"><i className="fab fa-facebook"></i></a>
      <a href="#"><i className="fab fa-twitter"></i></a>
      <a href="#"><i className="fab fa-linkedin"></i></a>
      <a href="#"><i className="fab fa-youtube"></i></a>
      
    </div>
    
    </div>
   <hr style={{backgroundColor:"tomato"}}/>
    <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2021 tous les droits de  
         <a href="#" style={{color:"black"}}> BigNova Deliv</a> .
            </p>
          </div>
    
    </div>


        

       
    
  )
}
