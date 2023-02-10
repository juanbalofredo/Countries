import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { loadingState, filterAndOrder, loadCountries, countryDetail } from '../../redux/actions';

import Country from './Country';
import Footer from './Footer';

export default function Paginator() {
  const data = useSelector(state => state.countries);
  const filtradoUOrdenado = useSelector(state => state.applyFilterAndOrder)
  
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();


  const getPaginatedData = () => {
    const startIndex = currentPage === 1 ? 0 : currentPage * 10 - 10;
    const endIndex = currentPage === 1 ? 9 : startIndex + 10;   
    return data.slice(startIndex, endIndex);

  };  
  useEffect(() => {
    document.title = "Countries (" + currentPage + ")";
  }, [currentPage]);
  useEffect(()=>{
      if(filtradoUOrdenado){
        setCurrentPage(1)
        dispatch(loadingState(false))
        dispatch(filterAndOrder(false))
      }
  }, [filtradoUOrdenado,dispatch])

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
              <button className="gga" style={{cursor: 'pointer'}} onClick={(e) => {
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

            data.length < 10 ? <p> <font size="6" id="pages">{currentPage}</font></p> 
           :data.length < 10 && data.length  < 19 ? <p>{currentPage -1}  <font size="6" id="pages">{currentPage}</font></p> 
           :
            currentPage === Math.ceil(data.length / 10) ? <p> {currentPage -2} {currentPage -1}  <font size="6" id="pages">{currentPage}</font></p> 
           :currentPage === Math.ceil(data.length / 10 -1 ) ? <p> {currentPage -1} <font size="6" id="pages">{currentPage}</font>  {currentPage +1}</p>
           :currentPage <= 1 ?<p id='pages'><font size="6" id="pages">{currentPage}</font> {currentPage + 1} {currentPage + 2}</p>
           :currentPage === 2 ?<p>{currentPage -1} <font size="6" id="pages">{currentPage}</font> {currentPage +1} </p>
           :<p>{currentPage -1} <font size="6" id="pages">{currentPage}</font>  {currentPage +1}</p>}
           {currentPage === Math.ceil(data.length / 10) ? <button id="desp" disabled onClick={e => setCurrentPage(page => page + 1)}>Siguiente</button>
           :<button id="desp" onClick={e => setCurrentPage(page => page + 1)}>Siguiente</button>}
        </div>
      <Footer/>
    </>
  );
}

//<div style={{color: 'white', }}></div>