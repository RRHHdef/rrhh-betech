const conn =  require('../database/config.JS')

let empleados = (req, res)=> {
    const {value} = req.params
    conn.query(`SELECT COD_EMPLEADO, EM_NOMBRE, EM_APELLIDO, EM_DNI, EM_FECNAC, EM_LUGNAC, EM_FECHAING, EM_ACT, EM_ELEM, DO_REAL, DO_LEGAL, DO_COD_POSTAL, RO_ROL, RO_SECTOR, DE_FECHA, DE_MOTIVO,  DE_ELEMENTOS FROM EMPLEADOS INNER JOIN DOMICILIO ON EMPLEADOS.DO_CODIGO = DOMICILIO.DO_CODIGO INNER JOIN PANIOL ON EMPLEADOS.PA_CODIGO = PANIOL.PA_CODIGO INNER JOIN ROL ON EMPLEADOS.RO_CODIGO = ROL.RO_COD INNER JOIN DESVINCULACION  ON EMPLEADOS.DE_CODIGO = DESVINCULACION.DE_COD where COD_EMPLEADO> ${value};`,
    (err, results) => {
      if (err) throw err;
      if(results.length === 0) res.json({ mssg: "no hay empleados cargado en la db"})
      
      res.json(results)
    });
};
 
let empleado = (req, res)=> {
  const {dni} = req.params
  conn.query(`SELECT EM_NOMBRE, EM_APELLIDO, EM_DNI, EM_FECNAC, EM_LUGNAC, EM_FECHAING, EM_ACT, EM_ELEM, DO_REAL, DO_LEGAL, DO_COD_POSTAL, RO_ROL, RO_SECTOR, DE_FECHA, DE_MOTIVO,  DE_ELEMENTOS FROM EMPLEADOS INNER JOIN DOMICILIO ON EMPLEADOS.DO_CODIGO = DOMICILIO.DO_CODIGO INNER JOIN PANIOL ON EMPLEADOS.PA_CODIGO = PANIOL.PA_CODIGO INNER JOIN ROL ON EMPLEADOS.RO_CODIGO = ROL.RO_COD INNER JOIN DESVINCULACION  ON EMPLEADOS.DE_CODIGO = DESVINCULACION.DE_COD where COD_EMPLEADO = ${dni};`,
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


const sectores = {
    'Recursos Humanos': ['Seleccion de personal', 'Administracion'],
    'Sistemas': ['Odoo', 'Desarrollo', 'Digitalizacion'],
    'Infraestructura': ['Telecomunicaciones', 'Servidores', 'Mantenimiento', 'Redes'],
    'Contabilidad': ['Contador', 'Auxiliar', 'Control y Gestion']
}

const HandleRol = (obj) => {
    const sector = document.getElementById('sector')
    if(obj[sector]){
        obj[sector].forEach(element => crearOption(element))
    }
}

const crearOption = (value) => {
    const option = document.createElement('option')
    option.textContent = value
    option.value = value
}

const HandleSector = (obj) => {
    let claves = Object.keys(obj)
    claves.forEach(element => crearOption(element))
}

<option value="Recursos Humanos">Recursos Humanos</option>