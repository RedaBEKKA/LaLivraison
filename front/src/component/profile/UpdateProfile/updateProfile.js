import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderSideBarre from '../../adminPage/HeaderSideBarre'
import SideMenu from '../../SideMenu/SideMenuAdmin'
import axios from 'axios'
import logo2 from "../../../assets/user.jpg";
import { showErrMsg, showSuccessMsg } from '../../../utils/notification/notification'
import { isLength, isMatch, isName } from '../../../utils/validation/Validation'

function UpDateProfile() {
    const initialState = {
        fullName: '',
        motDePasse: '',
        cf_motDePasse: '',
        err: '',
        success: ''
    }
    const token = useSelector(state => state.token)

    const [data, setData] = useState(initialState)
    const { fullName, motDePasse, cf_motDePasse, err, success } = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [inactive, setInactive] = useState(true);
    const handelOpen = () => {
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
    const changeAvatar = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return setData({ ...data, err: "No files were uploaded.", success: '' })

            if (file.size > 1024 * 1024)
                return setData({ ...data, err: "Size too large.", success: '' })

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({ ...data, err: "File format is incorrect.", success: '' })

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: { 'content-type': 'multipart/form-data', 'x-access-token': token }
            })

            setLoading(false)
            setAvatar(res.data.url)

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }
    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }
    const handleUpdate = () => {
        if (fullName || avatar) updateInfor()
        if (motDePasse) updatePassword()
    }
    const updateInfor = () => {
        if (!isName(fullName))
            return setData({ ...data, err: "Le nom est invalide.", success: '' })

        try {
            axios.patch('/user/update', {
                fullName: fullName ? fullName : user.fullName,
                avatar: avatar ? avatar : user.avatar
            }, {
                headers: {
                    'x-access-token': token
                }
            })

            setData({ ...data, err: '', success: "mise à jour Succès !" })
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
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

    return (
        <div>
            <SideMenu />
            <HeaderSideBarre logo2={logo2} handleLogout={handleLogout} user={user} handelOpen={handelOpen} inactive={inactive} />
            <div className='profile_page'>
                <div className="col-left">
                    <div>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        {loading && <h3>Loading.....</h3>}
                    </div>
                    <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

                    <div className="avatar">
                        <img src={avatar ? avatar : user.avatar} alt="" />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input type="text" name="fullName" id="fullName" defaultValue={user.fullName}
                            placeholder="Your name" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" defaultValue={user.email}
                            placeholder="Your email address" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">nouveau mot de passe</label>
                        <input type="password" name="motDePasse" id="motDePasse" defaultValue=''
                            placeholder="Your password" value={motDePasse} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_motDePasse">Confirmer le nouveau mot de passe</label>
                        <input type="password" name="cf_motDePasse" id="cf_motDePasse" defaultValue=''
                            placeholder="Confirm password" value={cf_motDePasse} onChange={handleChange} />
                    </div>

                    <div>
                        <em style={{ color: "crimson" }}>
                            * Si vous mettez à jour votre mot de passe ici, vous ne pourrez pas
                            pour vous connecter rapidement en utilisant google et facebook.
                        </em>
                    </div>

                    <button disabled={loading} onClick={handleUpdate}>Update</button>
                </div>

            </div>
        </div>
    )
}

export default UpDateProfile
