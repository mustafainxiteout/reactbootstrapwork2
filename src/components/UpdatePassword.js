import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
  const localaccessToken = localStorage.getItem('access_token');
  const sessionaccessToken = sessionStorage.getItem('access_token');

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
      });

  const [confirmpassword,setConfirmpassword]=useState('');
    
      const navigate=useNavigate();
    
      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
  
    
  const token = localaccessToken || sessionaccessToken;

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.new_password !== confirmpassword) {
          console.log("Passwords do not match");
          return;
        }
        try {
          await axios.put(`/users/updatepassword`, formData,{
            headers: {
              Authorization: `Bearer ${token}`
          }
          });
          navigate('/');
        } 
        catch (error) {
          console.log(error.response.data.message);
        }
      };

  return (
    <div className='googlesans'>
    <section className="col-md-6 col-xl-4 text-start">
                    <p className="text-muted">Enter the current password associated with your account and we'll send a verify link via mail</p>
                    <form onSubmit={handleSubmit} method="post">
                    <div className="mb-3"><input className="shadow form-control" type="password" name="old_password" value={formData.old_password} onChange={handleInputChange} required placeholder="Current Password"/></div>
                        <div className="mb-3"><input className="shadow form-control" type="password" name="new_password" value={formData.new_password} onChange={handleInputChange} required placeholder="New Password"/></div>
                        <div className="mb-3"><input className="shadow form-control" type="password" name="new_password" value={confirmpassword} onChange={(event) => setConfirmpassword(event.target.value)} required placeholder="Confirm New Password"/></div>
                        <div className="mb-5"><button className="btn btn-primary shadow" type="submit">Reset password</button></div>
                    </form>       
    </section>
    </div>
  )
}

export default UpdatePassword