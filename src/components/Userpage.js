import React from 'react'
import HeaderComponent from './HeaderComponent'
import Footercomponent from './Footercomponent'

function Userpage({contentarea}) {
  return (
    <section  className='googlesans'>
        <HeaderComponent showsidebarbutton={false}/>
        <div style={{marginTop:"70px"}}>
        {contentarea}
        </div>
        <Footercomponent/>
    </section>
  )
}

export default Userpage