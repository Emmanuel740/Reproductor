const express = require('express');
const Cancion = require('../models/cancion');
const app = express();

app.post('/cancion/registrar', (req, res) => {
    let body = req.body;

    let cancion = new Cancion({
        titulo: body.titulo,
        artista: body.artista,
        duracion: body.duracion,
        url: body.url

    });

    cancion.save((err, cancionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            cancionDB
        });
    });
});
app.post('/cancion/consultar', (req, res) => {
    Cancion.find({})

    .exec((err, canciones) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            count: canciones.length,
            canciones
        })
    });
});



module.exports = app;