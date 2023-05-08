import React, { useState, useEffect } from 'react';
import { Button, Pagination } from 'react-bootstrap';
import {PencilSquareIcon, EyeIcon, TrashIcon} from '@heroicons/react/24/outline'
import axios from 'axios';
import ModalForm from './ModalForm';
import ModalView from './ModalView';
import ModalUpdateForm from './ModalUpdateForm';
import ModalDelete from './ModalDelete';
import ModalStatus from './ModalStatus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Usecases() {
  const [usecases, setUsecases] = useState([]);
  const [status,setStatus]=useState(false);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages,setTotalPages]=useState('')

  

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setActivePage(1); // Reset the active page to 1 when changing the number of items per page
  }

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentUseCases = usecases.slice(startIndex, endIndex);

  const getusecases=(toastmsg, toasttype)=>{
    if (toastmsg && toasttype) {
      toast(toastmsg,{type: toasttype});
    }
    axios.get('/usecases')
      .then(response => setUsecases(response.data))
      .catch(error => console.log(error));
  }
  
  useEffect(() => {
    getusecases();
    setTotalPages(Math.ceil(usecases.length / itemsPerPage));
  }, [itemsPerPage,usecases.length]);

  const [showModalForm, setShowModalForm] = useState(false);
  const handleClose = () => setShowModalForm(false);
  const handleShowForm = () => setShowModalForm(true);

  const [showModalView, setShowModalView] = useState(false);
  const [id,setId]=useState('');
  const handleCloseView = () => setShowModalView(false);
  const handleShowView = (uceid) => {
    setShowModalView(true);
    setId(uceid);
  }

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseUpdate = () => setShowModalUpdate(false);
  const handleShowUpdate = (uceid) => {
    setShowModalUpdate(true);
    setId(uceid);
  }

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseDelete = () => setShowModalDelete(false);
  const handleShowDelete = (uceid,status) => {
    setShowModalDelete(true);
    setId(uceid);
    setStatus(status);
  }

  const [showModalStatus, setShowModalStatus] = useState(false);
  const handleCloseStatus = () => setShowModalStatus(false);
  const handleShowStatus = (uceid,status) => {
    setShowModalStatus(true);
    setId(uceid);
    setStatus(status);
  }

  return (
    <div className="container-fluid p-4">
  <div className="row">
    <div className="col-12 col-sm-6 col-md-6">
      <h3 className="text-dark mb-4">Usecases</h3>
    </div>
  </div>
  <ToastContainer position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />

{showModalForm && (
  <ModalForm showModal={showModalForm} handleClose={handleClose}  usecasesget={getusecases}/>
)}

{showModalView && (
  <ModalView showModal={showModalView} handleClose={handleCloseView} id={id} />
)}

{showModalUpdate && (
  <ModalUpdateForm showModal={showModalUpdate} handleClose={handleCloseUpdate} id={id} usecasesget={getusecases} />
)}

{showModalDelete && (
  <ModalDelete showModal={showModalDelete} handleClose={handleCloseDelete} id={id} status={status} usecasesget={getusecases} />
)}

{showModalStatus && (
  <ModalStatus showModal={showModalStatus} handleClose={handleCloseStatus} id={id} status={status} usecasesget={getusecases} />
)}

  <div className="card">
    <div className="card-header bg-white py-3 ">
      <div className="row justify-content-between">
      <div className="col-12 d-flex justify-content-end gap-3">
      <div className='mt-1'>
        <label className="me-3">Records per page:</label>
        <select className='p-1 rounded small-shadow' value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
        </select>
      </div>
        <Button className="btn btn-primary border small rounded-3" onClick={handleShowForm}>Add Usecase</Button>
      </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="table-responsive">
          <table className="table table-hover table-bordered m-0 table-scroll">
            <thead className='bg-light text-uppercase'>
              <tr>
                <th className="text-start px-4 py-4">Name</th>
                <th className="text-start py-4">Heading</th>
                <th className='text-start py-4 d-none d-lg-block'>Description</th>
                <th className="text-start px-4 py-4">Status</th>
                <th className="text-center py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentUseCases.map(usecase => (
              <tr key={usecase.ucid}>
                <td className='px-4 py-4'>{usecase.usecase_name}</td>
                <td className='py-4'>{usecase.heading}</td>
                <td className='py-4 d-none d-lg-block'><p className='tds' title={usecase.usecase_desc}>{usecase.usecase_desc}</p></td>
                <td style={{paddingTop:"34px"}} className='px-4'><small role='button' onClick={()=>handleShowStatus(usecase.ucid,usecase.status)} className={`${usecase.status===true?'rounded-5 bg-success text-white d-inline px-2 py-1':'rounded-5 bg-danger text-white d-inline px-2 py-1'}`}>{usecase.status===true?'Active':'Inactive'}</small></td>
                <td className="text-center align-middle" style={{width:"160px"}}><button onClick={()=>handleShowView(usecase.ucid)} className='btn'><EyeIcon style={{height:"18px",width:"18px"}} /></button><button className='btn' onClick={()=>handleShowUpdate(usecase.ucid)}><PencilSquareIcon style={{height:"18px",width:"18px"}} /></button><button className='btn' onClick={()=>handleShowDelete(usecase.ucid,usecase.status)}><TrashIcon style={{height:"18px",width:"18px",color: '#DC3545'}} /></button></td>
              </tr>
            ))}
            </tbody>
          </table>
          <Pagination className="m-3">
          <Pagination.First onClick={() => handlePageChange(1)}/>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>{index + 1}</Pagination.Item>
        ))}
        <Pagination.Last onClick={() => handlePageChange(totalPages)}/>
      </Pagination>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Usecases