import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function ViewUserProfile() {
  const [firstName, setFirstName] = useState('Mustafa');
  const [lastName, setLastName] = useState('test');
  const [email, setEmail] = useState('test@gmail.com');
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleFirstNameClick = () => {
    setIsEditingFirstName(true);
  };

  const handleLastNameClick = () => {
    setIsEditingLastName(true);
  };

  const handleEmailClick = () => {
    setIsEditingEmail(true);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdateClick = () => {
    // Make API call to update user details here
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
    setIsEditingEmail(false);
  };

  return (
    <Container className='d-flex flex-column p-0 m-0 justify-content-start col-md-5 col-lg-3'>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
          {isEditingFirstName ? (
              <Form.Control className='mb-3' type="text" value={firstName} onChange={handleFirstNameChange} />
          ) : (
            <Form.Text onClick={handleFirstNameClick}><p>{firstName}</p></Form.Text>
          )}
      </Form.Group>
      <Form.Group controlId="formLastName">
      <Form.Label>Last Name:</Form.Label>
          {isEditingLastName ? (
              <Form.Control className='mb-3' type="text" value={lastName} onChange={handleLastNameChange} />
          ) : (
            <Form.Text onClick={handleLastNameClick}><p>{lastName}</p></Form.Text>
          )}
        
      </Form.Group>
      <Form.Group controlId="formEmail">
      <Form.Label>Email:</Form.Label>
          {isEditingEmail ? (
              <Form.Control className='mb-3' type="email" value={email} onChange={handleEmailChange} />
          ) : (
            <Form.Text onClick={handleEmailClick}><p>{email}</p></Form.Text>
          )}
      </Form.Group>
      {(isEditingFirstName || isEditingLastName || isEditingEmail) && (
        <Button className='btn-primary' onClick={handleUpdateClick}>Update</Button>
      )}
    </Container>
  );
}

export default ViewUserProfile;