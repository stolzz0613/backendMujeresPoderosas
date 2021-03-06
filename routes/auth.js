const express = require('express');
const Usuario = require('../models/usuario');
const ruta = express.Router();

ruta.post('/', (req, res) => {
    let resultado = login(req.body);

    resultado.then(user => {
        res.json({
            user
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

async function login(data) {
    let user = await Usuario.findOne({'email': data.email, state: true});

    if (Object.keys(user).length > 0 && user.password == data.password) {
        return ({
            logged: true,
            name: user.name,
            cc: user.cc,
            email: user.email,
            image: user.image,
        })
    } else {
        return ({
            logged: false,
        });
    }

}

module.exports = ruta;