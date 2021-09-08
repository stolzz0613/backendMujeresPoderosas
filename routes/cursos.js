const express = require('express');
const Curso = require('../models/curso_models');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    let resultado = listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos)
    }).catch(err => {
        res.status(400).json(
            {
                err
            }
        );
    });
});

ruta.post('/', (req, res) => {
    let resultado = crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});

ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json({
            curso
        });
    }).catch(err => {
        res.status(400).json({
            err
        });
    });
})

async function listarCursosActivos() {
    let cursos = await Curso.find({'state': true});
    return cursos;
}

async function crearCurso(body) {
    let curso = new Curso({
        title       : body.title,
        description  : body.description,
    });
    return await curso.save();
}

async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            title: body.title,
            description: body.description
        }
    }, {new: true});
    return curso;
}

async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            state: false
        }
    }, {new: true});
}

module.exports = ruta;