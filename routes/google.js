const express = require('express');
const Usuario = require('../models/usuario');
const ruta = express.Router();
let googleSheet = require('../models/googleSheets/spreadsheet');

ruta.get('/', async (req, res) => {
    resultado = await googleSheet.accederGoogleSheet();

    let data = [];

    resultado.map( (r, i) => data.push({autor: r.autor, frase: r.frase}));
    res.json(data)
});

module.exports = ruta;