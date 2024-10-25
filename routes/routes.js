import express from 'express';
import { EmpData } from '../controller/employee.control.js';
import { EmployeeFetchData } from '../controller/employee.control.js';

const Emprouter = express.Router();

Emprouter.post('/employee',EmpData);
Emprouter.get('/employee-fetch',EmployeeFetchData);

export default Emprouter;