const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    linkNoticia: {
        type: String,
        required: true
    },
    linkImagen: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        enum: ['noticia', 'web', 'cyb'],
        required: true
    },
    estado: {
        type: String,
        enum: ['guardada', 'publicada', 'archivada'],
        required: true
    }
});

module.exports = mongoose.model('publicacion', publicacionSchema);