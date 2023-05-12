import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {PencilIcon} from '@heroicons/react/24/outline'

function ViewUserProfile() {
  const [firstName, setFirstName] = useState('Mustafa');
  const [lastName, setLastName] = useState('test');
  const [email, setEmail] = useState('test@gmail.com');
  const [showinput, setShowInput] = useState(false);
  const [gender, setGender] = useState('male');

  const handleshowinputClick = () => {
    setShowInput(true);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };



  const handleUpdateClick = () => {
    // Make API call to update user details here
    setShowInput(false);
  };

  return (
    <Container className='d-flex flex-column p-0 m-0 justify-content-start col-md-5 col-lg-3'>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
          {showinput ? (
              <Form.Control className='mb-3' type="text" value={firstName} onChange={handleFirstNameChange} />
          ) : (
            <Form.Text><p>{firstName}</p></Form.Text>
          )}
      </Form.Group>
      <Form.Group controlId="formLastName">
      <Form.Label>Last Name:</Form.Label>
          {showinput ? (
              <Form.Control className='mb-3' type="text" value={lastName} onChange={handleLastNameChange} />
          ) : (
            <Form.Text><p>{lastName}</p></Form.Text>
          )}    
      </Form.Group>
      <Form.Group controlId="formGender">
      <Form.Label>Gender:</Form.Label>
          {showinput ? (
          <div className='d-flex gap-3 mb-3'>
          <Form.Check type="radio" label="Male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange}/>
          <Form.Check type="radio" label="Female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange}/> 
          </div>
          ) : (
            <Form.Text><p>{gender}</p></Form.Text>
          )}
        
      </Form.Group>
      <Form.Group controlId="formEmail">
      <Form.Label>Email:</Form.Label>
          {showinput ? (
              <Form.Control className='mb-3' type="email" value={email} onChange={handleEmailChange} />
          ) : (
            <Form.Text><p>{email}</p></Form.Text>
          )}
      </Form.Group>
      {showinput && (
        <div className='d-flex gap-3'>
        <Button className='btn-danger w-50' onClick={handleUpdateClick}>Cancel</Button>
        <Button className='btn-primary w-50' onClick={handleUpdateClick}>Update</Button>
        </div>
      )}
      {!showinput && 
      <Button className='d-inline-flex align-items-center w-25' onClick={handleshowinputClick}>
      <PencilIcon className='me-1' width="16px" height="16px"/>
      <span className='text-start'>Edit</span>
      </Button>
      }
    </Container>
  );
}

export default ViewUserProfile;