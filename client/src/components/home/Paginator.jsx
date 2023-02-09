import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { loadingState, filterAndOrder, loadCountries, countryDetail } from '../../redux/actions';

import Country from './Country';
import style2 from './css/countries.module.css'
import Footer from './footer';

export default function Paginator() {
  const data = useSelector(state => state.countries);
  const loading = useSelector(state => state.loading);
  const filtradoUOrdenado = useSelector(state => state.applyFilterAndOrder)
  
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  function changePage(event) {
    const pageNumber = Number(event.target.value);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage === 1 ? 0 : currentPage * 9 - 9;
    const endIndex = currentPage === 1 ? 9 : startIndex + 9;
    return data.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    return new Array(Math.ceil(data.length / 9)).fill().map((_, idx) => idx + 1)
  };

  
  useEffect(() => {
    document.title = "Countries página " + currentPage;
  }, [currentPage]);

  useEffect(()=>{
      if(filtradoUOrdenado){
        setCurrentPage(1)
        dispatch(loadingState(false))
        dispatch(filterAndOrder(false))
      }
  }, [filtradoUOrdenado])

  return (
    <>
      <div className="countries_card_container">
      {
        
        data.length ?
          getPaginatedData()?.map((c => {
            return(
            <Link key={c.ID} to={`/country/${c.ID}`} onClick={e => dispatch(countryDetail(c.ID))}>
              <Country name={c.name} urlImg={c.urlImg} continent={c.continent} />
            </Link>)
          })) : (
            <div className="container_vacio">
              <h1 className="ups" style={{pointerEvents: 'none'}}>Ups...</h1>
              <button className={style2.botonRecargarPaises} style={{cursor: 'pointer'}} onClick={(e) => {
                  dispatch(loadCountries())
                  dispatch(loadingState(true))
                  document.getElementById('filtPorContinente').value="sel"
                  document.getElementById('filtPorActividad').value="sel"
                  document.getElementById('ordenPoblacion').value="sel"
                  document.getElementById('ordenAlfabetico').value="sel"
                }
              }>Recargar países</button>
            </div>
          )
        
  
      }
      </div>
        <div className="paginator_container">{
          currentPage === 1 ?<button disabled id="antes" onClick={e => setCurrentPage(page => page - 1)}>Anterior</button>
          :<button id="antes" onClick={e => setCurrentPage(page => page - 1)}>Anterior</button>}{
            currentPage === 27 ?<p>{currentPage -2} {currentPage -1} <font size="6" id="pages">{currentPage}</font>  {currentPage +1}</p>
           :currentPage === 28 ?<p>{currentPage -2} {currentPage -1} <font size="6" id="pages">{currentPage}</font></p>
           :
            currentPage <= 1 ?<p id='pages'><font size="6" id="pages">{currentPage}</font> {currentPage + 1} {currentPage + 2}</p>
           :currentPage == 2 ?<p>{currentPage -1} <font size="6" id="pages">{currentPage}</font> {currentPage +1} {currentPage +2}</p>
           :<p>{currentPage -2} {currentPage -1} <font size="6" id="pages">{currentPage}</font>  {currentPage +1} {currentPage +2}</p>}
           {currentPage === 28 ? <button id="desp" disabled onClick={e => setCurrentPage(page => page + 1)}>Siguiente</button>
           :<button id="desp" onClick={e => setCurrentPage(page => page + 1)}>Siguiente</button>}
        </div>
      <Footer/>
    </>
  );
}

//<div style={{color: 'white', }}></div>