import React, { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import ViewUserProfile from './ViewUserProfile';
import UpdatePassword from './UpdatePassword';
import UpdateProfilePicture from './UpdateProfilePicture';

function UserContent() {
  const [key, setKey] = useState('viewProfile'); // set the initial active key to 'viewProfile'

  return (
    <div className='bg-light'>
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)} defaultActiveKey="viewProfile">
      
          <Nav className="d-flex bg-white border-bottom" >
            <Nav.Item>
              <Nav.Link className={`${key==='viewProfile' ? 'text-primary border-bottom border-3 border-primary py-3 px-4':'text-black py-3 px-4 my-tab-btn'}`}  eventKey="viewProfile">View Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item >
              <Nav.Link className={`${key==='second' ? 'text-primary border-bottom border-3 border-primary py-3 px-4':'text-black py-3 px-4 my-tab-btn'}`} eventKey="second">Update Password</Nav.Link>
            </Nav.Item>
            <Nav.Item >
              <Nav.Link className={`${key==='third' ? 'text-primary border-bottom border-3 border-primary py-3 px-4':'text-black py-3 px-4 my-tab-btn'}`} eventKey="third">Update Profile Picture</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className='p-4'>
            <Tab.Pane eventKey="viewProfile">
              <ViewUserProfile name="mustafa"/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <UpdatePassword/>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <UpdateProfilePicture/>
            </Tab.Pane>
          </Tab.Content>
      
    </Tab.Container>
    </div>
  );
}

export default UserContent;