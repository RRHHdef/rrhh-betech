const conn =  require('../database/config.JS')

let empleados = (req, res)=> {
    const {value} = req.params
    conn.query(`
    SELECT em_legajo, em_nombre,em_apellido, em_dni, em_fecnac, em_lugnac, em_fechaing, es_activo, el_elementos, do_real, do_legal, do_cod_postal, ro_rol, ro_sector, de_fec, de_motivo,de_elementos
    FROM empleados
    INNER JOIN domicilio
    ON empleados.do_codigo = domicilio.do_cod
    INNER JOIN paniol
    ON empleados.pa_codigo = paniol.pa_cod
    INNER JOIN rol
    ON empleados.ro_codigo = rol.ro_cod 
    INNER JOIN desvinculacion
    ON empleados.de_codigo = desvinculacion.de_cod
    INNER JOIN estado
    on empleados.es_codigo = estado.es_cod
    INNER JOIN elementos
    on empleados.el_codigo=elementos.el_cod`,
    (err, results) => {
      if (err) throw err;
      if(results.length === 0) res.json({ mssg: "no hay empleados cargado en la db"})
      
      res.json(results)
    });
};
 
let empleado = (req, res)=> {
  const {dni} = req.params
  conn.query(`
  SELECT em_cod, em_legajo, em_nombre, em_dni, em_fecnac, em_lugnac, em_fechaing, es_activo, el_elementos, do_real, do_legal, do_cod_postal, ro_rol, ro_sector, de_fec, de_motivo,de_elementos
  FROM empleados
  INNER JOIN domicilio
  ON empleados.do_codigo = domicilio.do_cod
  INNER JOIN paniol
  ON empleados.pa_codigo = paniol.pa_cod
  INNER JOIN rol
  ON empleados.ro_codigo = rol.ro_cod 
  INNER JOIN desvinculacion
  ON empleados.de_codigo = desvinculacion.de_cod
  INNER JOIN estado
  on empleados.es_codigo = estado.es_cod
  INNER JOIN elementos
  on empleados.el_codigo=elementos.el_cod where em_cod = ${dni};`,
  (err, results) => {
    if (err) throw err;

    if(results.length === 0) res.json({ mssg: "no hay empleados con el DNI solicitado cargado en la db"})

    res.json(results)
  })
};


module.exports= {
  empleados,
  empleado
}