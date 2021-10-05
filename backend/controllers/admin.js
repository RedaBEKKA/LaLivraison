const mongoose = require("mongoose");
const admin = require("../models/orders");
const Restaurants = require("../models/restaurants");
const Orders = require("../models/orders");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");



const adminController = {

    ajouterOrders: async (req, res) => {
        console.log("ajouter une commande");
        let { nom, prix, type, stars, temps, Extra, restaurant, format } = req.body;

        nom,
            prix,
            stars,
            temps,
            type,
            Extra,
            restaurant,
            format

        if (nom == '' || prix == "" || stars == "" || temps == "" || type == "" || Extra == "" || restaurant == "" || format == "") {

            res.json({
                status: "FAILED",
                message: "Champs de saisie vides !",
            });

        } else if (!/^[a-zA-Z ]*$/.test(nom)) {
            res.json({
                status: "FAILED",
                message: "nomCategory entré non valide",
            });
        } else if (!/^[0-9]*$/.test(prix)) {
            res.json({
                status: "FAILED",
                message: "prix entré invalide",
            });
        } else if (!/^[0-9]*$/.test(stars)) {
            res.json({
                status: "FAILED",
                message: "stars entré invalide",
            });
        } else if (!/^[a-zA-Z ]*$/.test(type)) {
            res.json({
                status: "FAILED",
                message: "type entré invalide",
            });

        } else if (!/^[a-zA-Z ]*$/.test(Extra)) {
            res.json({
                status: "FAILED",
                message: "Extra entré invalide",
            });

        }
        // else if (!/^[a-zA-Z ]*$/.test(nomRestaurant)) {
        //     res.json({
        //         status: "FAILED",
        //         message: "nomRestaurant entré invalide",
        //     });

        // } 
        else if (!/^[0-9 ]*$/.test(temps)) {
            res.json({
                status: "FAILED",
                message: "temps entré invalide",
            });

        } else if (!/^[a-zA-Z  ]*$/.test(format)) {
            res.json({
                status: "FAILED",
                message: "format entré invalide",
            });

        }
        else {
            admin.find({ nom })
                .then((result) => {
                    if (result.length) {
                        // A user not exists
                        res.json({
                            status: "FAILED",
                            message: "Le plat avec nom fournis existe deja",
                        });
                    }
                    else {
                        try {
                            const newAdmin = new admin({
                                nom,
                                prix,
                                stars,
                                temps,
                                type,
                                Extra,
                                restaurant,
                                format


                            });

                            newAdmin
                                .save()
                                .then((result) => {
                                    res.json({
                                        status: "SUCCESS",
                                        message: "creation de la commande réussie",
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
                        message: err,
                    });
                });





        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Orders.find()

            res.json(orders)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getOneOrder: async (req, res) => {
        try {
            // let _id = req.body
            let _id = req.params.id
            if (!_id) {
                res.json({
                    status: "FAILED",
                    message: "restaurant n'existe pas ",
                });
            } else {
                const orders = await Orders.findById(_id)

                res.json({
                    status: "success",
                    orders,
                });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteOrder: async (req, res) => {
        try {
            await Orders.findByIdAndDelete(req.params.id)

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { nom, prix, type, stars, temps, Extra, restaurant, format } = req.body
            const NewOrder = await Orders.findOneAndUpdate({ _id: req.params.id }, {
                nom, prix, type, stars, temps, Extra, restaurant, format
            })

            res.json({ msg: "Update Success!", NewOrder })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    ajouterResto: async (req, res) => {
        let { restaurantName, description, siteweb, address, phone, registre, email, tva, img, speciality,menue } = req.body;
        restaurantName,
            description,
            speciality,
            address,
            phone,
            registre,
            tva,
            img,
            siteweb,
            email,
            menue

        if (restaurantName == "" || description == '' || address == "" || phone == "" || registre == "" || tva == "" || speciality == '' || siteweb == '' || email == '') {
            res.json({
                status: "FAILED",
                message: "Champs de saisie vides !",
            });
        } else if (!/^([a-zA-Z]+[ ]?|[a-zA-Z]+['-]?[])+$/.test(restaurantName)) {
            res.json({
                status: "FAILED",
                message: "restaurantName entré non valide",
            });

        } else if (!/^([a-zA-Z]+[ ]?|[a-zA-Z]+['-]?[])+$/.test(description)) {
            res.json({
                status: "FAILED",
                message: "Sous-titre entré non valide",
            });
        } else if (!/^[#.0-9a-zA-Z\s,-]+$/.test(address)) {
            res.json({
                status: "FAILED",
                message: "address entré non valide",
                // #1, North Street, Chennai - 11 true
                // $1, North Street, Chennai @ 11 false
            });
        }
        else
            if (!(/\d/, /\d/, ' ', /[a-zA-Z]{1}/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '/', /\d/, /\d/).test(registre)) {
                res.json({
                    status: "FAILED",
                    message: "numéro de registre entré non valide",

                });
            }
            // else if (!/((https?|http):\/\/)?(www\\.)?([a-z]+[.])?[a-z0-9-]+([.][a-z]{2,4}){1,2}(\\.*[?].*)?$/.test(siteweb)) {
            else if (!(/https?:\/\/(www\.)?(?!www\.)([A-Za-z0-9\-@_~]+\.)[A-Za-z]{2,}(:[0-9]{2,5})?(\.[A-Za-z0-9\/_\-~?&=]+)*/).test(siteweb)) {
                res.json({
                    status: "FAILED",
                    message: "siteweb entré non valide",

                });
            }
            else if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
                res.json({
                    status: "FAILED",
                    message: "email entré non valide",

                });
            }
            else if (!/(0|\+213)[5-7]([0-9]{2}){4}$/.test(phone)) {
                res.json({
                    status: "FAILED",
                    message: "numéro téléphone entré non valide",
                });
            } else {
                Restaurants.find({ registre })
                    .then((result) => {
                        if (result.length) {
                            // A user not exists
                            res.json({
                                status: "FAILED",
                                message: "restaurant existe deja",
                            });
                        }
                        else {
                            try {
                                const newRestaurant = new Restaurants({
                                    restaurantName,
                                    description,
                                    speciality,
                                    address,
                                    phone,
                                    registre,
                                    tva,
                                    img,
                                    siteweb,
                                    email,

                                });

                                newRestaurant
                                    .save()
                                    .then((result) => {
                                        res.json({
                                            status: "SUCCESS",
                                            message: "Le nouveau restaurant a été enregistré avec succès!",
                                            data: result,
                                        });
                                    })

                            } catch (error) {
                                res.json({
                                    status: "FAILED",
                                    message: "Une erreur s'est produite lors de l'enregistrement de Le nouveau restaurant",
                                });
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({
                            status: "FAILED",
                            message: "Une erreur s'est produite, vérifier votre connection !",
                        });
                    });





            }

    },
    getAllRestaurants: async (req, res) => {
        try {
            await Restaurants.find()
            .populate('menue')
            .exec()
            .then(re =>{
                res.json(re)
            })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getOneRestaurant: async (req, res) => {
        try {
            // let _id = req.body
            let _id = req.params.id
            if (!_id) {
                res.json({
                    status: "FAILED",
                    message: "id restaurant est null ",
                });
            } else {
                await Restaurants.findById(_id)
                    .populate('menue')
                    .exec()
                    .then(restaurant => {
                        res.status(200).json({
                            status: "success",
                            count: restaurant.length,
                            restaurant,
                        })

                    })

                // res.json({

                //     Restaurant,
                // });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteRestaurent: async (req, res) => {
        try {
            await Restaurants.findByIdAndDelete(req.params.id)

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateRestaurent: async (req, res) => {
        try {
            const { restaurant, email, description, speciality, address, phone, registre, tva, img, siteweb } = req.body
            const resto = await Restaurants.findOneAndUpdate({ _id: req.params.id }, {
                restaurant, email, description, speciality, address, phone, registre, tva, img, siteweb
            })

            res.json({ msg: "Update Success!", resto })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }




}


module.exports = adminController;
