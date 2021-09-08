const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
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

module.exports = mongoose.model('Usuario', usuarioSchema);