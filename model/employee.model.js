import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
    photo: {
        type: String, 
     
    },
    email: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    address: {
        type: String,

    },
    role: {
        type: String,

    },
    experience: {
        type: Number, 

    },
    online: {
        type: Boolean,
        default: false,
    },
    linkedInId: {
        type: String,

    },
    githubId: {
        type: String,

    },
});

const EmployeeData = mongoose.model('User', userSchema);

export default EmployeeData
