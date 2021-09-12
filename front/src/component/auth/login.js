import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/notification'
// import {dispatchLogin} from '../../../redux/actions/authAction'
 import {useDispatch} from 'react-redux'



const initialState = {
    email: '',
    motDePasse: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, motDePasse, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/connexion', {email, motDePasse})
            console.log(`res`, res)
             setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            // dispatch(dispatchLogin())
            //history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

 
    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Adresse e-mail</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={motDePasse} name="motDePasse" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Connexion</button>
                    <Link to="/forgot_password">Mot de passe oublié?</Link>
                </div>
            </form>

   

        

            <p>New Customer? <Link to="/register">S'inscrire</Link></p>
        </div>
    )
}

export default Login
