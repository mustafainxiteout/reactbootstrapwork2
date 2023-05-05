import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Forgotpassword() {
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
    
        try {
          await axios.post('http://127.0.0.1:8000/users/forgot_password', formData);
          navigate('/');
        } 
        catch (error) {
          console.log(error.response.data.message);
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
                    <p className="text-muted">Enter the email id associated with your account and we'll send a verify link via mail</p>
                    <form onSubmit={handleSubmit} method="post">
                        <div className="mb-3"><input className="shadow form-control" type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email id"/></div>
                        <div className="mb-3"><input className="shadow form-control" type="password" name="new_password" value={formData.new_password} onChange={handleInputChange} required placeholder="New Password"/></div>
                        <div className="mb-5"><button className="btn btn-primary shadow" type="submit">Reset password</button></div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Forgotpassword