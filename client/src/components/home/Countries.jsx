import React from 'react'

import Country from './Country'

import Paginador from './Paginador'

export default function Countries() {    
    return <Paginador RenderComponent={Country} />
}
