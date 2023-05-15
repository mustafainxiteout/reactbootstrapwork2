import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

function NewTable() {
    const initialData = [
        { id: 1, name: 'John Doe', age: 30, addressType: 'Local' },
        { id: 2, name: 'Jane Smith', age: 25, addressType: 'Home' },
        { id: 3, name: 'Bob Johnson', age: 35, addressType: 'Office' }
      ];
    
      const [data, setData] = useState(initialData);
      const [editingIds, setEditingIds] = useState([]);

      const handleEditClick = (id) => {
        if (!editingIds.includes(id)) {
          setEditingIds([...editingIds, id]);
        }
      };
    
      const handleCancelClick = (id) => {
        setEditingIds(editingIds.filter((editingId) => editingId !== id));
      };
    
      const handleUpdateClick = (id) => {
        // Perform update logic here for the specific record with the given id
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, isEditing: false } : item
        );
        setData(updatedData);
        setEditingIds(editingIds.filter((editingId) => editingId !== id));
      };
    
      //const handleCellClick = (id) => {
        //if (!editingIds.includes(id)) {
          //setEditingIds([...editingIds, id]);
        //}
      //};
    
      const handleInputChange = (e, id, field) => {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, [field]: e.target.value } : item
        );
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
          <tr key={item.id}>
          <td
            //onClick={() => handleCellClick(item.id)}
            //style={{ cursor: 'pointer' }}
          >
            {editingIds.includes(item.id) ? (
              <Form.Control
                type="text"
                value={item.name}
                onChange={(e) => handleInputChange(e, item.id, 'name')}
              />
            ) : (
              item.name
            )}
          </td>
          <td
            //onClick={() => handleCellClick(item.age)}
            //style={{ cursor: 'pointer' }}
          >
            {editingIds.includes(item.id) ? (
              <Form.Control
                type="number"
                value={item.age}
                onChange={(e) => handleInputChange(e, item.id, 'age')}
              />
            ) : (
              item.age
            )}
          </td>
          <td
            //onClick={() => handleCellClick(item.addressType)}
            //style={{ cursor: 'pointer' }}
          >
            {editingIds.includes(item.id) ? (
              <Form.Select
                value={item.addressType}
                onChange={(e) => handleInputChange(e, item.id, 'addressType')}
              >
                <option value="Local">Local</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </Form.Select>
            ) : (
              item.addressType
            )}
          </td>
          <td>
          {editingIds.includes(item.id) ? (
              <div className='d-flex gap-2'>
                <button className='btn btn-light py-1 border shadow-small' onClick={() => handleUpdateClick(item.id)}>
                  Update
                </button>
                <button className='btn btn-light py-1 border shadow-small' onClick={()=>handleCancelClick(item.id)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className='btn btn-light py-1 border shadow-small' onClick={()=>handleEditClick(item.id)}>
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