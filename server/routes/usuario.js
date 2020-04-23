const express = require('express');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();
app.post('/usuario/consultar', (req, res) => {
    Usuario.find({ estado: true })

    .exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            count: usuarios.length,
            usuarios
        })
    });
});


app.post('/usuario/registrar', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)

    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.post('/usuario/obtener', (req, res) => {
    Usuario.find({}, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                usrDB
            });
        }
    });

});


app.put('/usuario/actualizar', (req, res) => {
    let id = req.body.id;
    let role = req.body.role;

    let body = _.pick(req.body, ['role']);

    Usuario.findOneAndUpdate({ id: id }, { role: role }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                usrDB
            });
        }
    });
});

app.delete('/usuario/borrar', (req, res) => {
    let id = req.body.id;

    Usuario.findOnedAndUpdate({ id: id }, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;