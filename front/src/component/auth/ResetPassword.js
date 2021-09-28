import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/notification'
import {isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    motDePasse: '',
    cf_motDePasse: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {motDePasse, cf_motDePasse, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(motDePasse))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(motDePasse, cf_motDePasse))
            return setData({...data, err: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {motDePasse}, {
                // headers: {Authorization: token}
                headers: {
                    'x-access-token': token
                }
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }


    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>

            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="motDePasse">Password</label>
                <input type="password" name="motDePasse" id="motDePasse" value={motDePasse}
                onChange={handleChangeInput} />

                <label htmlFor="cf_motDePasse">Confirm Password</label>
                <input type="password" name="cf_motDePasse" id="cf_motDePasse" value={cf_motDePasse}
                onChange={handleChangeInput} />         

                <button onClick={handleResetPass}>Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword
