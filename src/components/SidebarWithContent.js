import React,{useEffect, useState} from 'react'
import '../sidebar.css';
import { Col, Container, NavLink, Row, Nav, NavItem, Collapse } from 'react-bootstrap';
import { PresentationChartBarIcon, RectangleGroupIcon, RectangleStackIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation } from 'react-router-dom';

function SidebarWithContent({navs,isButtonClicked}) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const pageId  = 1;
  const navigate=useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(()=>{
    setActiveLink(location.pathname);
  },[location])

  const handleTabClick = (pagepath) => {
  navigate(pagepath);
  };
  
  const data=[
    {
      pagename:'Dashboard',
      pagepath:'/Admin/Dashboard',
      icon:PresentationChartBarIcon
    },
    {
      heading:'Components',
      pagename:'components'
    },
    {
      pagename:'New Page',
      pagepath:'/Admin/NewPage',
      icon:RectangleGroupIcon,
      isdropdown: true,
      dropdownItems: [
        { name: 'Item 1', pagepath: `/Admin/NewPage/${pageId}` },
        { name: 'Item 2', pagepath: '/Admin/NewPage/2' },
        { name: 'Item 3', pagepath: '/Admin/NewPage/3' },
      ],
    },
    {
      pagename:'New Page 2',
      pagepath:'/Admin/NewPage/4',
      icon:RectangleStackIcon
    }
  ]

return (
<Container fluid style={{transition:"width 3.0s ease-in-out"}}>
<Row>
<Col className={`${isButtonClicked===true? 'd-none d-lg-block col-auto bg-light shadow flex-shrink-0 d-flex border p-0':'d-block col-auto bg-light shadow flex-shrink-0 d-flex border p-0'}`} style={{width: "auto",minHeight:"92.5vh",transition:"width 0.3s ease-in-out"}}>
<Nav variant='pills' className='flex-column text-start'>
{data.map((item)=>( 
<NavItem key={item.pagename}>
  {item.heading? (
    <p className={`${isButtonClicked===true? 'd-block text-muted mx-4 mt-3 mb-2':'d-none'}`}>{item.heading}</p>
  ):(
    <>
  {item.isdropdown ? (
            <>
              {isButtonClicked===true?
                (
                  <div className="nav-item">
                  <NavLink onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`${activeLink===item.pagepath ? 'text-primary bg-primary bg-opacity-10 border-end border-3 border-primary px-4 py-3 rounded-0' : 'text-black my-btn px-4 py-3 rounded-0'}`}>
                    <item.icon className="text-black" style={{height:"20px",width:"20px",marginRight: isButtonClicked ? '8px' : null}}/>
                    {item.pagename}
                    <ChevronDownIcon className="text-black" style={{height:"15px",width:"15px",marginLeft: isButtonClicked ? '8px' : null}}/>
                  </NavLink>
                  <Collapse in={isDropdownOpen}>
                  <div className="dropdown-menu border-0 bg-light" style={{position:"static"}}>
                    {item.dropdownItems.map((dropdownItem) => (
                      <button key={dropdownItem.name} onClick={() => handleTabClick(dropdownItem.pagepath)}  className={`${activeLink===dropdownItem.pagepath ? 'dropdown-item text-primary bg-primary bg-opacity-10 border-end border-3 border-primary px-4 py-3 rounded-0' : 'dropdown-item text-black my-btn px-4 py-3 rounded-0'}`}>
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                  </Collapse>
                </div>
                ):(
                  <div className="nav-item dropend">
                    <NavLink aria-expanded="false" data-bs-toggle="dropdown" data-bs-auto-close="true" className={`${activeLink===item.pagepath ? 'text-primary bg-primary bg-opacity-10 border-end border-3 border-primary px-4 py-3 rounded-0' : 'text-black my-btn px-4 py-3 rounded-0'}`}>
                      <item.icon className="text-black" style={{height:"20px",width:"20px",marginRight: isButtonClicked ? '8px' : null}}/>
                      </NavLink>
                      <div className="dropdown-menu mt-2" style={{transform:"translateX(170px)"}}>
                        {item.dropdownItems.map((dropdownItem) => (
                        <button key={dropdownItem.name} onClick={() => handleTabClick(dropdownItem.pagepath)}  className="dropdown-item btn-light">
                          {dropdownItem.name}
                          </button>
                          ))}
                      </div>
                  </div>
                )}
            </>
      ):(
        <NavLink onClick={() => handleTabClick(item.pagepath,item.pagename)} className={`${activeLink===item.pagepath ? 'text-primary bg-primary bg-opacity-10 border-end border-3 border-primary px-4 py-3 rounded-0' : 'text-black my-btn px-4 py-3 rounded-0'}`}>
    <item.icon  className={`${activeLink===item.pagepath ? 'text-primary':'text-black'}`} style={{height:"20px",width:"20px",marginRight: isButtonClicked ? '8px' : null}} />
    {isButtonClicked===true?item.pagename:null}
      </NavLink>
      )}
      </>
  )}
    </NavItem>
))}
</Nav>
</Col>
<Col className='col-sm p-4'>
{navs}
</Col>
</Row>
</Container>
  )
}

export default SidebarWithContent