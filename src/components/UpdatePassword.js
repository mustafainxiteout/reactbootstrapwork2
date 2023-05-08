import React, { useState } from "react";
import axios from 'axios';
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
  const localaccessToken = localStorage.getItem('access_token');
  const sessionaccessToken = sessionStorage.getItem('access_token');
  const [validated, setValidated] = useState(false);
  const [errormsg, setErrormsg]=useState('');
  const [newerror, setNewerror]=useState('');

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
      });

const navigate=useNavigate();
  const [confirmpassword,setConfirmpassword]=useState('');

    
      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
  
    
  const token = localaccessToken || sessionaccessToken;

      const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if ( form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
          setErrormsg('Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, one special character and no spaces.')
        }
        if (formData.new_password !== confirmpassword){
          event.stopPropagation();
          setValidated(true);
          setErrormsg('Passwords dont match.')
        }
        if(formData.new_password===confirmpassword && form.checkValidity()===true){
        setValidated(true);
        try {
           await axios.put(`/users/updatepassword`, formData,{
            headers: {
              Authorization: `Bearer ${token}`
            }
           }).then((response)=>
             navigate('/')
           )
          } 
          catch (error) {
            if (error.response.status === 401) {
              setNewerror('Incorrect password');
            } else if (error.response.status) {
              setNewerror('Unauthorized access');
            } else {
              setNewerror(error.response.data.message);
            }
          }
        }
      };

  return (
    <div className='googlesans'>
    <section className="col-md-6 col-xl-4 text-start">
                    <p className="text-muted">Enter the current password associated with your account and we'll send a verify link via mail</p>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Text>{newerror}</Form.Text>
                    <Form.Group controlId="validationCustom01" className="mb-3">
                    <Form.Control type="password" minLength="8" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[\w!@#$%^&*()_+]{8,}$" name="old_password" value={formData.old_password} onChange={handleInputChange} required placeholder="Current Password" style={{boxShadow: '0px 0px'}}/>
                    <Form.Control.Feedback type='invalid'>Check that you have entered your current assword</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom02" className="mb-3">
                    <Form.Control type="password" minLength="8" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[\w!@#$%^&*()_+]{8,}$" name="new_password" value={formData.new_password} onChange={handleInputChange} required placeholder="New Password" style={{boxShadow: '0px 0px'}}/>
                    <Form.Control.Feedback type='invalid'>{errormsg}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom03" className="mb-3">
                    <Form.Control type="password" minLength="8" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[\w!@#$%^&*()_+]{8,}$" name="confirmpassword" value={confirmpassword} onChange={(event) => setConfirmpassword(event.target.value)} required placeholder="Confirm New Password" style={{boxShadow: '0px 0px'}}/>
                    <Form.Control.Feedback type='invalid'>{errormsg}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="mb-5"><button className="btn btn-primary shadow" type="submit">Reset password</button></div>
                    </Form>       
    </section>
    </div>
  )
}

export default UpdatePassword