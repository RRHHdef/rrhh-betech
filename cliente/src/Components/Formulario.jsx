import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const url = 'http://localhost:5000/empleados/nuevo'

const initialState = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    domicilioReal: '',
    domicilioLegal: '',
    ciudad: '',
    cp: '',
    dni: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    fechaIngreso: '',
    sector:'',
    rol: '',
    elementos: '',
  };

  const sectores = {
    'Recursos Humanos': ['Seleccion de personal', 'Administracion'],
    'Sistemas': ['Odoo', 'Desarrollo', 'Digitalizacion'],
    'Infraestructura': ['Telecomunicaciones', 'Servidores', 'Mantenimiento', 'Redes'],
    'Contabilidad': ['Contador', 'Auxiliar', 'Control y Gestion']
}

export const Formulario = () => {

     const[values , setValues] = useState(initialState)
     console.log(values)

     useEffect(() => {

        handleSector(sectores)
        handleRol(sectores)
        
     },[values.sector])
     
     
     const handleSubmit = async (e) => {
        e.preventDefault()
           try {
            const resp = await axios.post(url, values)
          //  console.log('desde axios: ',resp.data.data) // Devuelve 'created' por consola si todo esta ok
            if(resp.data) {
                
                const itemOk = document.getElementById('contenedor')
                const div = document.createElement('div')
                div.textContent = 'Empleado agregado correctamente'
                div.className = 'alert alert-success'
                div.role = 'alert'
                itemOk.appendChild(div)
                setTimeout(() => itemOk.removeChild(div) , 3000);
                setValues(initialState)

            } 
        } catch (error) {
            console.log('desde catch error:', error.response)
            const itemOk = document.getElementById('contenedor')
            const div = document.createElement('div')
            div.textContent = 'Ya existe un empleado con este DNI'
            div.className = 'alert alert-danger'
            div.role = 'alert'
            itemOk.appendChild(div)
            setTimeout(() => itemOk.removeChild(div) , 3000);

        }
     }

     const handleChange = (e) => {
        const {name, value} = e.target
        setValues((prevValues) => ({...prevValues, [name]: value}))
     }

    const handleRol = (obj) => {
        const sector = document.getElementById('sector')
        const rol = document.getElementById('rol')
        deleteNode(rol)
        rol.appendChild(createDisabledOption())
        if(obj[values.sector]){
            obj[values.sector].map(element => createOption(element, 'rol'))
        }
    }

    const handleSector = (obj) => {
        const sector = document.getElementById('sector')
        deleteNode(sector)
        sector.appendChild(createDisabledOption())
        let claves = Object.keys(obj)
        claves.map(element => createOption(element, 'sector'))
    }
    

    const createOption = (value, id) => {
        let ide = document.getElementById(id)
        let option = document.createElement('option')
        option.textContent = value
        option.value = value
        ide.appendChild(option)  
        
    }

    const createDisabledOption = () => {
        const option = document.createElement('option')
        option.textContent = 'Selecciona una opcion'
        option.setAttribute('disabled', '')
        option.setAttribute('selected', '')
        option.value = ''
        return option

    }

    const deleteNode = (node) => {
        while (node.firstChild){
            node.removeChild(node.firstChild);
          }
    }



  

  return (
    <div className="container ">


        <div className="row mb-3" id='contenedor'>
            <h4 className="text-center">INGRESE LOS DATOS DEL NUEVO EMPLEADO:</h4>
        </div>
        <form className="row g-3" id='form' onSubmit={ handleSubmit }>

            <div className="col-4">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Ingresar nombre"
                 name='nombre' value={values.nombre} onChange={handleChange} required title='Debes ingresar el nombre'/>
            </div>

            <div className="col-4">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="apellido" placeholder="Ingresar apellido"
                 name='apellido' value={values.apellido} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Ingresar email"
                 name='email' value={values.email} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="telefono" className="form-label">Telefono</label>
                <input type="number" className="form-control" id="telefono" placeholder="Ingresar telefono"
                 name='telefono' value={values.telefono} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="domicilio-real" className="form-label">Domicilio real</label>
                <input type="text" className="form-control" id="domicilio-real" placeholder="Ingresar domicilio real"
                name='domicilioReal'value={values.domicilioReal} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="domicilio-legal" className="form-label">Domicilio legal</label>
                <input type="text" className="form-control" id="domicilio-legal" placeholder="Ingresar domicilio legal"
                name='domicilioLegal' value={values.domicilioLegal} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <input type="text" className="form-control" id="ciudad" placeholder="Ingresar ciudad"
                name='ciudad' value={values.ciudad} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="cp" className="form-label">CP</label>
                <input type="number" className="form-control" id="cp" placeholder="Ingresar Codigo Postal"
                name='cp' value={values.cp} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input type="number" className="form-control" id="dni" placeholder="Ingresar dni"
                name='dni' value={values.dni} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="fechaDeNacimiento" className="form-label">Fecha de Nacimiento</label>
                <input type="date" className="form-control" id="fechaDeNacimiento" placeholder="Ingresar fecha de nacimiento"
                name='fechaNacimiento' value={values.fechaNacimiento} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="lugarDeNacimiento" className="form-label">Lugar de nacimento</label>
                <input type="text" className="form-control" id="lugarDeNacimiento" placeholder="Ingresar lugar de nacimiento"
                name='lugarNacimiento' value={values.lugarNacimiento} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="fechaDeIngreso" className="form-label">Fecha de ingreso</label>
                <input type="date" className="form-control" id="fechaDeIngreso" placeholder="Ingresar fecha de ingreso"
                name='fechaIngreso' value={values.fechaIngreso} onChange={handleChange} required/>
            </div>

            <div className="col-4">
                <label htmlFor="sector" className="form-label">Sector</label>
                <select  id="sector" className="form-control" placeholder="Elegir sector"
                name="sector" value={values.sector} onChange={handleChange} required>

                </select>
            </div>

            <div className="col-4">
                <label htmlFor="rol" className="form-label">ROL</label>
                <select  id="rol" className="form-control" placeholder="Elegir rol"
                name="rol" value={values.rol} onChange={handleChange} required>

                 
                </select>
            </div>

            <div className="col-4">
                <label htmlFor="elementos" className="form-label">Elementos</label>
                <input type="text" className="form-control" id="elementos" placeholder="Ingresar Elementos"
                name='elementos'value={values.elementos} onChange={handleChange} required />
            </div>

            <div className="col">
             <button type="submit" className="btn btn-primary col-3 mb-5" value="guardar">Guardar</button>
            </div>
            

        </form>
    </div>
  )
}
