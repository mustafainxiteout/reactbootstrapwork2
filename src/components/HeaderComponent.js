import React from 'react'
import { Button, Image, Navbar } from 'react-bootstrap'
import { Bars3Icon, UserIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'

function HeaderComponent({onButtonClick,showsidebarbutton}) {
    const navigate=useNavigate();
  const handleLogout = () => {
    // remove access token from local storage
    localStorage.removeItem("access_token");
    navigate('/');
  };
  return (
    <div>
        <Navbar bg="white" className='d-flex ml-auto p-3 border shadow justify-content-between'>
          <div>
            <Image src='https://inxiteout.ai/wp-content/uploads/2021/08/logo-14.png' style={{height:"40px", width:"130px"}}/>
            {showsidebarbutton===true?(
            <Button className='btn btn-light text-bg-light border' style={{marginLeft:"60px"}} onClick={onButtonClick}>
            <Bars3Icon  className="text-black" style={{height:"20px",width:"20px"}} />
            </Button>
            ):(
              null
            )}
            </div>
                <div className='d-flex gap-2'>
              <Link className='btn btn-light text-bg-light border'>
              <HomeIcon className="text-black" style={{height:"20px",width:"20px"}}/>
              </Link>
              <div className="dropdown">
                <button className="btn btn-light border" aria-expanded="false" data-bs-toggle="dropdown" type="button">
             <UserIcon className="text-black" style={{height:"20px",width:"20px"}}/>
              </button>
  <div className="dropdown-menu dropdown-menu-start mt-2" style={{transform:"translateX(-116px)"}}><button className="dropdown-item btn-light" onClick={handleLogout}>Sign Out</button><button className="dropdown-item btn-light" href="/">Second Item</button><button className="dropdown-item btn-light" href="/">Third Item</button></div>
</div>


  </div>
        </Navbar>
    </div>
  )
}

export default HeaderComponent