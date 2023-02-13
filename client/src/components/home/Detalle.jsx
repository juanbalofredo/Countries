import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { clearDetail } from '../../redux/actions/index'

export default function Detalle() {
  const pais = useSelector(state => state.countryDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    return function (){
      dispatch(clearDetail())
    }
  },[dispatch])

  try {
    return (
      <>
      <div className='detail_super'>
        <Link className="detail_volver" to='/home'>Volver</Link>
        <div className="detail_container">
            <img src={pais.urlImg} alt="argentina" />
            <h1>{pais.name}</h1>
            <div className='detail_texto'>
              <div id='afsgd'>
            <p id='code'> <h4>Código</h4>: {pais.ID}</p>
            <p id='capi'><h4>Capital</h4>: {pais.capital}</p>
            </div>
            <div id='afsy'>
            <p id='super'><h4>Superficie</h4>: {pais.area / 1000} km2</p>
            <p id='pobla'><h4>Población</h4>: {pais.poblacion}</p>

            </div>                  
           </div> <p id='subre'><h4>Subregion</h4>: {pais.subregion}</p>
             </div>
     
            {pais.activities.length > 0 ?  <div><div id='actividades_a'> <p id='lokih'>Actividades</p>
            <ul id='activitis'>{pais.activities?.map(a => {
              return <li className="nuse" key={a.ID}>Nombre: {a.name} <br /> Dificultad: {a.dificultad} <br /> Duración {a.duracion} horas <br /> Temporada: {a.temporada}</li>
            })}</ul></div>
           </div> : null}
        </div>
      </>
    ) 
  } catch (e) {
    return (
    <>
      <div className='detail_super'>
      <Link className="detail_volver" to='/home'>back</Link>
      <center>
        <h1>Ha ocurrido un error...</h1>
      </center>
      </div>
    </>)
  }
}
