const express = require('express');
const { Product } = require('../models/models');

const router = express.Router();

router.get('/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.findAll({ where: { category } });
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, price, category } = req.body;

    try {
        const product = await Product.create({ name, price, category });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
