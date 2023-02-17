const express = require('express')
const {empleados, empleado} =  require('../controllers/empleados.controllers.js')
const postEmpleados = require ('../controllers/empleadosPost.controllers.js')
const {body} = require("express-validator") // instalar npm express-validator

const route = express.Router()

route.get('/empleados/:value', empleados)
route.get('/empleado/:dni', empleado)
route.post("/nuevo",
[
    body('nombre')
        .exists()
        .trim()
        .isLength({min: 5})
        .withMessage('Debes ingresar un valor'),
    
    body("apellido")
        .exists()
        .trim()
        .isLength({min: 5}),

     body("domicilioReal")
        .exists()
        .trim()
        .isLength({min: 5}),

    body("domicilioLegal")
        .exists()
        .trim()
        .isLength({min: 5}),

    body("ciudad")
        .exists()
        .trim(),

    body('cp')
        .exists()
        .trim()
        .toInt(),

    body("dni")
        .exists()
        .trim()
        .toInt()
        .withMessage('Debes ingresar un numero de DNI'),

    body('fechaNacimiento')
        .exists()
        .trim()
        .isDate()
        .withMessage('Debes ingresar una fecha valida'),

    body('lugarNacimiento')
        .exists()
        .trim(),

        body('lugarNacimiento')
        .exists()
        .trim()
        .isDate()
        .withMessage('Debes ingresar una fecha valida'),

    body('fechaIngreso')
        .exists()
        .trim()
        .isDate(),
        
    body('rol')
        .exists(),
        
    body('elementos')
        .exists()
        .trim()
],
 postEmpleados)




module.exports = route