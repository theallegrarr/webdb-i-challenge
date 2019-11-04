const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch(err) {
        res.status(500).json({ message: `error fetching accounts`});
    }
})

server.post('/api/accounts', async (req, res) => {
    try {
        const result = await db('accounts').insert({ name: req.body.name, budget: req.body.budget });

        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({ message: `error fetching accounts`});
    }
})

module.exports = server;