import React from 'react'

import Filter from './Filter'
import Ordenar from './Ordenar'

import SearchBar from './SearchBar'

export default function FilterAndOrder() {
  return (
    <div className="contenedor_filtros">
      <div className='filtrosa'>
        <Ordenar />
        <Filter />
        </div>
        <SearchBar />
    </div>
  )
}
