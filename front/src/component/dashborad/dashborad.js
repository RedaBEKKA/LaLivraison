import React from 'react'
import SideMenu from '../SideMenu/SideMenuAdmin'

function dashborad() {
    return (
        <div>
            <SideMenu />
            <div className='logo-container' >

                <p style={{ transform: 'translate(-5%,2%)' }} >BigNova<span className='span'>.Deliv</span ></p>

            </div>
            <div className='container-title-dashborad'>
                <h1>les Restaurentes</h1>
                <div className='container-item'>
                    <input placeholder='recherche' />
                    <div className='container-btn'>
                        <button>import / export</button>
                        <button>ajouter</button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default dashborad
