import React, { useEffect, useState } from 'react'
import { Button,Form,Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ModalStatus({showModal,handleClose,id,status}) {
    const [activestate,setActivestate]=useState();
    useEffect(()=>{
        setActivestate(status);
    },[status]);
    const navigate=useNavigate();
    const handleButtonClick = () => {
        handleClose();
      };
    const handleStatus = (event) => {
        event.preventDefault();
        axios
          .put(`/usecases/${id}`, {
            status: activestate,
          })
          .then((response) => {
            handleClose();
            navigate('/Admin/Usecases');
            setTimeout(() => {
                window.location.reload(); // Reload the page after submitting and closing the modal
              }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <Modal size='sm' centered show={showModal} onHide={handleButtonClick} closebutton={<Button className='btn-close' aria-label="Close">close</Button>}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className='d-flex gap-4'>
        <div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="true" checked={activestate===true} onChange={()=>setActivestate(true)}/>
  <label class="form-check-label" for="exampleRadios1">
    Active
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="false" checked={activestate===false} onChange={()=>setActivestate(false)}/>
  <label class="form-check-label" for="exampleRadios2">
    Inactive
  </label>
</div>
</div>
<Button className="btn btn-primary d-block w-50 mt-3" onClick={handleStatus} type='submit'>update status !</Button>
</Form>
        </Modal.Body>
      </Modal>
  )
}

export default ModalStatus