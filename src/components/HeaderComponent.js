import React from 'react'
import { Button, Image, Navbar } from 'react-bootstrap'
import { Bars3CenterLeftIcon, UserIcon, BellIcon} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'

function HeaderComponent({onButtonClick,showsidebarbutton,isButtonClicked}) {
  const navigate=useNavigate();
  const navigationlinks = () => {
      navigate('/Admin/Newpage/5');
  };
  const handleLogout = () => {
    // remove access token from local storage
    localStorage.removeItem("access_token");
    navigate('/');
  };
  return (
    <div>
        <Navbar bg="white" className='d-flex ml-auto p-3 border shadow justify-content-between'>
            <div>
              <Image src='https://inxiteout.ai/wp-content/uploads/2021/08/logo-14.png' style={{height:"40px", width:"100px"}}/>
              {showsidebarbutton===true?(
              <Button className='btn btn-light text-bg-light border' style={{marginLeft:"40px"}} onClick={onButtonClick}>
              <Bars3CenterLeftIcon  className="text-black" style={{height:"20px",width:"20px",transform: isButtonClicked===true?  'rotateZ(-180deg)' : null}} />
              </Button>
              ):(
              null
              )}
            </div>
              <div className='d-flex gap-2'>
               <Link className='btn btn-light text-bg-light border'>
                <BellIcon className="text-black" style={{height:"20px",width:"20px"}}/>
               </Link>
               <div className="dropdown">
                <button className="btn btn-light border text-center" aria-expanded="false" data-bs-toggle="dropdown" type="button">  
                  <BellIcon className="text-black" style={{height:"20px",width:"20px"}}/>
                </button>
                <div className="dropdown-menu dropdown-menu-end mt-2">
                  <button className="dropdown-item btn-light d-flex flex-wrap" onClick={navigationlinks} style={{width:"200px"}}>
                    <p className='mb-0 flex-shrink-1' style={{width:"150px"}}>John Wick commented on your post.</p>
                    <small className="text-muted">12:57 PM</small>
                  </button>
                  <button className="dropdown-item btn-light" onClick={navigationlinks}>View Profile</button>
                  <button className="dropdown-item btn-light" onClick={handleLogout}>Sign Out</button>
                </div>
              </div>
              <div className="dropdown">
                <button className="btn btn-light border text-center" aria-expanded="false" data-bs-toggle="dropdown" type="button">  
                  <UserIcon className="text-black" style={{height:"20px",width:"20px",marginRight:"4px"}}/>
                  <span className='d-none d-lg-inline'>Mustafa</span>
                </button>
                <div className="dropdown-menu dropdown-menu-end mt-2">
                  <button className="dropdown-item btn-light" onClick={navigationlinks}>Edit Profile</button>
                  <button className="dropdown-item btn-light" onClick={navigationlinks}>View Profile</button>
                  <button className="dropdown-item btn-light" onClick={handleLogout}>Sign Out</button>
                </div>
              </div>
            </div>
        </Navbar>
    </div>
  )
}

export default HeaderComponent