// Similar a import express from 'express';
const express = require('express');
const { dbConnection } = require('./database/config');
// Configurar CORS - configurar desde donde se pueden hacer peticiones a nuestro servicio
// npm i cors
const cors = require('cors');

// Para manejar variables de entorno
// npm i dotenv
require('dotenv').config();

// Crear el servidor express
const app = express();

// Base de datos
dbConnection();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );

// Puerto
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});

// Para correr la máquina con el nodemon
// npm run start:dev
// En visual studio en la parte inferior en npm scipts, se puede hacer doble click

// Un middleware son aplicaciones que se usan para llegar a otras