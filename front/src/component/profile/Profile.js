import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { isLength, isMatch, isName } from '../../utils/validation/Validation'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/notification'

import { fetchAllUsers, dispatchGetAllUsers } from '../../redux/actions/usersAction'
import ShinBarreMenu from '../newBarreMenu/shinBarreMenu'
import SideMenu from '../SideMenu/SideMenuAdmin'
import { IconButton } from '@material-ui/core'
import logo2 from "../../assets/user.jpg";
import { NavLink, Link } from "react-router-dom";
import HeaderSideBarre from '../adminPage/HeaderSideBarre'

const initialState = {
    fullName: '',
    motDePasse: '',
    cf_motDePasse: '',
    err: '',
    success: ''
}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)
    console.log('users', users)
    const { user, isAdmin } = auth
    const [data, setData] = useState(initialState)
    const { fullName, motDePasse, cf_motDePasse, err, success } = data
    const [inactive, setInactive] = useState(true);

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    

   

    const updatePassword = () => {
        if (isLength(motDePasse))
            return setData({ ...data, err: "Le mot de passe doit être au moins de 6 caractères.", success: '' })

        if (!isMatch(motDePasse, cf_motDePasse))
            return setData({ ...data, err: "Le mot de passe ne correspond pas.", success: '' })

        try {
            axios.post('/user/reset', { motDePasse }, {
                headers: {
                    'x-access-token': token
                }
            })

            setData({ ...data, err: '', success: "mise à jour Succès!" })
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
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
    const handelOpen = ()=>{
        setInactive(!inactive)
    }

  
    const handleDelete = async (id) => {
        try {
            if (user._id !== id) {
                if (window.confirm("Are you sure you want to delete this account?")) {
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {
                            'x-access-token': token
                        }
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <>
            <div className='menue'>
                <SideMenu />

            </div>

            <HeaderSideBarre logo2={logo2}  user={user} handelOpen={handelOpen} inactive={inactive} handleLogout={handleLogout} />

            <div className="profile_page">
                <div className="col-right">
                    <h2>{isAdmin ? "Users" : "My Orders"}</h2>

                    <div style={{ overflowX: "auto" }}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {
                                                    user.role === 1
                                                        ? <i className="fas fa-check" title="Admin"></i>
                                                        : <i className="fas fa-times" title="User"></i>
                                                }
                                            </td>
                                            <td>
                                                <Link to={`/edit_user/${user._id}`}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <i className="fas fa-trash-alt" title="Remove"
                                                    onClick={() => handleDelete(user._id)} ></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
              


            </div>
        </>
    )
}

export default Profile
