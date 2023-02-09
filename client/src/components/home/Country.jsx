import React from 'react'
import "../../styles/styles.css"

export default function Country(props) {
  return (
    <div className="countries_card">
      <img src={props.urlImg} alt={props.name}/>
{

       props.name.length > 10 ? 
        <div className='countires_texto'>
        <p id='countries_name'>{props.name}</p>
        <h3 id="countries_continent">{props.continent}</h3>
        </div>
      : 
      props.name.length > 16 ? 
       <div className='countires_texto'>
       <p id='countries_name_especial'>{props.name}</p>
       <h3 id="countries_continent">{props.continent}</h3>
       </div>
       :
      <div className='countires_texto'>
      <h2 id='countries_name'>{props.name}</h2>
      <h3 id="countries_continent">{props.continent}</h3>
      </div>
        }


    </div>
  )
}
