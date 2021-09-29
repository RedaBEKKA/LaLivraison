import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderSideBarre from '../../adminPage/HeaderSideBarre'
import SideMenu from '../../SideMenu/SideMenuAdmin'
import axios from 'axios'
import logo2 from "../../../assets/user.jpg";
import { showErrMsg, showSuccessMsg } from '../../../utils/notification/notification'
import { isLength, isMatch, isName } from '../../../utils/validation/Validation'

function InfoProfile() {
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
            <div className='Big-container'>
                <div className="title-box">
                    <div className='image-box'>
                        <img src={logo2}/>
                    </div>
                    <div className='nameUser'>
                        {user.fullName}
                    </div>
                </div>
                <div className='body-container'>
                    <div className='col-left'>
                        <div className='title-col-left'>
                            A propos
                        </div>

                    </div>
                    <div className='col-right'>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default InfoProfile
