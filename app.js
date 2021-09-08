const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');

mongoose.connect('mongodb://localhost:27017/MP', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar a MongoDB'));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log('Conectado...');
});