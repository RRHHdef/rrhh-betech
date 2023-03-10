import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { reqResApi } from '../Api/reqRes'
import '../Css/empleados.css'

export default function Empleados() {

    const [empleados, setEmpleados] = useState([])
    console.log('empleados state: ', empleados)
    useEffect(()=>{
        cargarEmpleados()
    },[])

    const cargarEmpleados = async()=>{
        const resp = await reqResApi.get('/empleados/10')
        setEmpleados(resp.data)
        console.log(resp.data)
    }

    const renderEmpleado = ({em_nombre,em_apellido, em_dni, ro_sector, em_legajo, es_activo})=>{
        return (
            <tr key={em_legajo}>
                <td>{em_nombre} {em_apellido}</td>
                <td>{em_dni}</td>
                <td>{ro_sector}</td>
                <td>{em_legajo}</td>
                <td>{es_activo}</td>
                <td><button type="button" className="btn btn-outline-light btn-sm row rounded-pill shadow text-dark" value="guardar">Editar</button></td>
            </tr>
        )
    }
  return (

    <div className='empelados'>

        <div className='empleados__title'>
            <div>
                 <h1>Empleados</h1>
            </div>
           
            <div className='contenedor_boton'>
                <button className='boton boton__atras'>ATRAS</button>
                <button className='boton boton__siguiente'>SIGUIENTE</button>
            </div>
        </div>

        <div>
         <table className="table empleado__table">
            <thead>
            <tr className='header_empleado'>
                <th scope="col">Nombre y apellido</th>
                <th scope="col">DNI</th>
                <th scope="col">Sector</th>
                <th scope="col">Legajo</th>
                <th scope='col'>Activo</th>
            </tr>
            </thead>
            
            <tbody>
                { empleados.map ( renderEmpleado ) }
            </tbody>
            </table>
        </div>
   
    </div>
  )
}
