const express = require('express');
const app = express();
const hbs = require('hbs');
const router = express.Router();

//importar las rutas:
const indexRoutes = require('./routes/index');

 // acceso a vars de entorno global para poder recibir el puerto que el proveedor conceda.
const port = process.env.PORT || 3000;

// middleware:
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false})); //entiende los datos que vienen desde un form html

// implementar hbs:
hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine','hbs');

// cada vez que el server reciba peticion a /, usaremos indexRoutes
app.use('/', indexRoutes);
 
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

