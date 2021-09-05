const mongoose = require("mongoose");
const admin = require("../models/orders");
const express = require('express');
const router = express.Router();
const Admin = require('../middleware/admin')
const {auth} = require('../middleware/auth')

 const ajouterCmd = router.post('/ajouter', auth,
    async (req, res) => {
        console.log("ajouter une commande");
        let { titre, nom, prix, stars, temps, type } = req.body;
        titre,
            nom,
            prix,
            stars,
            temps,
            type


        if (titre == "" || nom == '' || prix == "" || stars == "" || temps == "" || type == "") {
            res.json({
                status: "FAILED",
                message: "Champs de saisie vides !",
            });
        } else if (!/^[a-zA-Z ]*$/.test(titre)) {
            res.json({
                status: "FAILED",
                message: "titre entré non valide",
            });
        } else if (!/^[a-zA-Z ]*$/.test(nom)) {
            res.json({
                status: "FAILED",
                message: "nomCategory entré non valide",
            });
        } else if (!/^[0-9 ]*$/.test(prix)) {
            res.json({
                status: "FAILED",
                message: "prix entré invalide",
            });
        }
        else if (!/^[0-9 ]*$/.test(stars)) {
            res.json({
                status: "FAILED",
                message: "stars entré invalide",
            });
        } else if (!/^[a-zA-Z ]*$/.test(type)) {
            res.json({
                status: "FAILED",
                message: "type entré invalide",
            });

        } else if (!/^[0-9 ]*$/.test(temps)) {
            res.json({
                status: "FAILED",
                message: "temps entré invalide",
            });

        }

        else {
            admin.find({ titre })
                .then((result) => {
                    if (result.length) {
                        // A user not exists
                        res.json({
                            status: "FAILED",
                            message: "La Commandes avec titre fournis existe deja",
                        });
                    }
                    else {
                        try {
                            const newAdmin = new admin({
                                titre,
                                nom,
                                prix,
                                stars,
                                temps,
                                type

                            });

                            newAdmin
                                .save()
                                .then((result) => {
                                    res.json({
                                        status: "SUCCESS",
                                        message: "ajout réussie",
                                        data: result,
                                    });
                                })

                        } catch (error) {
                            res.json({
                                status: "FAILED",
                                message: "Une erreur s'est produite lors de l'enregistrement de la nouvelle commande",
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "Une erreur s'est produite lors de la vérifier votre connection !",
                    });
                });





        }
    }

);




module.exports.ajouterCmd = ajouterCmd;
