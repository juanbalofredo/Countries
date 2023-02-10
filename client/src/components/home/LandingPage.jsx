import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import foto from "../img/Captura-de-pantalla-2019-12-04-a-las-12.43.10-1310x824.png"
import { useDispatch } from 'react-redux';
import { loadCountries, loadingState } from '../../redux/actions';

export default function LandingPage() {    
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "Proyecto Integral"
        dispatch(loadCountries())
        dispatch(loadingState(true))
    }, [dispatch])

  return (
    <div className='landind_container'>
     <div id='laks'>
      <div id='reas'>
      <h1 className='landind_titulo'>Bienvenido</h1>
     
      <h2>Descubra nuevos paises</h2>
      </div>
       <div id="landing_card">
      <img src={foto} alt="" />
      <br />
      <Link className="landing_boton" to='/home'>Explorar</Link>
      <br />
      </div>
      <div className='waves'></div>
      </div>
    </div>
  )
}