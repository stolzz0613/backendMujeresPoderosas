const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

ruta.post('/', (req, res) => {
    let resultado = login(req.body);

    resultado.then(logged => {
        res.json({
            logged
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

async function login(data) {
    let logged = false;
    let user = await Usuario.findOne({'email': data.email, state: true});

    (Object.keys(user).length > 0) && (user.password == data.password)
        ? logged = true
        : logged = false

    return logged;
}

module.exports = ruta;