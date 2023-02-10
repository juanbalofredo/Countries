import React from 'react'
import { Link } from 'react-router-dom'
//import SearchBar from './SearchBar'


export default function NavBar() {
  return (
    <div className="container_nav_2"> 
      <Link className="boton_inicio" to="/">Inicio</Link>
      <h1 >Proyecto Paises</h1>
      <Link to="/activity" className="boton_agregar">Agregar act</Link>
    </div>
  )
}
