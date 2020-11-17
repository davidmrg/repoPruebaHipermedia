const express = require('express');
const app = express();

const router = express.Router();

// Librería para mongoDB:
var mongoose = require('mongoose');


//importar las rutas:
const indexRoutes = require('./routes/index');

// acceso a vars de entorno global para poder recibir el puerto que el proveedor conceda.
const port = process.env.PORT || 3000;

// middleware:
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({ extended: false })); //entiende los datos que vienen desde un form html

// implementar ejs:
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// cada vez que el server reciba peticion a /, usaremos indexRoutes
app.use('/', indexRoutes);

// configurar mongoose para ejecutar promesas
mongoose.Promise = global.Promise;


// callback de conexión con la base de datos:
mongoose.connect("mongodb+srv://hipermedia:8ROJaRfyxBM1beyB@cluster0.dcafu.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log('La conexión con la base de datos se hizo correctamente');

        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })

