const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usuarios = require('./routes/usuarios');
const publicaciones = require('./routes/publicacion');
const auth = require('./routes/auth');
const google = require('./routes/google');

const connectionString = 'mongodb+srv://db_user:andres0613@cluster0.oxhtw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(connectionString)
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar a MongoDB'));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/google', google);
app.use('/api/publicaciones', publicaciones);


const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log('Conectado...');
});