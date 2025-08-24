const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { randomCode } = require('../utils/generateCode');

const router = express.Router();

// user registration
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, nationalId, phone, referrerCode, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      nationalId,
      phone,
      referrerCode,
      myCode: randomCode(),
      passwordHash,
      status: 'pending'
    });
    res.json({ message: 'Registered. Await approval.', id: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// user login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // nationalId or myCode
    const user = await User.findOne({ $or: [{ nationalId: identifier }, { myCode: identifier }] });
    if (!user || user.status !== 'approved') return res.status(401).json({ error: 'Unauthorized' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Unauthorized' });
    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET || 'secret');
    res.json({ token, user: { id: user._id, firstName: user.firstName, myCode: user.myCode } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Unauthorized' });
    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) return res.status(401).json({ error: 'Unauthorized' });
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'secret');
    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
