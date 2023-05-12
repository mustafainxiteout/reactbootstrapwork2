import React, { useEffect, useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import axios from 'axios';
import {ChevronDownIcon} from '@heroicons/react/24/outline'

function GetFiles() {
    const [groups, setGroups] = useState([]);
    const [usecases, setUsecases] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedUsecase, setSelectedUsecase] = useState('');
    const [files, setFiles] = useState([]);
    const [groupOption, setGroupOption]=useState('')
    const [usecaseOption, setUsecaseOption]=useState('')
    const [iconChange,setIconChange]=useState(false);
    const [msg,setMsg]=useState(false);
  
    const fetchGroups = () => {
      // Replace 'API_URL' with the actual URL of your Flask API
      axios.get('/filesupload/groups')
        .then(response => {
          setGroups(response.data);
        })
        .catch(error => {
          console.error('Error fetching groups:', error);
        });
    };
  
    const handleGroupChange = (event) => {
      const selectedGroup = event.target.value;
      setGroupOption(selectedGroup);
    };

    const fetchUsecases = () => {
      // Replace 'API_URL' with the actual URL of your Flask API
      axios.get('/usecases/ucoptions')
        .then(response => {
          setUsecases(response.data);
        })
        .catch(error => {
          console.error('Error fetching usecases:', error);
        });
    };
  
    const handleUsecaseChange = (event) => {
      const selectedusecase = event.target.value;
      setUsecaseOption(selectedusecase);
    };

    const handleGroupFiles = () => {
        setSelectedGroup(groupOption);
        setSelectedUsecase(usecaseOption)
        fetchFiles(groupOption,usecaseOption);
      };

    const fetchFiles = (group,ucid) => {
      // Replace 'API_URL' with the actual URL of your Flask API
      axios.get(`/filesupload/${group}/${ucid}`)
        .then(response => {
          setFiles(response.data[0].files);
          setMsg(false);
        })
        .catch(error => {
          console.log('Error fetching files:', error);
          setMsg(true);
        });
    };
  
    // Fetch groups from the Flask API
    useEffect(() => {
      fetchGroups();
      fetchUsecases();
    }, []);


  return (
    <section className='mt-4'>
    <div className='card shadow'>
    <div className={`${iconChange ? 'card card-header acc-header border-0 p-3':'card card-header border-0 p-3'}`} onClick={()=>setIconChange(!iconChange)} data-bs-toggle="collapse" href='#collapseGroup1' role="button" aria-expanded="false" aria-controls='collapseGroup1'>
    <div className={`${iconChange ? 'text-primary d-flex align-items-center justify-content-between' : 'text-black d-flex align-items-center justify-content-between'}`}>
    <span>Show Files</span>
    <ChevronDownIcon style={{ height: "20px", width: "20px", transform: iconChange ? 'rotateZ(-180deg)' : null }} />
  </div> 
    </div>
  <div className="collapse" id='collapseGroup1'>
    <div className='card card-body border-0'>
    <Form.Select className='rounded-3 p-2 col-lg-1' onChange={handleGroupChange} value={groupOption} style={{boxShadow: '0px 0px',borderColor:"lightgray"}}>
        <option value=''>Select a group</option>
        {groups.map((group, index) => (
          <option key={index} value={group.group}>
            {group.group}
          </option>
        ))}
      </Form.Select>
      <Form.Select className='rounded-3 p-2 col-lg-1 mt-3' onChange={handleUsecaseChange} value={usecaseOption} style={{boxShadow: '0px 0px',borderColor:"lightgray"}}>
        <option value=''>Select a usecase</option>
        {usecases.map((usecase, index) => (
          <option key={index} value={usecase.ucid}>
            {usecase.ucid} - {usecase.heading}
          </option>
        ))}
      </Form.Select>
      <button className='btn btn-light rounded-3 border mt-3 col-lg-1' onClick={handleGroupFiles}>Fetch Files</button>
    
      {selectedGroup && selectedUsecase && !msg && (
      <Accordion className="custom-accordion mt-3" style={{maxHeight: "110px", overflowY: "auto",overflowX:"hidden"}}>
      {files.map((file, index) => (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header className='text-break'>{file.file_name}</Accordion.Header>
        <Accordion.Body>
        File Size - {file.file_size} MB
        <button className="btn btn-sm btn-primary ms-2" onClick={() => window.open(`${'http://localhost:8000/'}${encodeURIComponent(file.file_url)}`, '_blank')}>
        Download
        </button>
        </Accordion.Body>
      </Accordion.Item>
      ))}
      </Accordion>
     )}
     {msg && <p className='mt-3 p-2 px-3 border rounded-3 bg-light'>No Files Found.</p>}
     </div>
    </div>
    </div>
  </section>
  );
}

export default GetFiles;