import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function ModalForm({showModal,handleClose}) {
    const [formData, setFormData] = useState({
        usecase_name: '',
        heading: '',
        usecase_desc: '',
        disp_order: '',
        nav_link: '',
        created_id: 'user2',
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
        axios.post('/usecases', formData)
          .then((response) => {
            handleClose(); 
            window.location.reload(); // Reload the page after submitting and closing the modal 
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <Modal centered size='lg' show={showModal} onHide={handleButtonClick} closebutton={<Button className='btn-close' aria-label="Close">close</Button>}>
        <Modal.Header closeButton>
          <Modal.Title>Add Usecase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="text-center" onSubmit={handleSubmit}>
          <div className='d-flex gap-3'>
              <div className="mb-3 w-50"><input type="text" name="usecase_name" placeholder="Enter usecase name" value={formData.usecase_name} onChange={handleInputChange} required className="form-control" style={{boxShadow: '0px 0px'}} /></div>
              <div className="mb-3 w-50"><input type="text" name="heading" placeholder="Enter heading" value={formData.heading} onChange={handleInputChange} required className="form-control" style={{boxShadow: '0px 0px'}} /></div>
          </div>
          <div className='mb-3'><textarea rows={3} type="text" name="usecase_desc" placeholder="Enter usecase description" value={formData.usecase_desc} onChange={handleInputChange} required className="form-control" style={{boxShadow: '0px 0px'}}/></div>
          <div className="mb-3"><input type="number" name="disp_order" placeholder="Enter disp_order" value={formData.disp_order} onChange={handleInputChange} required className="form-control" style={{boxShadow: '0px 0px'}} /></div>
          <div className="mb-3"><input type="text" name="nav_link" placeholder="Enter nav_link" value={formData.nav_link} onChange={handleInputChange} required className="form-control" style={{boxShadow: '0px 0px'}} /></div>
          <div className='d-flex gap-3'>
              <div className="mb-3 w-50"><input type="text" name="label.level1" placeholder="Enter source" value={formData.label.level1} onChange={handleInputChange} required className="form-control" style={{boxShadow: '0px 0px'}} /></div>
              <div className="mb-3 w-50"><input type="text" name="label.level2" placeholder="Enter target" value={formData.label.level2} onChange={handleInputChange} required className="form-control" style={{boxShadow: '0px 0px'}} /></div>
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