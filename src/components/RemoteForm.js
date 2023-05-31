import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function RemoteForm() {
  const [remoteVal, setRemoteVal] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/remotemode'); // Replace with the actual endpoint URL
      setData(response.data);
      if (response.data.length === 1 && response.data[0].keycode === 'REMOTE' && response.data[0].pkey === 'REMOTE' && response.data[0].status) {
        setRemoteVal(response.data[0].remote_val);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSave = async () => {
    // Check conditions before updating remote_val
    if (data.length === 1 && data[0].keycode === 'REMOTE' && data[0].pkey === 'REMOTE' && data[0].status) {
      // Update remote_val based on selected radio button
      const updatedData = {
        remote_val: remoteVal
      };
      try {
        const response = await axios.put('/remotemode', updatedData); // Replace with the actual endpoint URL
        console.log('Updated Document:', response.data);
        // Handle success or update UI accordingly
      } catch (error) {
        console.log('Error:', error);
        // Handle error or update UI accordingly
      }
    }
  };

  return (
    <Form className='m-3 col-md-8 col-lg-7 col-xl-5 p-4 rounded-4 bg-white border'>
      <Form.Group>
        <Form.Label className='fw-bold'>Update Remote Mode:</Form.Label>
        <div className='d-flex flex-column flex-md-row gap-2 gap-md-4 mt-2 mt-md-3 mb-md-4 ms-3 mb-3'>
          <Form.Check
            type="radio"
            label="Dummy Data"
            name="remoteValue"
            checked={remoteVal === 1}
            onChange={() => setRemoteVal(1)}
          />
          <Form.Check
            type="radio"
            label="API or Dummy Data"
            name="remoteValue"
            checked={remoteVal === 2}
            onChange={() => setRemoteVal(2)}
          />
          <Form.Check
            type="radio"
            label="Live API"
            name="remoteValue"
            checked={remoteVal === 3}
            onChange={() => setRemoteVal(3)}
          />
        </div>
      </Form.Group>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-light border px-4' onClick={handleSave}>
          Save
        </button>
      </div>
    </Form>
  );
}

export default RemoteForm;