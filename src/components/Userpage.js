import React from 'react'
import HeaderComponent from './HeaderComponent'
import Footercomponent from './Footercomponent'

function Userpage() {
  return (
    <section  className='googlesans'>
        <HeaderComponent/>
        <p className='m-5'>This is User Page.</p>
        <Footercomponent/>
    </section>
  )
}

export default Userpage