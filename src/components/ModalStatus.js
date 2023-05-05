import React, { useEffect, useState } from 'react'
import { Button,Form,Modal } from 'react-bootstrap';
import axios from 'axios';

function ModalStatus({showModal,handleClose,id,status,usecasesget}) {
    // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
    const localaccessToken = localStorage.getItem('access_token');
    const sessionaccessToken = sessionStorage.getItem('access_token');
    const token = localaccessToken || sessionaccessToken;
    const [activestate,setActivestate]=useState();
    useEffect(()=>{
        setActivestate(status);
    },[status]);
    const handleButtonClick = () => {
        handleClose();
      };
    const handleStatus = (event) => {
        event.preventDefault();
        axios
          .put(`/usecases/${id}`, {
            status: activestate
          },{
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            handleClose();
            setTimeout(() => {
                usecasesget(); // Reload the page after submitting and closing the modal
              }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <Modal size='sm' centered show={showModal} onHide={handleButtonClick}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className='d-flex gap-4'>
        <div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="true" checked={activestate===true} onChange={()=>setActivestate(true)}/>
  <label className="form-check-label" htmlFor="exampleRadios1">
    Active
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="false" checked={activestate===false} onChange={()=>setActivestate(false)}/>
  <label className="form-check-label" htmlFor="exampleRadios2">
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