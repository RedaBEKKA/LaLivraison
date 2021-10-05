import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../../src/utils/notification/notification'
import { isEmpty, isEmail, isLength, isMatch, isPhone ,isName} from '../../utils/validation/Validation'
import ChatBot from '../chatBot/ChatBot'
import ShinBarreMenu from '../newBarreMenu/shinBarreMenu'


const initialState = {
    fullName: '',
    email: '',
    telephone: '',
    motDePasse: '',
    cf_motDePasse: '',
    err: '',
    success: ''
}

function Register() {

    const [user, setUser] = useState(initialState)
    const { fullName, email, telephone, motDePasse, cf_motDePasse, err, success } = user
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(fullName) || isEmpty(motDePasse) || isEmpty(cf_motDePasse) || isEmpty(telephone))
            return setUser({ ...user, err: "Merci de remplir tous les champs.", success: '' })

        if (!isName(fullName))
            return setUser({ ...user, err: "Le nom est invalide.", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "E-mail invalide.", success: '' })

        if (!isPhone(telephone))
            return setUser({ ...user, err: "Numéro téléphone invalide.", success: '' })

        if (isLength(motDePasse))
            return setUser({ ...user, err: "Le mot de passe doit être au moins de 6 caractères.", success: '' })

        if (!isMatch(motDePasse, cf_motDePasse))
            return setUser({ ...user, err: "Le mot de passe ne correspond pas.", success: '' })

        try {
            const res = await axios.post('/user/inscrire', {fullName, email, motDePasse,telephone})
            console.log(`res`, res)
            setUser({ ...user, err: '', success: res.data.msg })
            localStorage.setItem('firstLogin', true)

        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <div className="login_page">
            
            <h2>S'inscrire</h2>
            <ChatBot />
        <ShinBarreMenu />

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Nom</label>
                    <input type="text" placeholder="Entrez votre nom" id="fullName"
                        value={fullName} name="fullName" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="email">Adresse e-mail</label>
                    <input type="text" placeholder="Entrer l'adresse e-mail" id="email"
                        value={email} name="email" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="telephone">Numéro téléphone</label>
                    <input type="text" placeholder="Entrer l'adresse e-mail" id="telephone"
                        value={telephone} name="telephone" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input type="password" placeholder="Entrer le mot de passe" id="motDePasse"
                        value={motDePasse} name="motDePasse" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="cf_motDePasse">Confirm Password</label>
                    <input type="password" placeholder="Confirmez le mot de passe" id="cf_motDePasse"
                        value={cf_motDePasse} name="cf_motDePasse" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">S'inscrire</button>
                </div>
            </form>

            <p> Vous avez déjà un compte? ? <Link to="/connexion">Connexion</Link></p>
        </div>
    )
}

export default Register
