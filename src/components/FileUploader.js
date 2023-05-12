import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import GetFiles from './GetFiles';

function FileUploader() {
  const [groups, setGroups] = useState([]);
  const [usecases, setUsecases] = useState([]);
  const [groupOption, setGroupOption] = useState('');
  const [usecaseOption, setUsecaseOption]=useState('')
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    fetchGroups();
    fetchUsecases();
  }, []);


  const acceptedFileTypes = {
    'text/plain':['.txt'],
    'text/csv':['.csv'],
    'audio/wav':['.wav'],
    'audio/mpeg':['.mp3'],
    'application/vnd.ms-excel':['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':['.xlsx']
  };

  const maxFileSize = {
    '.txt': 10 * 1024 * 1024, // 10MB
    '.csv': 10 * 1024 * 1024, // 10MB
    '.xls': 10 * 1024 * 1024, // 10MB
    '.xlsx': 10 * 1024 * 1024, // 10MB
    '.mp3': 50 * 1024 * 1024, // 50MB
    '.wav': 50 * 1024 * 1024, // 50MB
  };

  function getFileExtension(filename) {
    return '.' + filename.split('.').pop().toLowerCase();
  }

  function handleFileChange(acceptedFiles) {
    const validatedFiles = acceptedFiles.filter(file => {
      const fileExtension = getFileExtension(file.name);
      const fileSize = file.size;

      if (!acceptedFileTypes[file.type]?.includes(fileExtension)) {
        alert('Invalid file type. Only text, mp3, wav, csv, and excel files are allowed.');
        return false;
      }

      if (fileSize > maxFileSize[fileExtension]) {
        alert(`File size exceeds the limit for ${fileExtension} files.`);
        return false;
      }

      return true;
    });

    setFiles(validatedFiles);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileTypes,
    maxSize: Math.max(...Object.values(maxFileSize)),
    onDrop: handleFileChange,
    multiple: false,
  });

  const emptyFilesState=()=>{
    setFiles([]);
    setGroupOption('');
    setUsecaseOption('');
  }

  const simulateUpload = () => {
    const interval = setInterval(() => {
      for (let i = progress; i <= 110; i += 10) {
        setTimeout(() => {
          const updatedProgress = i > 100 ? 100 : i;
          setProgress(updatedProgress);
          if (i === 110) {
            setIsLoading(false);
            setProgress(0);
            emptyFilesState();
            alert('Files Uploaded Successfully!');
          }
        }, 100 * (i - progress));
      }
      clearInterval(interval);
      // Handle the response from the upload if needed
    }, 100);
  }; 
  
  function convertBytesToMB(bytes) {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2);
  }  

  const handleFileUpload = () => {
    if (files.length > 0 && groupOption && usecaseOption) {
      setIsLoading(true);
      setProgress(0);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('group', groupOption);
      formData.append('ucid', usecaseOption)
      axios
        .post('/filesupload', formData)
        .then(response => {
          simulateUpload();
        })
        .catch(error => {
          // Handle the error
          console.log(error);
        });
    }
    else{
        alert('No Files/Options are Selected.');
    }
  };  

  return (
    <div className='m-4'>
    <section className='shadow p-4 rounded-3 bg-white border'>
    <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label className='ms-1'>Company</Form.Label>
    <Form.Select className='rounded-3 p-2' onChange={handleGroupChange} value={groupOption} style={{boxShadow: '0px 0px',borderColor:"lightgray"}}>
        <option value=''>Select a group</option>
        {groups.map((group, index) => (
          <option key={index} value={group.group}>
            {group.group}
          </option>
        ))}
      </Form.Select>
      </Form.Group>
      <Form.Group className='mt-3'>
      <Form.Label className='ms-1'>Usecase</Form.Label>
      <Form.Select className='rounded-3 p-2' onChange={handleUsecaseChange} value={usecaseOption} style={{boxShadow: '0px 0px',borderColor:"lightgray"}}>
        <option value=''>Select a usecase</option>
        {usecases.map((usecase, index) => (
          <option key={index} value={usecase.ucid}>
            {usecase.ucid} - {usecase.heading}
          </option>
        ))}
      </Form.Select>
      </Form.Group>
    <Form.Label className='ms-1 mt-4'>Upload File</Form.Label>
    <div className='w-100 text-center rounded-3 bg-white shadow-small' style={{borderStyle:"dashed",borderColor:"lightgray"}}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p className='p-5'>Drag and drop a file here or click to select a file</p>
      </div>
      <aside>
          {files.map(file => (
            <p className='border py-3 mx-3 px-2 rounded-3 bg-light text-break' key={file.path}>
              {file.path} - {convertBytesToMB(file.size)} MB
            </p>
          ))}
      </aside>
    </div>
    {isLoading ?
        (
          <div className='mt-3 ms-1'>
            <Spinner animation="border" size="sm" role="status" aria-hidden="true" className='me-2' />
            Uploading... {progress}%
          </div>
        ):(
           <button className='btn btn-light rounded-3 border mt-3' onClick={handleFileUpload}>Upload Files</button>
        )
    }
    </section>
    <GetFiles/>
    </div>
  );
}

export default FileUploader;