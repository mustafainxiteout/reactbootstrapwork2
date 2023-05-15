import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {PencilIcon} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function ViewUserProfile() {
  // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
  const localaccessToken = localStorage.getItem('access_token');
  const sessionaccessToken = sessionStorage.getItem('access_token');
  const token = localaccessToken || sessionaccessToken;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showinput, setShowInput] = useState(false);
  const [gender, setGender] = useState('');
  const navigate=useNavigate();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('/users',{headers: {
        Authorization: `Bearer ${token}`
      }}); // Replace '/api/user' with the actual API endpoint for fetching user details
      const { first_name, last_name, email, gender } = response.data;
      setFirstName(first_name);
      setLastName(last_name);
      setEmail(email);
      setGender(gender);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  useEffect(() => {
    // Fetch user details from API here
    fetchUserDetails();
  },[]);

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

  const handleCancelClick = () =>{
    setShowInput(false);
    fetchUserDetails();
  }


  const handleUpdateClick = async () => {
    try {
      await axios.put('/users', {
        first_name:firstName,
        last_name:lastName,
        gender:gender,
      },{headers: {
        Authorization: `Bearer ${token}`
      }}); // Replace '/api/user' with the actual API endpoint for updating user details
      setShowInput(false);
    } catch (error) {
      alert('Failed to update user details:', error);
    }
  };

  const handleReverify = () => {
    axios.post('/users/reverify', {email:email})
      .then((response) => {
        // Handle the response data
        alert('Verification Email will be sent to the email.');
        // remove access token from local storage
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        navigate('/');
      })
      .catch((error) => {
        // Handle the error
        alert(error);
      });
  };

  const handleUpdateEmail = async () => {
    try {
      await axios.put('/users', {
        first_name:firstName,
        last_name:lastName,
        gender:gender,
        email:email
      },{headers: {
        Authorization: `Bearer ${token}`
      }}); // Replace '/api/user' with the actual API endpoint for updating user details
      setShowInput(false);
      handleReverify();
    } catch (error) {
      alert(error.response.data.message);
    }
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
              <div className='d-flex gap-2'><Form.Control className='mb-3' type="email" value={email} onChange={handleEmailChange} /><button className='btn btn-light m-0 mb-3 shadow-small border' onClick={handleUpdateEmail}>Verify</button></div>
          ) : (
            <Form.Text><p>{email}</p></Form.Text>
          )}
      </Form.Group>
      {showinput && (
        <div className='d-flex gap-3'>
        <Button className='btn-danger w-50' onClick={handleCancelClick}>Cancel</Button>
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