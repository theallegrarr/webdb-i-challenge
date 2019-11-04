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



module.exports = server;