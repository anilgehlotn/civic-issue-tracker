// Route for user registration
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Helper to generate employeeId in format DEPT-WARD-SEQ (e.g., HR-12-001)
async function generateEmployeeId(department, wardNumber) {
  // Count existing users in same department and ward to generate sequence
  const count = await User.countDocuments({ department: department.toUpperCase(), wardNumber });
  const seq = String(count + 1).padStart(3, '0');
  const deptCode = department.toUpperCase().replace(/\s+/g, '').slice(0, 3); // take up to 3 chars
  return `${deptCode}-${wardNumber}-${seq}`;
}

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { name, wardNumber, department, role, password } = req.body;

    // Basic validation
    if (!name || wardNumber == null || !department || !role || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Normalize department to uppercase string
    const deptNormalized = String(department).toUpperCase();

    // Generate employeeId
    const employeeId = await generateEmployeeId(deptNormalized, wardNumber);

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user document
    const user = new User({
      name,
      wardNumber,
      department: deptNormalized,
      role,
      employeeId,
      passwordHash
    });

    // Save to DB
    await user.save();

    // Return JSON with required fields (exclude password)
    return res.status(201).json({
      employeeId: user.employeeId,
      wardNumber: user.wardNumber,
      department: user.department,
      name: user.name,
      role: user.role
    });
  } catch (err) {
    console.error(err);
    // Duplicate employeeId (rare) or validation error
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate employeeId or unique field conflict' });
    }
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/all - fetch all users (for admin view)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}, '-passwordHash -__v').sort({ createdAt: 1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
