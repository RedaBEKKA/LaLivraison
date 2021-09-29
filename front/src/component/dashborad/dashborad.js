import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderSideBarre from '../adminPage/HeaderSideBarre'
import SideMenu from '../SideMenu/SideMenuAdmin'
import logo2 from "../../assets/user.jpg";
import axios from 'axios'

function Dashborad() {
    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [inactive, setInactive] = useState(true);

    const handelOpen = ()=>{
        setInactive(!inactive)
    }
    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div>
            <SideMenu />
            <HeaderSideBarre  logo2={logo2} handleLogout={handleLogout} user={user} handelOpen={handelOpen} inactive={inactive}/>

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

export default Dashborad
