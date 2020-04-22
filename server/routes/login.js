const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const app = express();
let count = 0

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            count = count + 1

            return res.status(400).json({

                ok: false,
                err: {
                    message: '*Usuario y/o contraseña incorrecto'
                }



            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            count = count + 1
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o *contraseña incorrecto'
                }
            });
        }


        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token,
            mensaje: 'Bienvenido ' + usuarioDB.nombre + '!'


        });
    });
    if (count === 3) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "solo tienes 3 intentos "
            }
        })
    }


});


module.exports = app;