const express = require('express');
const router = express.Router();
const users = [];

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/', (req, res) => {
    const newUser = { id: `${users.length + 1}`, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'No se encontró el usuario' });
    }
});

router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        Object.assign(user, req.body);
        res.json(user);
    } else {
        res.status(404).json({ error: 'No se encontró el usuario' });
    }
});

router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'Se eliminó el usuario' });
    } else {
        res.status(404).json({ error: 'No se encontró el usuario' });
    }
});

module.exports = router;
