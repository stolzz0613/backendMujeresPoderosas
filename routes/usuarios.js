const express = require('express');
const Usuario = require('../models/usuario');
const Joi = require('@hapi/joi');
const ruta = express.Router();

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    cc: Joi.string(),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co']}}),

    job: Joi.string(),

    image: Joi.string(),

    linkedin: Joi.string(),

    github: Joi.string(),
});

ruta.get('/', (req, res) => {
    let resultado = listarUsuariosActivos();
    resultado.then(usuarios => {
        res.json(usuarios)
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
    const {error, value} = schema.validate({
        name: body.name,
        cc: body.cc,
        email: body.email,
        password: body.password,
        job: body.job,
        linkedin: body.linkedin,
        github: body.github,
        image: body.image
    });

    if (!error) {
        let resultado = crearUsuario(body);
        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    } else {
        res.status(400).json( err => {
            err
        });
    };
});

ruta.put('/:email', (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate({
        name: body.name,
    });

    if(!error) {
        let resultado = actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({
                valor: valor
            })
        }).catch( err => {
            res.status(400).json({
                err
            });
        });
    } else {
        res.status(400).json( err => {
            err
        })
    }
});

ruta.delete('/:email', (req, res) => {
    let resultado = desactivarUsuario(req.params.email);
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

async function crearUsuario(body) {
    let usuario = new Usuario({
        name: body.name,
        cc: body.cc,
        email: body.email,
        password: body.password,
        job: body.job,
        linkedin: body.linkedin,
        github: body.github,
        image: body.image
    });
    return await usuario.save();
}

async function listarUsuariosActivos() {
    let usuarios = await Usuario.find({'state': true}, {password: 0})
    return usuarios;
}

async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate({email: email}, {
        $set: {
            name: body.name,
        }
    }, {new: true});
    return usuario;
}

async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({email: email}, {
        $set: {
            state: false
        }
    }, {new: true});
    return usuario;
}

module.exports = ruta;