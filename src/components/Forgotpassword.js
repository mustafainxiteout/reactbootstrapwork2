import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

function Forgotpassword() {
  const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        new_password: '',
      });
    
      const navigate=useNavigate();
    
      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
        }
        if(form.checkValidity()===true){
         setValidated(true);
         try {
           await axios.post('/users/forgot_password', formData);
           navigate('/');
         } 
         catch (error) {
           console.log(error.response.data.message);
         }
        }
      };

  return (
    <div className='googlesans'>
    <section className="py-4 py-md-5 mt-5">
        <div className="container py-md-5">
            <div className="row d-flex align-items-center">
                <div className="col-md-6 text-center"><img className="img-fluid w-100" src="./desk.svg" alt="forgot"/></div>
                <div className="col-md-5 col-xl-4 text-start">
                    <h2 className="display-6 fw-bold text-center text-md-start mb-4">Forgot your <span className="underline">password</span>?</h2>
                    <p className="text-muted">Enter the email id associated with your account with new password and we'll send a reset password link via mail</p>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} method="post">
                    <Form.Group controlId="validationCustom01" className="mb-3">
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email id" style={{boxShadow: '0px 0px'}}/>
                    <Form.Control.Feedback type='invalid'>Please do not use spaces and provide only one word</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom02" className="mb-3">
                    <Form.Control type="password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[\w!@#$%^&*()_+]{8,}$" name="new_password" value={formData.new_password} onChange={handleInputChange} required placeholder="New Password" style={{boxShadow: '0px 0px'}}/>
                    <Form.Control.Feedback type='invalid'>Please do not use spaces and provide only one word</Form.Control.Feedback>
                    </Form.Group>
                    <div className="mb-5"><button className="btn btn-primary shadow" type="submit">Reset password</button></div>
                    </Form>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Forgotpassword