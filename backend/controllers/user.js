const Client = require("../models/schemaUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')

const sendgridTransport = require('nodemailer-sendgrid-transport')

const { CLIENT_URL } = process.env

const transporter = nodemailer.createTransport(sendgridTransport({
  host: process.env.EMAIL_SERVICE,
  port: 465,
  auth: {
    api_key: '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'
  }
}))

const userController = {
  inscrireUser: async (req, res) => {
    console.log("je vais m'inscrire");
    const { fullName, email, motDePasse, telephone } = req.body

    const mdp = await bcrypt.hash(motDePasse, 12);
    try {
      const telExistant = await Client.findOne({ telephone });
      if (telExistant)
        return res.json({ message: "Numero de telephone deja utilisé" });

      if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.status(400).json({ msg: "Invalid emails." })
      }



      const user = await Client.findOne({ email })
      if (user) return res.status(400).json({ msg: "This email already exists." })

      if (motDePasse.length < 6)
        return res.status(400).json({ msg: "Password must be at least 6 characters." })

      const newUser = new Client({ motDePasse: mdp, fullName, email, telephone });

      const activation_token = newUser.generateTokens()

      console.log(`activation_token`, activation_token)


      const url = `${CLIENT_URL}/user/activate/${activation_token}`


      try {
        transporter.sendMail({
          to: email,
          from: 'insigned11@gmail.com',
          subject: 'BIGNOVA-DELIV activation du compte',
          html: `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Bienvenue à BIGNOVA✮DELIV.</h2>
          <p>Toutes nos félicitations! Vous êtes presque prêt à commencer à utiliser BIGNOVA✮DELIV.<br>
          Cliquez simplement sur le bouton ci-dessous pour valider votre adresse e-mail.
          </p>
          
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block ; ">aller</a>
      
          <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous:</p>
      
          <div>${url}</div>
          </div>
      `

        })
        res.json({
          status: "SUCCESS",
          message: "félicitations inscription réussi ! Veuillez activer votre compte pour commencer",


        });


      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message })


      }

    }

    catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message })
    }
  },
  activateEmail: async (req, res) => {

    try {
      const { activation_token } = req.body

      const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
      console.log(`user`, user)
      const { fullName, email, motDePasse, telephone } = user

      const check = await Client.findOne({ email })
      if (check) return res.status(400).json({ msg: "This email already exists." })

      const newUser = new Client({
        fullName, email, motDePasse, telephone
      })

      await newUser.save()

      console.log(`newUser`, newUser)
      res.json({ msg: "Account has been activated!" })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  authentifier: async (req, res) => {
    console.log("je vais m'authentifier");

    const { motDePasse, email } = req.body;
    console.log({ motDePasse, email });
    try {
      //const userExistant = await Client.findOne({ telephone  });
      const userEmail = await Client.findOne({ email });
      if (!userEmail) return res.status(400).json({ msg: "Cet utilisateur n'existe pas." })

      const isMatch = await bcrypt.compare(
        motDePasse,
        userEmail.motDePasse
      );
      if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

      const refresh_token = createRefreshToken({ id: userEmail._id })
      let options = {
        path: '/user/refreshtoken',
        sameSite: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,// 7 days
        httpOnly: true, // The cookie only accessible by the web server
      }
      console.log(`refresh_token`, refresh_token)
      res.cookie('x-access-token', refresh_token, options)


      console.log(`userEmail`, userEmail)
      res.json({ msg: "Login success!" })

    } catch (error) {
      console.log(error);
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies['x-access-token'];
      console.log(`rf_token`, rf_token)
      if (!rf_token) return res.status(400).json({ msg: "no. token Please login now !" })

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" })

        const access_token = createAccessToken({ id: user.id })
        res.json({ access_token })
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body
      const user = await Client.findOne({ email })
      if (!user) return res.status(400).json({ msg: "Cet e-mail n'existe pas." })

      const access_token = createAccessToken({ id: user._id })
      const url = `${CLIENT_URL}/user/reset/${access_token}`

      try {
        transporter.sendMail({
          to: email,
          from: 'insigned11@gmail.com',
          subject: 'BIGNOVA-DELIV mot de passe oublié ',
          html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Bienvenue à BIGNOVA✮DELIV.</h2>
            <p> BIGNOVA✮DELIV.<br>
            Cliquez simplement sur le bouton ci-dessous pour réinitialiser votre mot de passe.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block ; ">aller</a>
        
            <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous:</p>
        
            <div>${url}</div>
            </div>
        `

        })
        res.json({
          status: "SUCCESS",
          message: "félicitations lien envoyer  ! Veuillez verfier votre email",


        });

        console.log(`access_token`, access_token)
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message })


      }
      // res.json({ msg: "Re-send the password, please check your email." })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async (req, res) => {
    try {

      const { motDePasse } = req.body
      console.log(motDePasse)

      const passwordHash = await bcrypt.hash(motDePasse, 12)
      const token = req.headers['x-access-token']
      console.log(`req params`, token)

      decodeData = jwt.verify(token, process.env.ACCESS_TOKEN)
      req.userId = decodeData?.id;

      //console.log(`ruser.ids`, {id :user.id})
      await Client.findOneAndUpdate(req.userId, {
        motDePasse: passwordHash
      })

      res.json({ msg: "Password successfully changed!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const token = req.headers['x-access-token']
      console.log(`req params`, token)

      decodeData = jwt.verify(token, process.env.ACCESS_TOKEN)
      req.userId = decodeData?.id;

      const user = await Client.findById(req.userId).select('-password')

      res.json(user)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await Client.find().select('-password')

      res.json(users)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('x-access-token', { path: '/user/refreshtoken' })
      return res.json({ msg: "Logged out." })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateUser: async (req, res) => {
    try {
      const { fullName, avatar } = req.body
      await Client.findOneAndUpdate({ _id: req.user.id }, {
        fullName, avatar
      })

      res.json({ msg: "Update Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body

      await Client.findOneAndUpdate({ _id: req.params.id }, {
        role
      })

      res.json({ msg: "Update Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Client.findByIdAndDelete(req.params.id)

      res.json({ msg: "Deleted Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },


}

const createActivationToken = ({ payload }) => {
  return jwt.sign({ payload }, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '15m' })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userController;
