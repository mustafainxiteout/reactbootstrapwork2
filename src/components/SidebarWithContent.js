import React,{useEffect, useState} from 'react'
import '../sidebar.css';
import { Col, Container, NavLink, Row, Nav, NavItem } from 'react-bootstrap';
import { PresentationChartBarIcon, RectangleGroupIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation } from 'react-router-dom';

function SidebarWithContent({navs,isButtonClicked}) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const pageId  = 1;
  const navigate=useNavigate()

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
        { name: 'Item 1', path: `/Admin/NewPage/${pageId}` },
        { name: 'Item 2', path: '/Admin/NewPage/2' },
        { name: 'Item 3', path: '/Admin/NewPage/3' },
      ],
    },
    {
      pagename:'New Page 2',
      pagepath:'/Admin/NewPage/4',
      icon:RectangleStackIcon
    }
  ]

return (
<Container fluid className={`${isButtonClicked===true? 'd-none d-lg-block':'d-block'}`} style={{transition:"width 3.0s ease-in-out"}}>
<Row>
<Col className="col-auto bg-light shadow flex-shrink-0 d-flex border p-0" style={{width: "auto",minHeight:"92.5vh",transition:"width 0.3s ease-in-out"}}>
<Nav variant='pills' className='flex-column text-start'>
{data.map((item)=>( 
<NavItem key={item.pagename}>
  {item.heading? (
    <p className={`${isButtonClicked===true? 'd-block text-muted mx-4 mt-3 mb-2':'d-none'}`}>{item.heading}</p>
  ):(
    <>
{item.isdropdown ? (
<div className="dropend">
  <NavLink aria-expanded="false" data-bs-toggle="dropdown" data-bs-auto-close="true" className={`${activeLink===item.pagepath ? 'text-primary bg-primary bg-opacity-10 border-end border-3 border-primary px-4 py-3 rounded-0' : 'text-black my-btn px-4 py-3 rounded-0'}`}>
<item.icon className="text-black" style={{height:"20px",width:"20px",marginRight: isButtonClicked ? '8px' : null}}/>
{isButtonClicked===true?item.pagename:null}
</NavLink>
      <div className="dropdown-menu mt-2" style={{transform:"translateX(170px)"}}>
        {item.dropdownItems.map((dropdownItem) => (
        <button key={dropdownItem.name} href={dropdownItem.path} onClick={() => handleTabClick(dropdownItem.path,dropdownItem.name)}  className="dropdown-item btn-light">
        {dropdownItem.name}
        </button>
        ))}
      </div>
</div>
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