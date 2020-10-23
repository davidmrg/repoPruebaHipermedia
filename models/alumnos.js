const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// el esquema de la base de datos en mongodb
const AlumnoSchema = new Schema({
    nombre: String,
    contacto: String,
    comentario: String
});

// la colección se va llamar alumnos
module.exports = mongoose.model('alumnos', AlumnoSchema);

