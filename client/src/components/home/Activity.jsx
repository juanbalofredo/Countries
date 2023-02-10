import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { addActividad, filterAndOrder, loadCountries, loadingState } from '../../redux/actions/index'


export default function Activity() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        dificultad: 1,
        duracion: '',
        temporada: 'seleccionar',
        pais: []
    })

    const [error, setError] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        pais: '',
    })

    const [bPaises, setBPaises] = useState([])
    const [countryNames, setCountryNames] = useState([])

    function handleChange(e){
        const { name, value } = e.target;

        switch(name){
            case 'name':{
                setError({
                    ...error,
                    name: value.length < 3 ? 'El nombre es demasiado corto' : '' 
                })
                break;
            }
            
            case 'duracion':{
                setError({
                    ...error,
                    duracion: value < 1 || value > 2000 ? 'La duración no puede ser mas de 2000 horas ni menor a 0 horas' : '' 
                })
                break;
            }
            
            case 'temporada':{
                setError({
                    ...error,
                    temporada: value === 'seleccionar' ? 'Elige una temporada!' : '' 
                })
                break;
            }

            default:{
                break;
            }
        }
        
        setInput({
            ...input,
            [name]: value
        })

    }
    
    function validarForm(){
        let valid = true;
        
        if(input.pais.length === 0) valid = false 

        if(input.name.length <= 2) valid = false

        if(input.dificultad === 0) valid = false

        if(input.duracion === 0) valid = false

        if(input.temporada === '' || input.temporada === 'seleccionar') valid = false
        
        return valid;
    }

    async function buscarPais(e){
        try {
            const resultados = await axios.get(`/countries?name=${e.target.value}`)
            setBPaises(resultados.data)
        } catch (error) {
            console.log(error);
        }
    }

    function agregarPais(idPais, namePais){
        setInput({
            ...input,
            pais: input.pais.indexOf(idPais) === -1 ? [...input.pais, idPais] : [...input.pais]
        })
        setCountryNames([...countryNames, {name: namePais, ID: idPais}])
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(validarForm()){
            try {
                const resp = await axios.get('/activity')
                const act = resp.data;
                console.log(input.pais);
                if(!act.length || act.indexOf(input.name) === -1){
                    dispatch(addActividad(input.name, input.dificultad, input.duracion, input.temporada, input.pais))
                    dispatch(loadingState(false))
                    dispatch(filterAndOrder(true))
                    dispatch(loadCountries())
                    setInput({
                        name: '',
                        dificultad: 0,
                        duracion: 0,
                        temporada: 'seleccionar',
                        pais: []
                    })
                    setBPaises([])
                    setCountryNames([])
                    document.getElementById('bpais').value = '';
                }else{
                    alert("ERROR: La actividad con ese nombre ya existe");
                }
            } catch (error) {
                alert("ERROR: reintenta más tarde! ("+ error +")");
            }
        }else{
            alert("ERROR: Faltan completar algunos campos");
        }
    }

    
    function deleteCountry(event, countryID){//recibo el id del pais a borrar
        console.log(countryID);
        setInput(prev => {
            return {
                ...prev,
                pais: input.pais.filter(e => e !== countryID)
            }
        });
    }

    useEffect(()=>{
        document.title = "Agregar actividad";
    }, [])
    
    return (
      <>
      <div id='activity_container'>
        <Link className='act_volver' to='/home'>Volver</Link>
        <form className="act_container" method="POST" onSubmit={handleSubmit}>
            <h1>Agregar actividad Turística</h1>
            <div id='achsae'>
            <input type="text" name="name" id="namesa" placeholder='Ingresa un nombre' maxLength="20" autoComplete='off' value={input.name} onChange={handleChange} />
            {error.name.length ? <span id='error_name'>{error.name}</span> : null }
            <div id='difff'>
            <label htmlFor="dificultad">Dificultad de la actividad:</label>
            <input type="range" min='1' max="5" name="dificultad" id="dificultad" autoComplete="off" placeholder='Ingresa una dificultad' value={input.dificultad} onChange={handleChange} />
            <span id='dif_tet'>{input.dificultad}</span>
             </div>
            <input type="number" min='=' max='2001' name="duracion" id="duracion" autoComplete="off" placeholder='Ingresa una duración (0-2000) hs' value={input.duracion} onChange={handleChange} />
            {error.duracion.length ? <span id='error_dura'>{error.duracion}</span> : null }
            <div id='labasl'>
                <div id='tempo'>
            <label htmlFor='temporada'>Temporada de la actividad:</label>
            <select name="temporada" id="temporada" value={input.temporada} onChange={handleChange}>
                <option value="seleccionar">Seleccionar</option>
                <option value="invierno">Invierno</option>
                <option value="otonio">Otoño</option>
                <option value="primavera">Primavera</option>
                <option value="verano">Verano</option>
            </select>

            {error.temporada.length ? <span id='error_tempo'>{error.temporada}</span> : null }
            <br />            </div>
            <div id='pais_act'>
            <label htmlFor="bpais">¿En que países está la actividad?</label>
            <input autoComplete="off" type="text" id="bpais" name="bpais" placeholder='Buscar pais' onChange={buscarPais}/> 
            </div> </div>
            {bPaises.length > 0 ?
            <>
    
                <div className="act_buscador_pa"> 

                    <div id="paisesContainer">
                                               <h4>Paises encontrados</h4>
                        <ul className="act_lista">
                            {bPaises?.map(e=>{
                                return (
                                        <li key={e.ID}>{e.name}<span className="act_agregar" onClick={(evento) => agregarPais(e.ID, e.name)}>Agregar</span></li>
                                    )
                                }) 
                            }
                        </ul>
 
                    </div>
                </div>
              
            </>
            : null
            } 


            <button type="submit" id='lastone'>Agregar actividad</button> 
     </div>
        </form>
        <div id='actividaddos'>
            <h2> Actividad</h2>
            <ul id='activitis'><li className="nuse" key={input.ID}>Nombre:  {input.name} <br /> Dificultad: {input.dificultad}<br /> 
             Duración:  {
             input.duracion === '' ? '':
             input.duracion + " horas"
            } 
             <br /> Temporada:  {
            input.temporada === "seleccionar" ? "":
            input.temporada
            }          </li> </ul>                    <h4>Paises con la actividad :</h4>
            {input.pais.length > 0 ?
                <>    

                    <div className="act_container_paises">
                        <div id="paisesContainer2">    
                            <ul className="act_lista_2">
                                {
                                    input.pais?.map(e => <li key={e}><span className="act_delete"onClick={ev => deleteCountry(ev, e)}>X</span>{countryNames.find(el => el.ID === e).name} </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </>
            : null
            }          
  

        </div>
        </div>
    </>
  )
}
