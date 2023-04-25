import React,{useState} from 'react'
import { Col, Container, NavLink, Row, Nav, NavItem } from 'react-bootstrap';
import { PresentationChartBarIcon, RectangleGroupIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

function SidebarWithContent({navs,isButtonClicked}) {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const navigate=useNavigate()
  const handleTabClick = (pagepath,pagename) => {
  navigate(pagepath);
  setActiveLink(pagename);
  };
  
  const data=[
    {
      pagename:'Dashboard',
      pagepath:'/Admin/Dashboard',
      icon:PresentationChartBarIcon
    },
    {
      pagename:'New Page',
      pagepath:'/Admin/NewPage',
      icon:RectangleGroupIcon
    },
    {
      pagename:'New Page 2',
      pagepath:'/Admin/NewPage/1',
      icon:RectangleStackIcon
    }
  ]

return (
<Container fluid className={`${isButtonClicked===true? 'd-none d-lg-block':'d-block'}`} style={{transition:"width 0.3s ease-in-out"}}>
<Row>
<Col className="col-auto bg-light shadow flex-shrink-0 d-flex border p-0" style={{width: "auto",minHeight:"92.5vh",transition:"width 0.3s ease-in-out"}}>
<Nav variant='pills' className='flex-column text-start'>
{data.map((item)=>( 
<NavItem key={item.pagename}>
    <NavLink onClick={() => handleTabClick(item.pagepath,item.pagename)} className={`${activeLink===item.pagename ? 'text-primary bg-primary bg-opacity-10 border-end border-3 border-primary px-4 py-3 rounded-0' : 'text-black my-btn px-4 py-3 rounded-0'}`}>
    <item.icon  className={`${activeLink===item.pagename ? 'text-primary':'text-black'}`} style={{height:"20px",width:"20px",marginRight: isButtonClicked ? '8px' : null}} />
    {isButtonClicked===true?item.pagename:null}
      </NavLink>
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