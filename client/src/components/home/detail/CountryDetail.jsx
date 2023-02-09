import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { clearDetail } from '../../../redux/actions'

export default function CountryDetail() {
  const pais = useSelector(state => state.countryDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    return function (){
      dispatch(clearDetail())
    }
  },[])

  try {
    return (
      <>
      <div className='detail_super'>
        <Link className="detail_volver" to='/home'>back</Link>
        <div className="detail_container">
            <img src={pais.urlImg} alt="argentina" />
            <h1>{pais.name}</h1>
            <div className='detail_texto'>
              <div id='afsgd'>
            <p id='code'>Código: {pais.ID}</p>
            <p id='capi'>Capital: {pais.capital}</p>
            </div>
            <div id='afsy'>
            <p id='super'>Superficie: {pais.area / 1000} km2</p>
            <p id='pobla'>Población: {pais.poblacion}</p>
            </div>      
           </div> 
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
