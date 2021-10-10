const express = require('express');
const Publicacion = require('../models/publicacion');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    let resultado = listarPublicaciones();
    resultado.then(publicaciones => {
        res.json(publicaciones)
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

    let resultado = crearPublicacion(body);
    resultado.then( publicacion => {
        res.json({
            valor: publicacion
        })
    }).catch( err => {
        res.status(400).json({
            err
        })
    });
});

async function listarPublicaciones() {
    let publicaciones = await Publicacion.find()
    return publicaciones;
}

async function crearPublicacion(body) {
    let publicacion = new Publicacion({
        titulo: body.titulo,
        linkNoticia: body.linkNoticia,
        linkImagen: body.linkImagen,
        categoria: body.categoria,
        estado: body.estado,
    });
    return await publicacion.save();
}

module.exports = ruta;