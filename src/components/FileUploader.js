import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileUploader() {
  const [selectedOption, setSelectedOption] = useState('');
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };


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
    setSelectedOption('');
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
    if (files.length > 0 && selectedOption) {
      setIsLoading(true);
      setProgress(0);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('group', selectedOption);
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
    <section className='m-4'>
    <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label className='ms-1'>Company</Form.Label>
        <Form.Select className='rounded-3 p-3' value={selectedOption} onChange={handleSelectChange}  style={{boxShadow: '0px 0px',borderColor:"lightgray"}}>
          <option value="">Select Group</option>
          <option value="Inxiteout">Inxiteout</option>
          <option value="WHO">WHO</option>
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
            <p className='border py-3 mx-3 rounded-3 bg-light' key={file.path}>
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
           <Button className='my-3' onClick={handleFileUpload}>Upload Files</Button>
        )
    }
    </section>
  );
}

export default FileUploader;