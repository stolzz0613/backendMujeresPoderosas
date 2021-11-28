const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true
    },
    fisica: {
        type: Number,
        required: true
    },
    fisicaSev: {
        type: Number,
        required: true
    },
    psicologica: {
        type: Number,
        required: true
    },
    sexual: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Encuesta', encuestaSchema);