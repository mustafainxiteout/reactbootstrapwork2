import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function ModalForm({showModal,handleClose,usecasesget}) {
  // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
  const localaccessToken = localStorage.getItem('access_token');
  const sessionaccessToken = sessionStorage.getItem('access_token');
  const token = localaccessToken || sessionaccessToken;
  const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        usecase_name: '',
        heading: '',
        usecase_desc: '',
        disp_order: '',
        nav_link: '',
        label: {
          level1: '',
          level2: '',
        }
      });

      const handleButtonClick = () => {
        handleClose();
      };

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('label')) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            label: {
              ...prevFormData.label,
              [name.split('.')[1]]: value
            }
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));
        }
      };      
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
        }
        else{
        setValidated(true);
        axios.post('/usecases', formData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
            handleClose(); 
            usecasesget("Created Successfully!",toast.TYPE.SUCCESS); // Reload the page after submitting and closing the modal 
          })
          .catch((error) => {
            handleClose();
            usecasesget(error.response.data.message,toast.TYPE.ERROR); // Reload the page after submitting and closing the modal 
          });
        }
      };

  return (
    <Modal centered size='lg' show={showModal} onHide={handleButtonClick}>
        <Modal.Header closeButton>
          <Modal.Title>Add Usecase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} className="text-start" onSubmit={handleSubmit}>
          <div className='d-flex gap-3'>
          <Form.Group controlId="validationCustom01" className="mb-3 w-50">
          <Form.Control required type="text" className='text-uppercase' name="usecase_name" placeholder="Enter usecase name" pattern="^\S*$" value={formData.usecase_name} onChange={handleInputChange} style={{boxShadow: '0px 0px'}}/>
          <Form.Control.Feedback type='invalid'>Please do not use spaces and provide only one word</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02" className="mb-3 w-50">
          <Form.Control required type="text" pattern="^\S.*$" name="heading" placeholder="Enter heading" value={formData.heading} onChange={handleInputChange} style={{boxShadow: '0px 0px'}}/>
          <Form.Control.Feedback type='invalid'>Please do not fill only spaces or start with spaces</Form.Control.Feedback>
          </Form.Group>
          </div>
          <Form.Group controlId="validationCustom03" className="mb-3">
          <Form.Control as="textarea" rows={3} required type="text" pattern="^\S.*$" name="usecase_desc" placeholder="Enter usecase description" value={formData.usecase_desc} onChange={handleInputChange} style={{boxShadow: '0px 0px'}}/>
          <Form.Control.Feedback type='invalid'>Please do not fill only spaces or start with spaces</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom04" className="mb-3">
          <Form.Control required type="number" pattern="^\S*$" name="disp_order" placeholder="Enter disp_order" value={formData.disp_order} onChange={handleInputChange} style={{boxShadow: '0px 0px'}}/>
          <Form.Control.Feedback type='invalid'>Please do not fill only spaces or start with spaces</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom05" className="mb-3">
          <Form.Control required pattern="^\/[a-zA-Z]+$" type="text" name="nav_link" placeholder="Enter nav_link" value={formData.nav_link} onChange={handleInputChange} style={{boxShadow: '0px 0px'}}/>
          <Form.Control.Feedback type='invalid'>Please enter navigation links in this format: /sales</Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex gap-3'>
          <Form.Group controlId="validationCustom06" className="mb-3 w-50">
          <Form.Control required type="text" name="label.level1" placeholder="Enter source" value={formData.label.level1} pattern="^\S.*$" onChange={handleInputChange} style={{boxShadow: '0px 0px'}}/>
          <Form.Control.Feedback type='invalid'>Please do not fill only spaces or start with spaces</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom07" className="mb-3 w-50 text-start">
          <Form.Control required type="text" name="label.level2" placeholder="Enter destination" value={formData.label.level2} pattern="^\S.*$" onChange={handleInputChange} style={{boxShadow: '0px 0px'}}/>
          <Form.Control.Feedback type='invalid'>Please do not fill only spaces or start with spaces</Form.Control.Feedback>
          </Form.Group>
          </div>
          <div className="d-flex gap-3 justify-content-end">
            <Button className="btn btn-danger d-block w-25" onClick={handleButtonClick}>Cancel</Button>
            <Button className="btn btn-primary d-block w-25" type="submit">Submit</Button>
          </div>
        </Form>
        </Modal.Body>
      </Modal>
  )
}

export default ModalForm