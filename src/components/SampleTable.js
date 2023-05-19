import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';
import axios from 'axios';
import { Form, Pagination, Table } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {ArrowDownIcon } from '@heroicons/react/24/outline';
import EditableCell from './EditableCell';

function SampleTable() {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [selectMultiple,setSelectMultiple]=useState(false);


  const handlesaveChanges = async (row) => {
    try {
      const API_URL = `/newtableapi/${row.t_id}`;
      const response = await axios.put(API_URL, row);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handledeleteChanges = async (row) => {
    try {
      const API_URL = `/newtableapi/${row.t_id}`;
      const response = await axios.delete(API_URL);
      fetchData();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name', Cell: (props) => <EditableCell {...props} selectMultiple={selectMultiple} />},
      { Header: 'Age', accessor: 'age', Cell: (props) => <EditableCell {...props} selectMultiple={selectMultiple} /> },
      { Header: 'Address Type', accessor: 'addresstype', Cell: (props) => <EditableCell {...props} selectMultiple={selectMultiple} /> },
      {
        Header: 'Actions',
        accessor: 't_id',
        Cell: ({ row }) => (
          <div className='d-flex gap-2'>
          <button className="btn btn-light py-1 border shadow-small" onClick={() => handlesaveChanges(row.original)}>
            <small>Save</small>
          </button>
          <button className="btn btn-light py-1 border shadow-small" onClick={() => handledeleteChanges(row.original)}>
            <small>Delete</small>
          </button>
          </div>
        ),
      },
    ],
    [selectMultiple]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    prepareRow,
    selectedFlatRows,
    state: { pageIndex, pageSize },
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetSelectedRows: false,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 5,
          width: 5,
          maxWidth: 5,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()}/>
          ),
          Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Form.Check type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('/newtableapi');
      setData(response.data);
      setTotalPage(Math.ceil(response.data.length / pageSize));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('/newtableapi');
        setData(response.data);
        setTotalPage(Math.ceil(response.data.length / pageSize));
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialData();
  }, [pageSize]);

  const handlePageChange = (e) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    setTotalPage(Math.ceil(data.length / newPageSize));
    gotoPage(0); // Reset to the first page when changing the page size
  };
  
  const updateCell = (rowIndex, columnId, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnId] = value;
    setData(updatedData);
    // Return any necessary values or perform additional operations
  };
  

  const saveChanges = async () => {
    try {
      for (const row of selectedFlatRows) {
        const API_URL = `/newtableapi/${row.original.t_id}`;
        const response = await axios.put(API_URL, row.original);
        console.log(response.data);
      }
      console.log('Data updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChanges = async () => {
    try {
      for (const row of selectedFlatRows) {
        const API_URL = `/newtableapi/${row.original.t_id}`;
        const response = await axios.delete(API_URL);
        fetchData();
        console.log(response.data);
      }
      console.log('Data updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const csvData = selectedFlatRows.length > 0
  ? selectedFlatRows.map((row) => ({
      ID: row.original.t_id,
      Name: row.original.name,
      Age: row.original.age,
      'Address Type': row.original.addresstype,
    }))
  : data.map((record) => ({
      ID: record.t_id,
      Name: record.name,
      Age: record.age,
      'Address Type': record.addresstype,
    }));

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(13);

    const tableData = selectedFlatRows.length > 0
  ? selectedFlatRows.map((row) => [
      row.original.t_id.toString(),
      row.original.name,
      row.original.age.toString(),
      row.original.addresstype,
    ])
  : data.map((record) => [
      record.t_id.toString(),
      record.name,
      record.age.toString(),
      record.addresstype,
    ]);

    doc.autoTable({
      head: [['ID', 'Name', 'Age', 'Address Type']],
      body: tableData,
    });

    doc.save('data.pdf');
  };

  const [newData, setNewData] = useState({ name: '', age: '', addresstype: '' });

  const addNewData = () => {
    const postData = {
      name: newData.name,
      age: newData.age,
      addresstype: newData.addresstype
    };
  
    axios.post('/newtableapi', postData)
      .then(response => {
        setNewData({ name: '', age: '', addresstype: '' });
        fetchData(); // Optional: Update the data by making another GET request
      })
      .catch(error => {
        console.error('Error adding new data:', error);
      });
  };

  const handlemultipleselectchange=()=>{
    setSelectMultiple(true);
  }

    // Modify the pagination section
    const renderPagination = () => {
      const pageCount = Math.ceil(data.length / pageSize);
      const pageNumbers = [];
  
      for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(i);
      }
  
      return (
        <Pagination className="m-2 mt-0">
          <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
          <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber === 0 || pageNumber === pageCount - 1 || Math.abs(pageNumber - pageIndex) <= 1) {
              return (
                <Pagination.Item
                  key={index}
                  active={pageIndex === pageNumber}
                  onClick={() => {
                    gotoPage(pageNumber);
                  }}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              );
            } else if (pageNumber === 1 || pageNumber === pageCount - 2) {
              return <Pagination.Ellipsis key={index} />;
            }
            return null;
          })}
          <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
          <Pagination.Last onClick={() => gotoPage(totalPage - 1)} disabled={!canNextPage} />
        </Pagination>
      );
    };

  return (
    <div className="m-3 rounded-3 border bg-white shadow overflow-auto custom-scroll" style={{maxHeight:"85vh"}}>
      <div className="d-flex gap-2 justify-content-end p-1">
        {!selectMultiple &&
        <button className="btn btn-light my-2 border text-nowrap" onClick={handlemultipleselectchange}>
          <small className='d-none d-lg-inline'>Edit Multiple</small>
          <small className='d-inline d-lg-none'>Edit</small>
        </button>
        }
        {selectMultiple &&
        <button className="btn btn-light my-2 border text-nowrap" onClick={saveChanges}>
          <small className='d-none d-lg-inline'>Update Selected</small>
          <small className='d-inline d-lg-none'>Update</small>
        </button>
        }
        <button className="btn btn-light my-2 border text-nowrap" onClick={deleteChanges}>
          <small className='d-none d-lg-inline'>Delete Selected</small>
          <small className='d-inline d-lg-none'>Delete</small>
        </button>
        <CSVLink className="btn btn-light my-2 border text-nowrap" data={csvData} filename="data.csv">
          <small className='d-none d-lg-inline'>Export to CSV</small>
          <small className='d-inline d-lg-none'>CSV</small>
        </CSVLink>
        <button className="btn btn-light my-2 me-2 border text-nowrap" onClick={exportToPDF}>
          <small className='d-none d-lg-inline'>Export to PDF</small>
          <small className='d-inline d-lg-none'>PDF</small>
        </button>
      </div>
      <div className="d-flex gap-2 p-2 py-2 border-top">
        <Form.Control type="text" pattern="^\S*$" style={{ boxShadow: '0px 0px' }} placeholder="Name" value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} />
        <Form.Control type="number" pattern="^\S*$" style={{ boxShadow: '0px 0px' }} placeholder="Age" value={newData.age} onChange={(e) => setNewData({ ...newData, age: e.target.value })} />
        <Form.Select style={{ boxShadow: '0px 0px' }} value={newData.addresstype} onChange={(e) => setNewData({ ...newData, addresstype: e.target.value })}>
            <option value="">Choose Address Type</option>
            <option value="Home">Home</option>
            <option value="Local">Local</option>
            <option value="Office">Office</option>
          </Form.Select>
        <button className="btn btn-light text-nowrap border" onClick={addNewData}>
          <small>Add New</small>
        </button>
      </div>
      <Table {...getTableProps()} bordered responsive hover className='table-scroll mb-2'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                   <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownIcon className='text-black' style={{height:"16px",width:"16px", marginRight: "8px",transform: 'rotateZ(-180deg)'}}/>
                      ) : (
                        <ArrowDownIcon className='text-black' style={{height:"16px",width:"16px", marginRight: "8px"}}/>
                      )
                    ) : (
                      ''
                    )}
                  </span>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className='p-2 w-25' key={cell.row.index} {...cell.getCellProps()}>
                      {cell.render('Cell', { updateCell })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className='d-md-flex justify-content-end'>
      <div className='p-2 pt-0 p-md-0'>
          <label className="me-2 d-none d-md-inline">Rows per page:</label>
          <select className="p-md-2 px-0 btn border rounded small-shadow" value={pageSize} onChange={handlePageChange}>
            {[10,20,50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {renderPagination()}
        </div>
    </div>
  );
}

export default SampleTable;