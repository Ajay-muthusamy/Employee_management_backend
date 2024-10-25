import EmployeeData from "../model/employee.model.js";


export const EmpData = async (req, res) => {
    const {
        name,
        photo,
        email,
        mobileNumber,
        address,
        role,
        experience,
        online,
        linkedInId,
        githubId
    } = req.body;

    if (!name || !photo || !email || !mobileNumber || !address || !role || !experience || !linkedInId || !githubId) {
        return res.status(400).json({
            message: "All fields are required",
            error: "Missing required fields"
        });
    }

    try {
        const employee = new EmployeeData({
            name,
            photo,
            email,
            mobileNumber,
            address,
            role,
            experience,
            online,
            linkedInId,
            githubId
        });

    
        await employee.save();

        res.status(201).json({
            message: "Employee data created successfully",
            employee
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating employee data",
            error: error.message
        });
    }
};


export const EmployeeFetchData = async (req, res) => {
    try {
      const employees = await EmployeeData.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee data', error: error.message });
    }
  };