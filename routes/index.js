// index controlador de rutas

const express = require('express');
const router = express.Router();
const fs = require ('fs');

// configurar callback para controlar ruta /
router.get('/', (req, res) => {
    res.render('home',{
        nombre: 'Juan Perez',
        edad: '25',
        hora: new Date().getHours()
    })
  });  

// configurar callback para controlar ruta /formularios
router.get('/formulario',(req, res) => {
    res.render('formulario');
});

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



  module.exports = router;

