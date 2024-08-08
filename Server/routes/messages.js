const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET route
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route
router.post('/', async (req, res) => {
  const message = new Message({
    user: req.body.user,
    text: req.body.text,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
