import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/notification'

import { fetchAllUsers, dispatchGetAllUsers } from '../../redux/actions/usersAction'
import ShinBarreMenu from '../newBarreMenu/shinBarreMenu'
import SideMenu from '../SideMenu/SideMenuAdmin'
import { IconButton } from '@material-ui/core'
import logo2 from "../../assets/user.jpg";
import { NavLink, Link } from "react-router-dom";
import HeaderSideBarre from '../adminPage/HeaderSideBarre'
import { dispatchGetAllRestaurants, fetchAllRestaurants } from '../../redux/actions/restaurantsAction'
import { isEmpty, isEmail, isLength, isMatch, isName, isPhone } from '../../utils/validation/Validation'

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
            console.log(`res`, res.data.restaurant)
            setAdata(res.data)
            // console.log(`aData`, aData.Restaurant.email)
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
    const [id, setID] = useState('')

    const initialStateRestaurant = {
        email: '',
        restaurantName: '',
        phone: '',
        description: '',
        speciality: '',
        address: '',
        registre: '',
        tva: '',
        siteweb: '',
        img: '',
        error: '',
        sucssé: '',
        menue: id,
    }
    const [restaurantAdmin, setRestaurantAdmin] = useState(initialStateRestaurant)
    const { restaurantName, email, phone, description, speciality, address, registre, tva, siteweb, sucssé, error, img,menue } = restaurantAdmin

    const handleChangeInput = e => {
        const value = e.target.value;
        // const { name, value } = e.target
        setRestaurantAdmin({ ...restaurantAdmin, [e.target.name]: value, error: '', sucssé: '' })
    }

    const handelAddResto = async e => {
        e.preventDefault()
        // if (isEmpty(restaurant) || isEmpty(description) || isEmpty(speciality) || isEmpty(address) || isEmpty(registre) || isEmpty(tva) || isEmpty(siteweb)|| isEmpty(email))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "Merci de remplir tous les champs.", sucssé: '' })

        // if (!isName(restaurantName))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "Le nom Restaurant est invalide.", sucssé: '' })

        // if (!isEmail(email))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "E-mail invalide.", sucssé: '' })

        // if (!isPhone(phone))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "Numéro téléphone invalide.", sucssé: '' })

        // if (isLength(description))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "description doit être au moins de 6 caractères.", sucssé: '' })

        // if (isLength(speciality))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "speciality doit être au moins de 6 caractères.", sucssé: '' })

        // if (isLength(address))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "address doit être au moins de 6 caractères.", sucssé: '' })

        // if (isLength(registre))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "registre doit être au moins de 6 caractères.", sucssé: '' })

        // if (isLength(tva))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "tva doit être au moins de 6 caractères.", sucssé: '' })

        // if (isLength(siteweb))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "siteweb doit être au moins de 6 caractères.", sucssé: '' })

        // if (isLength(img))
        //     return setRestaurantAdmin({ ...restaurantAdmin, error: "img doit être au moins de 6 caractères.", sucssé: '' })

        try {
            const res = await axios.post('/admin/newRestaurant',
             { restaurantName, email, phone, description, speciality, address, registre, tva, siteweb, sucssé, error, img, menue },
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            )
            console.log(`res`, res)
            if (res.data.status == 'FAILED'){
                setRestaurantAdmin({ ...restaurantAdmin, error: res.data.message, sucssé: '' })
            } else{
                setRestaurantAdmin({ ...restaurantAdmin, error: '', sucssé: res.data.message })

            }

        } catch (err) {

            setRestaurantAdmin({ ...restaurantAdmin, error: data.message, sucssé: '' })
        }
    }
    return (
        <>
            <div className='menue'>
                <SideMenu />

            </div>

            <HeaderSideBarre logo2={logo2} user={user} handelOpen={handelOpen} inactive={inactive} handleLogout={handleLogout} />
            {/* <div className='sliderAdd'> */}

            <div className={`sliderAdd ${active ? "active" : ""}`}>
                {error && showErrMsg(error)}
                {sucssé && showSuccessMsg(sucssé)}
                <div className='box-circle-icon'>
                    <i className="bi bi-x-circle" onClick={() => { handelOpenAdd() }}></i>
                </div>
                {/* { restaurantName, email, phone, description, speciality, address, registre, tva, siteweb, sucssé, error, img } */}
                <form className='box-input' onSubmit={handelAddResto}>
                    <div>
                        <button type="submit">modifier</button>
                    </div>


                    <div className='item-input'>

                        <label htmlFor="restaurantName"> nom restaurant :</label>
                        <input type="text" placeholder="Entrez votre nom de restaurant" id="restaurantName"
                            value={restaurantName} name="restaurantName" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input'>

                        <label htmlFor="email"> E-mail :</label>
                        <input type="email" placeholder="Entrez votre email" id="email"
                            value={email} name="email" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input'>

                        <label htmlFor="description">description :</label>
                        <input type="text" placeholder=" description" id="description"
                            value={description} name="description" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input'>

                        <label htmlFor="speciality">speciality :</label>
                        <input type="text" placeholder=" speciality" id="speciality"
                            value={speciality} name="speciality" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input'>
                        <label htmlFor="address">address :</label>
                        <input type="text" placeholder=" address" id="address"
                            value={address} name="address" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input'>
                        <label htmlFor="phone">telephone :</label>
                        <input type="text" placeholder=" telephone" id="phone"
                            value={phone} name="phone" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input'>
                        <label htmlFor="registre">registre :</label>
                        <input type="text" placeholder=" registre" id="registre"
                            value={registre} name="registre" onChange={handleChangeInput} />
                    </div >
                    <div className='item-input'>
                        <label htmlFor="tva">tva :</label>
                        <input type="text" placeholder=" tva" id="tva"
                            value={tva} name="tva" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input'>
                        <label htmlFor="siteweb">siteweb :</label>
                        <input type="text" placeholder=" tva" id="siteweb"
                            value={siteweb} name="siteweb" onChange={handleChangeInput} />
                    </div>
                    <div className='item-input' >
                        <label htmlFor="siteweb">menue :</label>
                        <input type="text" disabled placeholder={id} id="menue"
                            value={menue} name="menue" onChange={handleChangeInput} />
                    </div>


                    <label htmlFor="img">Image :</label>
                    <input type="file" placeholder=" img" id="img"
                        value={img} name="img" onChange={handleChangeInput} />

                </form>



            </div>

            <div className={`sliderInfo ${activeInfo ? "activeInfo" : ""}`}>
                <div className='box-circle-icon'>
                    <i className="bi bi-x-circle" onClick={() => { handelOpenInfoResto() }}></i>
                </div>

                {aData &&
                    <div className='box-input'>
                        <div className='box-image-i'>
                            <div>
                                <div className='item-input'>
                                    <h3>ID :</h3> <h4>  {aData.restaurant._id}</h4>
                                </div>
                                <div className='item-input'>
                                    <h3>nom restaurant :</h3> <h4> {aData.restaurant.restaurantName}</h4>
                                </div>
                            </div>
                            <div className='image-box'></div>
                        </div>
                        <div className='item-input'>
                            <h3>Description : {aData.restaurant.description} </h3>
                        </div>
                        <div className='item-input'>
                            <h3>spécialité : {aData.restaurant.speciality}</h3>
                        </div>
                        <div className='item-input'>
                            <h3>E-mail : {aData.restaurant.email}</h3>
                        </div>
                        <div className='item-input'>
                            <h3>address : {aData.restaurant.address}</h3>
                        </div>
                        <div className='item-input'>
                            <h3>téléphone : {aData.restaurant.phone}</h3>
                        </div>
                        <div className='item-input'>
                            <h3> registre  : {aData.restaurant.registre}</h3>
                        </div >
                        <div className='item-input'>
                            <h3> tva : {aData.restaurant.tva}</h3>
                        </div>
                        <div className='item-input'>
                            <h3>Site Web : {aData.restaurant.siteweb} </h3>
                        </div>
                        <div className='item-input'>
                            {aData.restaurant.menue && <h3> Menue : {aData.restaurant.menue.nom} </h3>}
                        </div>
                    </div>}
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
                                            <td>{restaurant.restaurantName}</td>
                                            <td>{restaurant.speciality}</td>
                                            <td>{restaurant.email}</td>
                                            <td>{restaurant.phone}</td>
                                            <td onClick={() => {
                                                // let _id = restaurant._id
                                                handelOpenInfoResto()
                                                // setId(restaurant._id)
                                                // console.log(`id`, id)
                                                handelfetchRestaurant(restaurant._id)
                                                setID(restaurant._id)
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

