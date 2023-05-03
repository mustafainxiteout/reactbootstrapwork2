import React from 'react'
import { Button, Image, Navbar } from 'react-bootstrap'
import { Bars3CenterLeftIcon,LanguageIcon, BellIcon, EnvelopeIcon, PencilSquareIcon,UserIcon,PowerIcon} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

function HeaderComponent({onButtonClick,showsidebarbutton,isButtonClicked}) {
  const navigate=useNavigate();
  const navigationlinks = () => {
      navigate('/Admin/Newpage/5');
  };
  const handleLogout = () => {
    // remove access token from local storage
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    navigate('/');
  };
  return (
    <div>
        <Navbar bg="white" className='d-flex ml-auto p-3 border shadow-small justify-content-between fixed-top'>
            <div>
            {showsidebarbutton===true?(
              <>
              <Image src={isButtonClicked===true? 'https://inxiteout.ai/wp-content/uploads/2021/08/logo-14.png':'/inxiteoutlogo.png'} className='d-none d-lg-inline' style={{height:isButtonClicked===true?"40px":"20px", width:isButtonClicked===true?"140px":"30px",marginRight:isButtonClicked===true?"90px":"30px",marginLeft:isButtonClicked===true?"10px":"2px"}}/>
              <Image src='/inxiteoutlogo.png' className={isButtonClicked===true?'d-none':'d-inline d-lg-none'} style={{height:isButtonClicked===true?"40px":"20px", width:isButtonClicked===true?"140px":"30px",marginRight:isButtonClicked===true?"90px":"30px",marginLeft:isButtonClicked===true?"10px":"2px"}}/>
              <Button className='btn btn-light' onClick={onButtonClick}>
              <Bars3CenterLeftIcon  className="text-black" style={{height:"18px",width:"18px",transform: isButtonClicked===true?  'rotateZ(-180deg)' : null}} />
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
              <div className="dropdown">
                <button className="btn btn-light" aria-expanded="false" data-bs-toggle="dropdown" type="button">  
                  <LanguageIcon className="text-black" style={{height:"18px",width:"18px"}}/>
                </button>
                <div className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end border-0 shadow-lg mt-2 p-0">
                  <button className="dropdown-item small btn-light my-btn border-bottom py-3" onClick={navigationlinks}>
                    English (UK)
                  </button>
                  <button className="dropdown-item small btn-light my-btn border-bottom py-3" onClick={navigationlinks}>
                    French (France)
                  </button>
                  <button className="dropdown-item small btn-light my-btn py-3" onClick={navigationlinks}>
                    Chinese (China)
                  </button>
                </div>
              </div>
               <div className="dropdown">
                <button className="btn btn-light" aria-expanded="false" data-bs-toggle="dropdown" type="button">  
                  <BellIcon className="text-black" style={{height:"18px",width:"18px"}}/>
                </button>
                <div className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 p-0" style={{width:"250px"}}>
                  <p className="dropdown-item mb-0 text-start border-bottom py-3 disabled text-black" onClick={navigationlinks}>
                    Notifications
                  </p>
                  <button className="dropdown-item btn-light small d-flex justify-content-between border-bottom py-3" onClick={navigationlinks}>
                    <p className='mb-0 text-wrap'>John Wick commented on your post.</p>
                    <small className="text-muted float-end">12:57 PM</small>
                  </button>
                  <button className="dropdown-item btn-light small d-flex justify-content-between border-bottom py-3" onClick={navigationlinks}>
                    <p className='mb-0 text-wrap'>John Wick commented on your post.</p>
                    <small className="text-muted float-end">12:57 PM</small>
                  </button>
                  <button className="dropdown-item btn-light small d-flex justify-content-between border-bottom py-3" onClick={navigationlinks}>
                    <p className='mb-0 text-wrap'>John Wick commented on your post.</p>
                    <small className="text-muted float-end">12:57 PM</small>
                  </button>
                  <button className="dropdown-item btn-light my-btn text-center py-3" onClick={navigationlinks}>
                    <p className='my-0 text-primary'>View All</p>
                  </button>
                </div>
              </div>
               <div className="dropdown">
                <button className="btn btn-light" aria-expanded="false" data-bs-toggle="dropdown" type="button">  
                  <EnvelopeIcon className="text-black" style={{height:"18px",width:"18px"}}/>
                </button>
                <div className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 p-0" style={{width:"250px"}}>
                  <p className="dropdown-item mb-0 text-start border-bottom py-3 disabled text-black" onClick={navigationlinks}>
                    Messages
                  </p>
                  <button className="dropdown-item btn-light small d-flex justify-content-between border-bottom py-3" onClick={navigationlinks}>
                    <p className='mb-0 text-wrap'>John Wick commented on your post.</p>
                    <small className="text-muted float-end">12:57 PM</small>
                  </button>
                  <button className="dropdown-item btn-light small d-flex justify-content-between border-bottom py-3" onClick={navigationlinks}>
                    <p className='mb-0 text-wrap'>John Wick commented on your post.</p>
                    <small className="text-muted float-end">12:57 PM</small>
                  </button>
                  <button className="dropdown-item btn-light small d-flex justify-content-between border-bottom py-3" onClick={navigationlinks}>
                    <p className='mb-0 text-wrap'>John Wick commented on your post.</p>
                    <small className="text-muted float-end">12:57 PM</small>
                  </button>
                  <button className="dropdown-item btn-light my-btn text-center py-3" onClick={navigationlinks}>
                    <p className='my-0 text-primary'>View All</p>
                  </button>
                </div>
              </div>
              <div className="dropdown">
                <button className="btn text-center border-0" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                  <Image src='/avatar.jpg' className='rounded-5 p-0 me-0 me-lg-1' style={{height:"22px", width:"22px"}}/>
                  <span className='d-none d-lg-inline fw-bold'>Mustafa</span>
                </button>
                <div className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-0 mt-2">
                <button className="dropdown-item small btn-light py-3" onClick={navigationlinks}>
                  <PencilSquareIcon className="text-black me-2" style={{height:"20px",width:"20px"}}/>
                  Edit Profile
                </button>
                <button className="dropdown-item small btn-light py-3" onClick={navigationlinks}>
                  <UserIcon className="text-black me-2" style={{height:"20px",width:"20px"}}/>
                  View Profile
                </button>
                <button className="dropdown-item small btn-light py-3" onClick={handleLogout}>
                  <PowerIcon className="text-black me-2" style={{height:"20px",width:"20px"}}/>
                  Sign Out
                </button>
                </div>
              </div>
            </div>
        </Navbar>
    </div>
  )
}

export default HeaderComponent