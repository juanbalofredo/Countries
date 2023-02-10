import React from 'react'

import Filter from './Filter'
import Ordenar from './Ordenar'

import SearchBar from './SearchBar'

export default function FilterAndOrder() {
  return (
    <div className="contenedor_filtros">
      <div className='filtrosa'>
        <div id='oredene'>
        <Ordenar />
        </div>
        <div id="filtrewn">
        <Filter />
        </div>
        </div>
        <SearchBar />
    </div>
  )
}
