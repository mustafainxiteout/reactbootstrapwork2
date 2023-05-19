import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

function EditableCell({ value: initialValue, row: { index, original}, column: { id }, updateCell, selectedFlatRows, selectMultiple}) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEditing = () => {
      setIsEditing(!isEditing);
    };
  
    const onChange = (e) => {
      const updatedValue = e.target.value;
      setValue(updatedValue);
      updateCell(index, id, updatedValue);
    };
    
    
    const onBlur = () => {
      toggleEditing();
    };
  
    const handleClick = (e) => {
      e.stopPropagation(); // Stop the event propagation to the checkbox's click event
      toggleEditing();
    };
  
    const handlePropogationClick = (e) => {
      e.stopPropagation(); // Stop event propagation to prevent unselecting the row
    };
  
    const onSelectChange = (e) => {
      setValue(e.target.value);
      toggleEditing();
    };
  
    useEffect(() => {
      if (selectMultiple===true && selectedFlatRows.some((row) => row.original.t_id === original.t_id)) {
        setIsEditing(true);
      }
    }, [selectMultiple,selectedFlatRows, original.t_id]);
  
    return(
  <div onClick={handleClick}>
    {isEditing && id === 'addresstype' &&
            <Form.Select value={value} onChange={onSelectChange} onBlur={onBlur} onClick={handlePropogationClick}>
              <option value="Home">Home</option>
              <option value="Local">Local</option>
              <option value="Office">Office</option>
            </Form.Select>
    }
    {isEditing && id==='age' && 
            <Form.Control type="number" pattern="^\S*$" style={{ boxShadow: '0px 0px' }} value={value} onChange={onChange} onBlur={onBlur} onClick={handlePropogationClick}/>
    }
    {isEditing && id==='name' && 
            <Form.Control type="text" pattern="^\S*$" style={{ boxShadow: '0px 0px' }} value={value} onChange={onChange} onBlur={onBlur} onClick={handlePropogationClick}/>
      }
    {!isEditing && <div onClick={handleClick}>{value}</div>}
    </div>
    )
}

export default EditableCell;