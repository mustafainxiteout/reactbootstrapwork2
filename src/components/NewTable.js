import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';

function NewTable() {
    
      const [data, setData] = useState([]);
      const [editingIds, setEditingIds] = useState([]);
      const [editingCells, setEditingCells] = useState([]);

      const fetchTableDetails = () => {
          axios.get('/newtableapi') // Replace '/api/user' with the actual API endpoint for fetching user details
          .then(response => setData(response.data))
          .catch(error => console.log(error));
      };

      useEffect(() => {
        fetchTableDetails();
      },[])

      const handleEditCellClick = (id, field) => {
        if (!editingCells.find(cell => cell.id === id && cell.field === field)) {
          setEditingCells([...editingCells, { id, field }]);
        }
      };
    
      const handleCancelCellClick = (id, field) => {
        setEditingCells(editingCells.filter(cell => !(cell.id === id && cell.field === field)));
      };

      const handleUpdateCellClick = (id, field, value) => {
        const updatedItem = data.find(item => item.t_id === id);
        updatedItem[field] = value;
        axios.put(`/newtableapi/${id}`, updatedItem) // Replace '/newtableapi' with the actual API endpoint for updating table details
          .then(response => {
            fetchTableDetails();
            setEditingCells(editingCells.filter(cell => !(cell.id === id && cell.field === field)));
          })
          .catch(error => console.log(error));
      };    

      const handleEditClick = (id) => {
        if (!editingIds.includes(id)) {
          setEditingIds([...editingIds, id]);
        }
      };
    
      const handleCancelClick = (id) => {
          // Reset the data to the initial state
          fetchTableDetails();
          // Remove the id from the editingIds array
          setEditingIds(editingIds.filter((editingId) => editingId !== id));
      };  

      const handleUpdateClick = (id) => {
        const updatedItem = data.find(item => item.t_id === id);
        axios.put(`/newtableapi/${id}`, updatedItem)
          .then(response => {
            setEditingIds(editingIds.filter((editingId) => editingId !== id));
          })
          .catch(error => console.log(error));
      };
    
      const handleInputChange = (e, id, field) => {
        const updatedData = data.map(item =>
          item.t_id === id ? { ...item } : item
        );
        const updatedValue = e.target.value;
        updatedData.forEach(item => {
          if (item.t_id === id) {
            item[field] = updatedValue;
          }
        });
        setData(updatedData);
      };

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item) => (
          <tr key={item.t_id}>
          <td>
          {editingCells.find(cell => cell.id === item.t_id && cell.field === 'name') ? (
              <Form.Control
                type="text"
                value={item.name}
                onChange={(e) => handleInputChange(e, item.t_id, 'name')}
              />
            ) : (
              <p onClick={() => handleEditCellClick(item.t_id, 'name')}>{item.name}</p>
              )}
          </td>
          <td>
            {editingIds.includes(item.t_id) ? (
              <Form.Control
                type="number"
                value={item.age}
                onChange={(e) => handleInputChange(e, item.t_id, 'age')}
              />
            ) : (
                <p>{item.age}</p>
            )}
          </td>
          <td>
            {editingIds.includes(item.t_id) ? (
              <Form.Select
                value={item.addresstype}
                onChange={(e) => handleInputChange(e, item.t_id, 'addresstype')}
              >
                <option value="Local">Local</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </Form.Select>
            ) : (
                <p>{item.addresstype}</p>
            )}
          </td>
          <td>
          {editingIds.includes(item.t_id) ? (
              <div className='d-flex gap-2'>
                <button className='btn btn-light py-1 border shadow-small' onClick={() => handleUpdateClick(item.t_id)}>
                  Update
                </button>
                <button className='btn btn-light py-1 border shadow-small' onClick={()=>handleCancelClick(item.t_id)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className='btn btn-light py-1 border shadow-small' onClick={()=>handleEditClick(item.t_id)}>
                Edit
              </button>
            )}
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

export default NewTable;