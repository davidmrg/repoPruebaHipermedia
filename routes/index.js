// index controlador de rutas

const express = require('express');
var router = express.Router();
// const fs = require ('fs');

const Alumnos = require('../models/alumnos')

// configurar callback (async / await) para controlar ruta /
router.get('/', async (req, res) => {
    const listaRegistros = await Alumnos.find();
    res.render('index',{
        listaRegistros
    });
  });  

// configurar callback para controlar ruta /formularios
router.get('/formulario',(req, res) => {
    res.render('formulario',{
        mensaje: ''
    });
});


// configurar callback para controlar ruta /add

router.post('/add', async (req, res) => {
    console.log(new Alumnos (req.body)); // verificar si capturo los datos
    const objAlumnos = new Alumnos(req.body);
    await objAlumnos.save(); // función save() es para guardar en mongoDB
    res.render('formulario',{
        mensaje: 'Los datos han sido guardados'
    });
    
});


// callback para borrar datos
router.get('/delete', async (req, res) => {
    const listaRegistros = await Alumnos.find();
    res.render('delete', {
        listaRegistros
    });
});

// callback para borrar dato específico
router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Alumnos.remove({ _id: id });
    res.redirect('/');
})


// configurar un callback para controlar la ruta /edit

router.get('/edit', async(req, res) => {
    const listaRegistros = await Alumnos.find();
    res.render('edit',{
        listaRegistros
    });
});

// callback para buscar el registro a editar y para enviar
// ese registro a la ruta que actualizará el registro

router.get('/edit/:id', async (req, res) => {
    const listaRegistros = await Alumnos.find();
    const { id } = req.params;
    const alumno = await Alumnos.findById({ _id: id });
    res.render('updateForm',{
        alumno
    });
});

// callback de la ruta que actualizará el registro:

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Alumnos.updateOne({ _id: id }, req.body);
    console.log("datos actualizados");
    res.redirect('/');
});


/* 
// configurar callback para controlar ruta /calcula
router.post('/calcula', (req, res) => {
    res.render('calcula', {
        base: req.body.id
    });
    console.log('base: ' + req.body.id);

    var base = req.body.id;

    let crearArchivo = new Promise((resolve, reject) => {
        var datos = '';

        for(let i = 1; i <= 10; i++){
            console.log(`${base} * ${i} = ${base * i}`);
            datos += `${base} * ${i} = ${base * i} \n`;
        }

        // implementar writeFile:
        fs.writeFile(`tabla${base}.txt`, datos, (err) => {
            if(err){
                reject(err);
            }else{
                resolve(`tabla${base}.txt`)
            }
            console.log('archivo creado');
        });
    });

});
 */


  module.exports = router;

