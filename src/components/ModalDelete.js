import React from 'react'
import { Button,Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ModalDelete({showModal,handleClose,id,status}) {
    const navigate=useNavigate();
    const handleButtonClick = () => {
        handleClose();
      };
    const handleDeleteTemporary = () => {
        axios
          .put(`http://127.0.0.1:8000/usecases/${id}`, {
            status: false,
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
    const handleDeletePermanently = () => {
        axios.delete(`/usecases/${id}`)
          .then(response => {
            navigate('/Admin/Usecases');
            setTimeout(() => {
                window.location.reload(); // Reload the page after submitting and closing the modal
              }, 1000);
          })
          .catch(error => {
            console.error(error);
          });
      };
  return (
    <Modal size='sm' centered show={showModal} onHide={handleButtonClick} closebutton={<Button className='btn-close' aria-label="Close">close</Button>}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Usecase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are you sure that you want to delete?</p>
        <div className='d-flex gap-3'>
            <Button className='btn btn-primary d-block w-50' onClick={handleButtonClick}>Cancel</Button>
            <Button className="btn btn-danger d-block w-50" onClick={() => (status === true ? handleDeleteTemporary() : handleDeletePermanently())}>Delete</Button>
        </div>
        </Modal.Body>
      </Modal>
  )
}

export default ModalDelete