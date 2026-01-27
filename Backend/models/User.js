// Mongoose schema and model for users
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wardNumber: { type: Number, required: true },
  department: { type: String, required: true },
  role: { type: String, enum: ['Staff', 'Admin'], required: true },
  employeeId: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
