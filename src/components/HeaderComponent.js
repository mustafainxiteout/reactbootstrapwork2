import React from 'react'
import { Button, Image, Navbar } from 'react-bootstrap'
import { Bars3CenterLeftIcon, UserIcon, BellIcon, EnvelopeIcon} from '@heroicons/react/24/outline'
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
        <Navbar bg="white" className='d-flex ml-auto p-3 border shadow-small justify-content-between'>
            <div>
            {showsidebarbutton===true?(
              <>
              <Image src={isButtonClicked===true? 'https://inxiteout.ai/wp-content/uploads/2021/08/logo-14.png':'/inxiteoutlogo.png'} className='d-none d-lg-inline' style={{height:isButtonClicked===true?"40px":"20px", width:isButtonClicked===true?"140px":"30px",marginRight:isButtonClicked===true?"90px":"30px",marginLeft:isButtonClicked===true?"10px":"2px"}}/>
              <Image src='/inxiteoutlogo.png' className={isButtonClicked===true?'d-none':'d-inline d-lg-none'} style={{height:isButtonClicked===true?"40px":"20px", width:isButtonClicked===true?"140px":"30px",marginRight:isButtonClicked===true?"90px":"30px",marginLeft:isButtonClicked===true?"10px":"2px"}}/>
              <Button className='btn btn-light text-bg-light border' onClick={onButtonClick}>
              <Bars3CenterLeftIcon  className="text-black" style={{height:"20px",width:"20px",transform: isButtonClicked===true?  'rotateZ(-180deg)' : null}} />
              </Button>
              </>
              ):(
              <>
              <Image src='https://inxiteout.ai/wp-content/uploads/2021/08/logo-14.png' className='d-none d-lg-inline' style={{height:"40px", width:"140px",marginLeft:"10px"}}/>
              <Image src='/inxiteoutlogo.png' className='d-inline d-lg-none' style={{height:"20px", width:"30px",marginRight:"30px",marginLeft:"2px"}}/>
              </>
              )}
            </div>
              <div className='d-flex gap-2'>
               <Link className='btn btn-light text-bg-light border'>
                <BellIcon className="text-black" style={{height:"20px",width:"20px"}}/>
               </Link>
               <div className="dropdown">
                <button className="btn btn-light border text-center" aria-expanded="false" data-bs-toggle="dropdown" type="button">  
                  <EnvelopeIcon className="text-black" style={{height:"20px",width:"20px"}}/>
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