import React, { useState } from 'react';
import { Button, Modal} from 'react-bootstrap';


function BPage() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
      
     
  return (
    <>
    <Modal centered size='lg' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Usecase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>BPage</p>
        </Modal.Body>
      </Modal>
      <Button onClick={()=>setShowModal(true)}>SHow Modal</Button>
      </>
  )
}

export default BPage