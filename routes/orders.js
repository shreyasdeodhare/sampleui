const express = require('express');
const { Order, User } = require('../models/models');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/checkout', async (req, res) => {
    const token = req.headers['authorization'];
    const { cart } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        const userId = decoded.userId;

        const total = cart.reduce((sum, item) => sum + item.price, 0);

        const order = await Order.create({
            total,
            products: cart,
            UserId: userId
        });

        res.json({ message: 'Checkout successful', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
