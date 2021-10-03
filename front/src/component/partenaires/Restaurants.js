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
import { dispatchGetAllRestaurants, fetchAllRestaurants } from '../../redux/actions/restaurantsAction'

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
    const restaurants = useSelector(state => state.restaurants)
    // console.log('users', users)
    //console.log('restaurants', restaurants)
    const { user, isAdmin } = auth
    const { restaurant } = restaurants

    const [data, setData] = useState(initialState)
    const { fullName, motDePasse, cf_motDePasse, err, success } = data


    const [inactive, setInactive] = useState(true);
    const [active, setActive] = useState(true);
    const [activeInfo, setactiveInfo] = useState(true)
    const [aData, setAdata] = useState('')
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
    //const [id , setId] = useState('')

    useEffect(() => {
        if (isAdmin) {
            fetchAllRestaurants(token).then(res => {
                dispatch(dispatchGetAllRestaurants(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

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

    const handelfetchRestaurant = async (id) => {

        if (user._id !== id) {
            const res = await axios.get(`/admin/restaurantInfo/${id}`, {
                headers: {
                    'x-access-token': token
                },
                body: {
                    id
                }
            })
                // .then(resp => {
                //     console.log(resp.data);
                //     setAdata(resp.data.Restaurant.tva)
                //     console.log('resprespresp',resp)
                // }
                // )
            console.log(`res`, res.data.Restaurant)
            setAdata(res.data)
            console.log(`aData`, aData.Restaurant.email)
        }

    }


    const handelOpen = () => {
        setInactive(!inactive)
    }
    const handelOpenAdd = () => {
        setActive(!active)
    }
    const handelOpenInfoResto = () => {
        setactiveInfo(!activeInfo)
    }





    const handelGetRestaurantInfo = async (id) => {

    }
    return (
        <>
            <div className='menue'>
                <SideMenu />

            </div>

            <HeaderSideBarre logo2={logo2} user={user} handelOpen={handelOpen} inactive={inactive} handleLogout={handleLogout} />
            {/* <div className='sliderAdd'> */}
            <div className={`sliderAdd ${active ? "active" : ""}`}>
                <div className='box-circle-icon'>
                    <i class="bi bi-x-circle" onClick={() => { handelOpenAdd() }}></i>
                </div>

                <div className='box-input'>
                    <div className='item-input'>
                        nom restaurant :
                        <input ></input>
                    </div>
                    <div className='item-input'>
                        description :
                        <input ></input>
                    </div>
                    <div className='item-input'>
                        speciality :
                        <input></input>
                    </div>

                    <div className='item-input'>
                        address :
                        <input></input>
                    </div>
                    <div className='item-input'>
                        phone :
                        <input></input>
                    </div>
                    <div className='item-input'>
                        registre :
                        <input></input>
                    </div >
                    <div className='item-input'>
                        tva :
                        <input></input>
                    </div>

                    Image :
                    <input type="file" />

                </div>
                <button>
                    modifier
                </button>

            </div>

            <div className={`sliderInfo ${activeInfo ? "activeInfo" : ""}`}>
                <div className='box-circle-icon'>
                    <i class="bi bi-x-circle" onClick={() => { handelOpenInfoResto() }}></i>
                </div>


                <div className='box-input'>
                    <div className='box-image-i'>
                        <div>
                            <div className='item-input'>
                                <h3>ID :</h3> <h4>  {aData.Restaurant._id}</h4>
                            </div>
                            <div className='item-input'>
                                <h3>nom restaurant :</h3> <h4> {aData.Restaurant.nomRestaurant}</h4>
                            </div>
                        </div>

                        <div className='image-box'></div>

                    </div>

                    <div className='item-input'>
                        <h3>Description : {aData.Restaurant.description} </h3>
                    </div>
                    <div className='item-input'>
                        <h3>spécialité : {aData.Restaurant.speciality}</h3>
                    </div>
                    <div className='item-input'>
                        <h3>E-mail : {aData.Restaurant.email}</h3>
                    </div>

                    <div className='item-input'>
                        <h3>address : {aData.Restaurant.address}</h3>
                    </div>
                    <div className='item-input'>
                        <h3>téléphone : {aData.Restaurant.phone}</h3>
                    </div>
                    <div className='item-input'>
                        <h3> registre  : {aData.Restaurant.registre}</h3>
                    </div >
                    <div className='item-input'>
                        <h3> tva : {aData.Restaurant.tva}</h3>
                    </div>
                    <div className='item-input'>
                        <h3>Site Web : {aData.Restaurant.siteweb} </h3>
                    </div>





                </div>


            </div>


            <div className="profile_page">

                <div className="col-right">

                    <div className='box-title'>
                        <h2>{isAdmin ? "Les Restaurants" : "My Orders"}</h2>
                        <button className='box-btn' onClick={() => { handelOpenAdd() }}>
                            Ajouter
                        </button>

                    </div>


                    <div style={{ overflowX: "auto" }}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom Restaurant</th>
                                    <th>spécialité</th>
                                    <th>E-mail</th>
                                    <th>téléphone</th>
                                    <th>plus information</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    restaurants.map(restaurant => (
                                        <tr key={restaurant._id} >
                                            <td>{restaurant._id}</td>
                                            <td>{restaurant.nomRestaurant}</td>
                                            <td>{restaurant.speciality}</td>
                                            <td>{restaurant.email}</td>
                                            <td>{restaurant.phone}</td>
                                            <td onClick={() => {
                                                // let _id = restaurant._id
                                                handelOpenInfoResto()
                                                // setId(restaurant._id)
                                                // console.log(`id`, id)
                                                handelfetchRestaurant(restaurant._id)
                                            }}> plus ....</td>

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

