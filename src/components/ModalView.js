import React, { useState, useEffect} from 'react';
import { Modal, Table } from 'react-bootstrap';
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

  const options = {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const formattedDate =(dateStr)=>{
    return new Date(dateStr.replace('T', ' ')).toLocaleString('en-GB', options).replace(/\//g, '-').replace(',', '  ');
  };
  
  return (
    <Modal centered size='lg' show={showModal} onHide={handleButtonClick}>
        {usecasesid.map(usecase => (
        <div key={usecase.ucid}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>{usecase.usecase_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table bordered responsive>
        <tbody>
        <tr>
          <th>Heading</th>
          <td>{usecase.heading}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{usecase.usecase_desc}</td>
        </tr>
        <tr>
          <th>Display Order</th>
          <td>{usecase.disp_order}</td>
        </tr>
        <tr>
          <th>Navigation Link</th>
          <td>{usecase.nav_link}</td>
        </tr>
        <tr>
          <th>Created by</th>
          <td>{usecase.created_id}</td>
        </tr>
        <tr>
          <th>Created on</th>
          <td>{formattedDate(usecase.created_dt.$date)}</td>
        </tr>
        {usecase.modify_id && (
        <>
        <tr>
        <th>Modified by</th>
        <td>{usecase.modify_id}</td>
        </tr>
        <tr>
        <th>Modified on</th>
        <td>{formattedDate(usecase.modify_dt.$date)}</td>
        </tr>
      </>
        )}
        <tr>
          <th>Source</th>
          <td>{usecase.label.level1}</td>
        </tr>
        <tr>
          <th>Target</th>
          <td>{usecase.label.level2}</td>
        </tr>
      </tbody>
    </Table>
        </Modal.Body>
        </div>
        ))}
      </Modal>
  )
}

export default ModalView