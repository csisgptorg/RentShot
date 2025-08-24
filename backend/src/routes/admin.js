const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Reservation = require('../models/Reservation');
const { requireAdmin } = require('../middleware/auth');
const { randomCode } = require('../utils/generateCode');

const router = express.Router();

// list pending users
router.get('/pending-users', requireAdmin, async (req, res) => {
  const users = await User.find({ status: 'pending' });
  res.json(users);
});

// approve user
router.post('/pending-users/:id/approve', requireAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  user.status = 'approved';
  user.myCode = randomCode();
  user.messages.push({ text: `${user.firstName} ثبت نام شما با موفقیت انجام شد.` });
  await user.save();
  res.json({ message: 'approved' });
});

// reject user
router.post('/pending-users/:id/reject', requireAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  user.status = 'rejected';
  await user.save();
  res.json({ message: 'rejected' });
});

// list approved users
router.get('/users', requireAdmin, async (req, res) => {
  const users = await User.find({ status: 'approved' });
  res.json(users);
});

// delete user
router.delete('/users/:id', requireAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

// product management
router.post('/products', requireAdmin, async (req, res) => {
  const { name, price, quantity, category, imageUrl } = req.body;
  const last = await Product.findOne().sort({ productId: -1 });
  const productId = last ? last.productId + 1 : 1;
  const product = await Product.create({ productId, name, price, quantity, category, imageUrl });
  res.json(product);
});

router.patch('/products/:id', requireAdmin, async (req, res) => {
  const { price, quantity } = req.body;
  const product = await Product.findOneAndUpdate({ productId: parseInt(req.params.id) }, { price, quantity }, { new: true });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.delete('/products/:id', requireAdmin, async (req, res) => {
  await Product.findOneAndDelete({ productId: parseInt(req.params.id) });
  res.json({ message: 'deleted' });
});

// reservations management
router.get('/reservations', requireAdmin, async (req, res) => {
  const reservations = await Reservation.find().populate('user', 'firstName lastName phone');
  res.json(reservations);
});

router.patch('/reservations/:code', requireAdmin, async (req, res) => {
  const { received, returned, paid, lateHours } = req.body;
  const reservation = await Reservation.findOne({ trackingCode: parseInt(req.params.code) });
  if (!reservation) return res.status(404).json({ error: 'Not found' });
  if (received !== undefined) reservation.received = received;
  if (returned !== undefined) {
    if (returned && !reservation.returned) {
      for (const item of reservation.items) {
        const product = await Product.findOne({ productId: item.productId });
        if (product) {
          product.quantity += item.count;
          await product.save();
        }
      }
    }
    reservation.returned = returned;
  }
  if (lateHours !== undefined) {
    reservation.lateHours = lateHours;
    reservation.finalPrice = reservation.totalPrice + reservation.totalPrice * 0.1 * lateHours;
  }
  if (paid !== undefined) reservation.paid = paid;
  await reservation.save();
  res.json(reservation);
});

// income
router.get('/income', requireAdmin, async (req, res) => {
  const reservations = await Reservation.find({ paid: true });
  const total = reservations.reduce((sum, r) => sum + (r.finalPrice || 0), 0);
  res.json({ total });
});

module.exports = router;
