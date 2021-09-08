const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Curso', cursoSchema);