const express = require('express');
const ruta = express.Router();
const fs = require('fs');

ruta.get('/:type', (req, res) => {
    let object = req.params.type === 'noticias' ? 'noticias.json' : 'convocatorias.json'
    fs.readFile('./items/' + object, (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

module.exports = ruta;