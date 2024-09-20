const express = require('express');
const router = express.Router();
const orders = [];
const users = [];
const products = [];

router.get('/', (req, res) => {
    res.json(orders);
});

router.post('/', (req, res) => {
    const { userId, productId, quantity, status } = req.body;
    const user = users.find(u => u.id === userId);
    const product = products.find(p => p.id === productId);

    if (user && product) {
        const newOrder = {
        id: `${orders.length + 1}`,
        userId,
        productId,
        quantity,
        status,
    };
        orders.push(newOrder);
        res.status(201).json(newOrder);
    } else {
        res.status(400).json({ error: 'El usuario o producto que busca no es valido' });
    }
});

router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: 'No se encontró el pedido' });
    }
});

module.exports = router;
