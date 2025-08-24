const express = require('express');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');
const Product = require('../models/Product');

const router = express.Router();

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = payload.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/', auth, async (req, res) => {
  try {
    const { items, startDate, endDate } = req.body;
    const ids = items.map(i => i.productId);
    const products = await Product.find({ productId: { $in: ids } });
    const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)));
    let total = 0;
    const itemDocs = [];
    for (const item of items) {
      const product = products.find(p => p.productId === item.productId);
      if (!product || product.quantity < item.count) {
        return res.status(400).json({ error: 'Insufficient stock' });
      }
      product.quantity -= item.count;
      await product.save();
      total += product.price * item.count * days;
      itemDocs.push({ productId: product.productId, name: product.name, unitPrice: product.price, count: item.count });
    }
    const last = await Reservation.findOne().sort({ trackingCode: -1 });
    const trackingCode = last ? last.trackingCode + 1 : 100;
    await Reservation.create({
      trackingCode,
      user: req.userId,
      items: itemDocs,
      startDate,
      endDate,
      totalPrice: total,
      finalPrice: total
    });
    res.json({ trackingCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', auth, async (req, res) => {
  const reservations = await Reservation.find({ user: req.userId });
  res.json(reservations);
});

module.exports = router;
