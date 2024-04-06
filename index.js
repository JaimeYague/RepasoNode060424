//1. IMPORTS -> NPM; MODULOS PROPIOS
const express = require('express');
require('dotenv').config();
const characterRouter = require('./api/characters/character.router')
const { connectMongo } = require('./utils/db')
const { notFoundHandler, errorHandler } = require('./api/middleware/error.middleware')
// console.log(process.env); para ver todos los modulos que esta usando 


//2. CONFIGURACION

const PORT = process.env.PORT || 3000; // CONECTAMOS AL PUERTO O SI NO LO ENCUENTRA POR DEFECTO AL 3000
const app = express(); //EJECUTAMOS EXPRESS
app.use(express.json()); // CONVIERTE A JSON
app.use(express.urlencoded({ extended: true })); // DESENCRIPTA SIMOBOLOS EN URLS GRANDES
app.use((req, res, next) => {
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH"); //LOS METODOS APLICABLES A LA API
res.header("Access-Control-Allow-Credentials", true); // NECESITA CREDENCIALES PARA TRABAJARA
res.header("Access-Control-Allow-Headers", "Content-Type"); // PERMITE CONTENT TYPE (ENVIAR ARCHIVOS) (DOCUMENTACION AQUI: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Allow)
next();
});
connectMongo();

//3. ENDPOINTS

// app.get(ruta del endpoint, controlador)
app.get('/', (req, res) => {
    res.json({ message: 'El servidor esta funcionando' }); //las llaves {} son para que devuelva un objeto

});

app.use('/characters', characterRouter);

//4. MANEJO DE EXCEPCIONES / ERRORES


app.use(notFoundHandler);
app.use(errorHandler);


//5. ACTIVAR

/* app.listen(PORT), () => {
    console.log('el servidor se ha iniciado en el puerto: ${PORT}'); // FIJARSE LAS COMILLAS QUE SON DIFERENTES PARA QUE PILLE EL ${PORT}
};
*/
app.listen(PORT, () => {
    console.log(`El servidor se ha iniciado en el puerto: ${PORT}`);
  });
