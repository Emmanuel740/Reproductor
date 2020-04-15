const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();
let count=0

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
            count= count +1

            return res.status(400).json({
              
                ok: false,
                err: {
                    message: '*Usuario y/o contraseña incorrecto'
                }


                
            });
        }
        
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o *contraseña incorrecto'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,

        });
    });
    if(count=3 ){
        return res.status(400).json({
         ok:false,
         err:{
message:"solo tienes 3 intentos "
         }   
        })
            }


});


module.exports = app;