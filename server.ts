import {AppRoutes} from './routes';
import * as dotenv from 'dotenv';
const bodyParser = require('body-parser');
const { auth } = require('express-oauth2-jwt-bearer');

const express = require('express');
const app = express();
// configuro las variables de entorno
dotenv.config();

const port = process.env.PORT || 3000;

const jwtCheck = auth({
    audience: 'https://api.example.com/estudiantes',
    issuerBaseURL: 'https://dev-lq11sai3ds0zfnei.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

app.use(jwtCheck);

app.use(bodyParser.json());

// Registramos todas las rutas de aplicacion
AppRoutes.forEach((route) => {
    app.use(route.path, route.action);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});