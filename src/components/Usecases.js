import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {PencilSquareIcon, EyeIcon, TrashIcon} from '@heroicons/react/24/outline'
import axios from 'axios';
import ModalForm from './ModalForm';
import ModalView from './ModalView';
import ModalUpdateForm from './ModalUpdateForm';
import ModalDelete from './ModalDelete';
import ModalStatus from './ModalStatus';

function Usecases() {
  const [usecases, setUsecases] = useState([]);
  const [status,setStatus]=useState(false);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/usecases')
      .then(response => setUsecases(response.data))
      .catch(error => console.log(error));
  }, []);

  const [showModalForm, setShowModalForm] = useState(false);
  const handleClose = () => setShowModalForm(false);
  const handleShowForm = () => setShowModalForm(true);

  const [showModalView, setShowModalView] = useState(false);
  const [id,setId]=useState('');
  const handleCloseView = () => setShowModalView(false);
  const handleShowView = (id) => {
    setShowModalView(true);
    setId(id);
  }

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseUpdate = () => setShowModalUpdate(false);
  const handleShowUpdate = (id) => {
    setShowModalUpdate(true);
    setId(id);
  }

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseDelete = () => setShowModalDelete(false);
  const handleShowDelete = (id,status) => {
    setShowModalDelete(true);
    setId(id);
    setStatus(status);
  }

  const [showModalStatus, setShowModalStatus] = useState(false);
  const handleCloseStatus = () => setShowModalStatus(false);
  const handleShowStatus = (id,status) => {
    setShowModalStatus(true);
    setId(id);
    setStatus(status);
  }

  return (
    <div className="container-fluid bg-light h-100 p-4">
  <div className="row">
    <div className="col-12 col-sm-6 col-md-6">
      <h3 className="text-dark mb-4">Usecases</h3>
    </div>
  </div>
  <ModalForm showModal={showModalForm} handleClose={handleClose} />
  <ModalView showModal={showModalView} handleClose={handleCloseView} id={id} />
  <ModalUpdateForm showModal={showModalUpdate} handleClose={handleCloseUpdate} id={id} />
  <ModalDelete showModal={showModalDelete} handleClose={handleCloseDelete} id={id} status={status}/>
  <ModalStatus showModal={showModalStatus} handleClose={handleCloseStatus} id={id} status={status}/>
  <div className="card">
    <div className="card-header bg-white py-3 ">
      <div className="row align-items-center justify-content-end">
      <div className="col-12 col-sm-6 col-md-6 text-end"><Button className="btn btn-primary border small rounded-3" onClick={handleShowForm}>Add Usecase</Button></div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="table-responsive">
          <table className="table table-hover m-0  table-borderless">
            <thead className='bg-light text-uppercase'>
              <tr>
                <th className="text-start px-4 py-4">Name</th>
                <th className="text-start py-4">Heading</th>
                <th className='text-start py-4 d-none d-lg-block'>Description</th>
                <th className="text-start py-4">Status</th>
                <th className="text-center py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
            {usecases.map(usecase => (
              <tr key={usecase.ucid}>
                <td className='px-4 py-4'>{usecase.usecase_name}</td>
                <td className='py-4'>{usecase.heading}</td>
                <td className='py-4 d-none d-lg-block'>{usecase.usecase_desc}</td>
                <td style={{paddingTop:"34px"}}><small role='button' onClick={()=>handleShowStatus(usecase.ucid,usecase.status)} className={`${usecase.status===true?'rounded-5 bg-success text-white d-inline px-2 py-1':'rounded-5 bg-danger text-white d-inline px-2 py-1'}`}>{usecase.status===true?'Active':'Inactive'}</small></td>
                <td className="text-center align-middle" style={{width:"160px",height:"60px"}}><button onClick={()=>handleShowView(usecase.ucid)} className='btn'><EyeIcon style={{height:"18px",width:"18px"}} /></button><button className='btn' onClick={()=>handleShowUpdate(usecase.ucid)}><PencilSquareIcon style={{height:"18px",width:"18px"}} /></button><button className='btn' onClick={()=>handleShowDelete(usecase.ucid,usecase.status)}><TrashIcon style={{height:"18px",width:"18px",color: '#DC3545'}} /></button></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Usecases