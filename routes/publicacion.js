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

ruta.put('/:id', (req, res) => {
    let body = req.body;

    let resultado = actualizarPublicacion(req.params.id, req.body);
    resultado.then(valor => {
        res.json({
            valor: valor
        })
    }).catch( err => {
        res.status(400).json({
            err
        });
    });
});

ruta.delete('/:id', (req, res) => {
    let resultado = desactivarPublicacion(req.params.id);
    resultado.then(valor => {
        res.json({
            usuario: valor
        });
    }).catch(err => {
        res.status(400).json({
            err
        });
    });
});

async function actualizarPublicacion(id, body) {
    let publicacion = await Publicacion.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            linkNoticia: body.linkNoticia,
            linkImagen: body.linkImagen,
            categoria: body.categoria,
            estado: body.estado
        }
    }, {new: true});
    return publicacion;
}

async function listarPublicaciones() {
    let publicaciones = await Publicacion.find({estado: { $ne: 'archivada'}})
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

async function desactivarPublicacion(id) {
    let publicacion = await Publicacion.findByIdAndUpdate(id, {
        $set: {
            estado: 'archivada'
        }
    }, {new: true});
    return publicacion;
}

module.exports = ruta;