import React from 'react'
import { Link } from 'react-router-dom'
import logo2 from "../../assets/user.jpg";

function HeaderSideBarre({handleLogout,user,handelOpen,inactive}) {
    return (
        <div className='container-header' >
                <div className='left-box'>
                    <p  >BigNova<span className='span'>.Deliv</span ></p>
                </div>
                <div className='right-box'>
                    <div className='big-box'>
                        <div className='box-profile' >
                            <div className='profile-img-container'>
                                <img src={logo2} alt="user" />
                            </div>
                            <div className='nameContainer'>
                                {user.fullName}
                            </div>
                            <div className='box-icon' onClick={() => {handelOpen()}}>
                                <i classname="bi bi-caret-down-fill"></i>
                            </div>
                        </div>
                        {/* className='solid-box' */}
                        <div className={`solid-box ${inactive ? "active" : ""}`}>

                            <Link className='item-box' to='/InfoProfile'>
                                Mes Informations
                                <i classname="bi bi-info-circle-fill"> </i>
                            </Link>


                            <Link className='item-box' to='/modifierProfile'>
                                Modifier profile
                                <i classname="bi bi-person-lines-fill"></i>

                            </Link>
                            <Link className='item-box' onClick={()=>{
                                handleLogout()
                            }}>
                                Se deconnecter
                                <i classname="bi bi-box-arrow-right"></i>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default HeaderSideBarre
