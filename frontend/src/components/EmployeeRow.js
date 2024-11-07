import React from 'react';

function EmployeeRow({ employee, onDelete }) {
    return (
        <tr>
            <td>{employee._id}</td>
            <td><img src={employee.imgUpload} alt="Employee" width="50" height="50" /></td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.mobile}</td>
            <td>{employee.designation}</td>
            <td>{employee.gender}</td>
            <td>{employee.course.join(', ')}</td>
            <td>{new Date(employee.createDate).toLocaleDateString()}</td>
            <td>
                <button>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default EmployeeRow;
