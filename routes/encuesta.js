const express = require('express');
const Encuesta = require('../models/encuesta');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    let resultado = listarEncuestas();
    resultado.then(encuestas => {
        res.json(encuestas)
    }).catch(err => {
        res.status(400).json(
            {
                err
            }
        );
    });
});

ruta.post('/', (req, res) => {
    let body = req.body;

    let resultado = crearEncuesta(body);
    resultado.then( encuesta => {
        res.json({
            valor: encuesta
        })
    }).catch( err => {
        res.status(400).json({
            err
        })
    });
});

async function listarEncuestas() {
    let encuestas = await Encuesta.find()
    return encuestas;
}

async function crearEncuesta(body) {
    let encuesta = new Encuesta({
        genre: body.genre,
        fisica: body.fisica,
        fisicaSev: body.fisicaSev,
        psicologica: body.psicologica,
        sexual: body.sexual,
    });
    return await encuesta.save();
}

module.exports = ruta;