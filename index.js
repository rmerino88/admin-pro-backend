// Similar a import express from 'express';
const express = require('express');
const { dbConnection } = require('./database/config');
// Configurar CORS - configurar desde donde se pueden hacer peticiones a nuestro servicio
// npm i cors
const cors = require('cors');

// Importación necesaria para la subida de ficheros
const expressFileUpload = require('express-fileupload');

// Para manejar variables de entorno
// npm i dotenv
require('dotenv').config();

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Subida de ficheros
app.use(expressFileUpload());

// Base de datos
dbConnection();

// Direcciones publicas
app.use( express.static('public') );

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );

// Puerto
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});

// Para correr la máquina con el nodemon
// npm run start:dev
// En visual studio en la parte inferior en npm scipts, se puede hacer doble click

// Un middleware son aplicaciones que se usan para llegar a otras


// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));