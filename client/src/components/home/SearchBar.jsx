import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadingState, searchCountry } from '../../redux/actions';


export default function SearchBar() {

  const [ inputPais, setInputPais ] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(evento){
    evento.preventDefault();
    dispatch(searchCountry(inputPais.trimStart().trimEnd()))
    dispatch(loadingState(true))
  }

  function handleChange (e) {
		setInputPais(e.target.value)
	}

  return (
    <form className="buscador" onSubmit={(e) => handleSubmit(e)}>
        <button type='submit'>Buscar</button>
        <input maxLength="10" type="text" name='inputPais' placeholder='Ingrese un pais' value={inputPais} onChange={e => handleChange(e)}/>
    </form>
  )
}
