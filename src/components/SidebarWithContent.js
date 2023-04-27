import React,{useEffect, useState} from 'react'
import '../sidebar.css';
import { Col, Container, NavLink, Row, Nav, NavItem, Collapse } from 'react-bootstrap';
import { PresentationChartBarIcon, RectangleGroupIcon, RectangleStackIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation } from 'react-router-dom';

const pageId  = 1;

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
    pagepath:'/Admin/NewPage/0',
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
  },
  {
    pagename:'New Page 3',
    pagepath:'/Admin/NewPage/0',
    icon:RectangleGroupIcon,
    isdropdown: true,
    dropdownItems: [
      { name: 'Item 1', pagepath: '/Admin/NewPage/8' },
      { name: 'Item 2', pagepath: '/Admin/NewPage/6' },
      { name: 'Item 3', pagepath: '/Admin/NewPage/3' },
    ],
  },
]

function SidebarWithContent({navs,isButtonClicked}) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/Admin/Dashboard');
  const navigate=useNavigate()

  // Create an array to hold the state of each dropdown item
  const [dropdownStates, setDropdownStates] = useState(data.map(() => false));
  
  // Handle the click event on each dropdown item
  const handleDropdownClick = (index) => {
    setDropdownStates((prevState) =>
      prevState.map((_, i) => (i === index ? !prevState[i] : false))
    );
  };
  
  useEffect(() => {
    setActiveLink(location.pathname);
    const index = data.findIndex((item) =>
      item.isdropdown
        ? item.dropdownItems.some(
            (dropdownItem) => dropdownItem.pagepath === location.pathname
          )
        : item.pagepath === location.pathname
    );
    if (index !== -1) {
      const timerId = setTimeout(() => {
        setDropdownStates((prevState) => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
      }, 0);
      return () => clearTimeout(timerId);
    }
  }, [location]);
  
  
  
  

  const handleTabClick = (pagepath) => {
  navigate(pagepath);
  };
  


return (
<Container fluid style={{transition:"width 3.0s ease-in-out",marginTop:isButtonClicked===true?"73px":"70px"}} className='position-fixed'>
<Row>
<Col className={`${isButtonClicked===true? 'd-none d-lg-block col-auto bg-white shadow-small flex-shrink-0 d-flex border p-0':'d-block col-auto bg-white shadow-small flex-shrink-0 d-flex border p-0'}`} style={{width: "auto",minHeight:"92.5vh",transition:"width 0.3s ease-in-out"}}>
<Nav variant='pills' className='flex-column text-start'>
{data.map((item,index)=>( 
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
                  <NavLink onClick={() => handleDropdownClick(index)} className={`${dropdownStates[index] ? 'text-primary bg-opacity-10 px-4 py-3 rounded-0' : 'text-black my-btn px-4 py-3 rounded-0'}`}>
                    <div className='d-flex justify-content-between'>
                    <div>
                    <item.icon className={`${dropdownStates[index]?'text-primary':'text-black'}`} style={{height:"20px",width:"20px",marginRight: isButtonClicked ? '8px' : null}}/>
                    {item.pagename}
                    </div>
                    <ChevronDownIcon className={`${dropdownStates[index]?'text-primary':'text-black'}`} style={{height:"15px",width:"15px",marginTop: isButtonClicked ? '4px' : null,marginLeft: isButtonClicked ? '60px' : null,transform: dropdownStates[index]===true?  'rotateZ(-180deg)' : null}}/>
                    </div>
                  </NavLink>
                  <Collapse in={dropdownStates[index]}>
                  <div className="dropdown-menu border-0 bg-white" style={{position:"static",transition:"all 0.1s ease-in-out"}}>
                    {item.dropdownItems.map((dropdownItem) => (
                      <button key={dropdownItem.name} onClick={() => handleTabClick(dropdownItem.pagepath)} style={{paddingLeft:"40px"}}  className={`${activeLink===dropdownItem.pagepath ? 'dropdown-item text-primary bg-primary bg-opacity-10 border-end border-3 border-primary py-3 rounded-0' : 'dropdown-item text-black my-btn py-3 rounded-0'}`}>
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