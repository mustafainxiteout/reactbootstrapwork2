import React, { useState, useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function ModalView({showModal,handleClose,id}) {
  const [usecasesid, setUsecasesid] = useState([]);
  const handleButtonClick = () => {
    handleClose();
  };

  useEffect(() => {
    axios.get(`/usecases/${id}`)
      .then(response => setUsecasesid(response.data))
      .catch(error => console.log(error));
  }, [id]);

  return (
    <Modal centered show={showModal} onHide={handleButtonClick} closebutton={<Button className='btn-close' aria-label="Close">close</Button>}>
        {usecasesid.map(usecase => (
        <>
        <Modal.Header closeButton key={usecase.ucid}>
          <Modal.Title className='fw-bold'>{usecase.usecase_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div>
          <p>Heading : {usecase.heading}</p>
          <p>Description : {usecase.usecase_desc}</p>
          <p>Display Order : {usecase.disp_order}</p>
          <p>Navigation Link : {usecase.nav_link}</p>
          <p>Created by : {usecase.created_id}</p>
          <p>Source: {usecase.label.level1}</p>
          <p>Target: {usecase.label.level2}</p>
        </div> 
        </Modal.Body>
        </>
        ))}
      </Modal>
  )
}

export default ModalView