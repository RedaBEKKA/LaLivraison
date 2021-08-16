const mongoose = require("mongoose");
const Client = require("../models/schemaUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const inscrireUser = async (req, res) => {
  console.log("je vais m'inscrire");
  const data = req.body;
  const mdp = await bcrypt.hash(data.motDePasse, 12);
  try {
    const telExistant = await Client.findOne({ telephone: data.telephone });
    if (telExistant)
      return res.json({ message: "Numero de telephone deja utilisé" });
    const newUser = new Client({ ...data, motDePasse: mdp });
    await newUser.save();
    const token = jwt.sign(
      { telephone: newUser.email, id: newUser._id },
      "test",
      { expiresIn: "1h" }
    );

    console.log(newUser);
    res.status(201).json({ token, result: newUser });
  } catch (error) {
    console.log(error);
  }
};

const authentifier = async (req, res) => {
  const { telephone, motDePasse } = req.body;
  console.log({ telephone, motDePasse });
  try {
    const userExistant = await Client.findOne({ telephone });

    if (!userExistant)
      return res.json({ error: "compte utilisateur  non trouvé" });
    const correctMdp = await bcrypt.compare(
      motDePasse,
      userExistant.motDePasse
    );

    if (correctMdp) {
      const token = jwt.sign(
        { telephone: userExistant.email, id: userExistant._id },
        "test",
        { expiresIn: "1h" }
      );

      return res.status(200).json({ result: userExistant, token });
    } else {
      console.log("mot de passe errone");
      return res.json({ error: "mot de passe errone" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.authentifier = authentifier;
module.exports.inscrireUser = inscrireUser;
