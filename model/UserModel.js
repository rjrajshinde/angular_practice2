const mongoose =require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    designation: String,
    contact: String
})

module.exports = mongoose.model('employees',employeeSchema)