import React from 'react'
import HeaderComponent from './HeaderComponent'
import Footercomponent from './Footercomponent'

function Userpage() {
  return (
    <section  className='googlesans'>
        <HeaderComponent showsidebarbutton={false}/>
        <p className='p-2' style={{marginTop:"80px"}}>This is User Page.</p>
        <Footercomponent/>
    </section>
  )
}

export default Userpage