const express = require('express');
const router = express.Router();
const products = [];

router.get('/', (req, res) => {
    res.json(products);
});

router.post('/', (req, res) => {
    const newProduct = { id: `${products.length + 1}`, ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'No se encontró el producto' });
    }
});

router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        Object.assign(product, req.body);
        res.json(product);
    } else {
        res.status(404).json({ error: 'No se encontró el producto' });
    }
});

router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Se eliminó el producto' });
    } else {
        res.status(404).json({ error: 'No se encontró el producto' });
    }
});

module.exports = router;
