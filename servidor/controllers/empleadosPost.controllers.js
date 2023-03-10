const { validationResult } = require('express-validator');


/*const postEmpleados = (req, res) => {
    
    const {nombre, apellido, email, telefono, domicilioReal, domicilioLegal, ciudad, cp, dni, fechaNacimiento, lugarNacimiento, fechaIngreso, 
        rol, elementos} = req.body

    console.log(req.body)

    conn.query('INSERT INTO contacto(co_email, co_tel) VALUES(?,?)',
    [email, telefono],
    (error, results) => {
        if(error)
            throw error;
        res.status(201).json({"Item añadido correctamente": results.affectedRows});

        const co_codigo = results.insertId;

    conn.query( "INSERT INTO empleados(em_nombre, em_apellido, em_dni, em_fecnac, em_lugnac, em_fechaing, do_codigo, pa_codigo, ro_codigo, de_codigo, el_codigo, co_codigo, es_codigo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [nombre, apellido, dni, fechaNacimiento, lugarNacimiento, fechaIngreso, 1,2,3,4,5,co_codigo,7],
    (error, results) => {
        if(error)
            throw error;
        res.status(201).json({"Item añadido correctamente": results.affectedRows});

    });
    })
        
    

    conn.query('INSERT INTO domicilio (do_real, do_legal, do_cod_postal, do_ciudad) VALUES(?,?,?,?)',
    [domicilioReal, domicilioLegal, cp, ciudad],
    (error, results) => {
        if(error)
            throw error;
        res.status(201).json({"Item añadido correctamente": results.affectedRows});

})

    conn.query('INSERT INTO elementos(el_elementos, el_cantidad) VALUES(?,?)',
    [elementos, 1],
    (error, results) => {
        if(error)
            throw error;
        res.status(201).json({"Item añadido correctamente": results.affectedRows});

})

    conn.query('INSERT INTO rol (ro_sector, ro_rol) VALUES(?,?)',
    ['a definir', rol],
    (error, results) => {
        if(error)
            throw error;
        res.status(201).json({"Item añadido correctamente": results.affectedRows});

})

}

module.exports = postEmpleados
*/
const conn =  require('../database/config.js')
const postEmpleados = async (req, res) => {
    
    const {nombre, apellido, email, telefono, domicilioReal, domicilioLegal, ciudad, cp, dni, fechaNacimiento, lugarNacimiento, fechaIngreso, 
        rol, elementos} = req.body

    const verifDni = conn.query('SELECT em_dni FROM empleados WHERE em_dni = ?',
    [dni])
            
    if(verifDni.length > 0){
        res.status(401).json({data: 'Ya existe otro empleado con este dni'})
        console.log('Ya existe el dni')
        return
    } else {
        console.log('No existe el dni en la data base todo ok pa agenda al guacho')
    }
    // verficicacion si existe un dni en la DB
    
    try {
        const coResults = await conn.promise().query('INSERT INTO contacto(co_email, co_tel) VALUES(?,?)', [email, telefono]);
        const co_codigo = coResults[0].insertId;

        const esResults = await conn.promise().query('INSERT INTO estado (es_activo) VALUES(?)', ['si']);
        const es_codigo = esResults[0].insertId;

        const emResults = await conn.promise().query("INSERT INTO empleados(em_nombre, em_apellido, em_dni, em_fecnac, em_lugnac, em_fechaing, do_codigo, pa_codigo, ro_codigo, de_codigo, el_codigo, co_codigo, es_codigo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [nombre, apellido, dni, fechaNacimiento, lugarNacimiento, fechaIngreso, 1,2,3,4,5,co_codigo,es_codigo]);

        const doResults = await conn.promise().query('INSERT INTO domicilio (do_real, do_legal, do_cod_postal, do_ciudad) VALUES(?,?,?,?)', [domicilioReal, domicilioLegal, cp, ciudad]);

        const elResults = await conn.promise().query('INSERT INTO elementos(el_elementos, el_cantidad) VALUES(?,?)', [elementos, 1]);

        const roResults = await conn.promise().query('INSERT INTO rol (ro_sector, ro_rol) VALUES(?,?)', ['a definir', rol]);

        res.status(201).json({"Item añadido correctamente": emResults[0].affectedRows});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar datos en la base de datos' });
    }

}
module.exports = postEmpleados