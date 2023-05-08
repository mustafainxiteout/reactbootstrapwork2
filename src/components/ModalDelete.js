import React from 'react'
import { Button,Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function ModalDelete({showModal,handleClose,id,status,usecasesget}) {
    // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
    const localaccessToken = localStorage.getItem('access_token');
    const sessionaccessToken = sessionStorage.getItem('access_token');
    const token = localaccessToken || sessionaccessToken;
    const handleButtonClick = () => {
        handleClose();
      };
    const handleDeleteTemporary = () => {
        axios
          .put(`/usecases/${id}`, {
            status: false
          },{
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            handleClose();
            setTimeout(() => {
              usecasesget("Deactivated Successfully!",toast.TYPE.SUCCESS); 
              }, 1000);
          })
          .catch((error) => {
            handleClose();
            usecasesget("Error Occured!",toast.TYPE.ERROR); // Reload the page after submitting and closing the modal 
          });
      };
    const handleDeletePermanently = () => {
        axios.delete(`/usecases/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
            handleClose();
            setTimeout(() => {
              usecasesget("Deleted Successfully!",toast.TYPE.SUCCESS); 
              }, 1000);
          })
          .catch(error => {
            handleClose();
            usecasesget("Error Occured!",toast.TYPE.ERROR); // Reload the page after submitting and closing the modal 
          });
      };
  return (
    <Modal size='sm' centered show={showModal} onHide={handleButtonClick}>
        <Modal.Header closeButton>
          <Modal.Title>{status === true? 'Deactivate':'Delete'} Usecase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are you sure that you want to {status === true? 'deactivate':'delete'}?</p>
        <div className='d-flex gap-3'>
            <Button className='btn btn-primary d-block w-50' onClick={handleButtonClick}>Cancel</Button>
            <Button className="btn btn-danger d-block w-50" onClick={() => (status === true ? handleDeleteTemporary() : handleDeletePermanently())}>{status === true? 'Deactivate':'Delete'}</Button>
        </div>
        </Modal.Body>
      </Modal>
  )
}

export default ModalDelete