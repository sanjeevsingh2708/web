const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentRegistrationNumber: String,
  studentId: String,
  studentName: String,
  fatherGurdianName: STring,
  class: String,
  emergencyContact: Number,
  studentProfileImageUrl: Strin,
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
