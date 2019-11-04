const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const accounts = await db('accounts');
      res.status(200).json(accounts);
  } catch(err) {
      res.status(500).json({ message: `error fetching accounts`});
  }
})

router.get('/:id', async (req, res) => {
  try {
      const result = await db('accounts').where({ id: req.params.id });

      res.status(200).json({message: `account ${result[0]} updated successfully`});
  } catch(err) {
      res.status(404).json({ message: `error fetching account by ID`});
  }
})

router.put('/:id', async (req, res) => {
  try {
      const result = await db('accounts').where({ id: req.params.id }).update(req.body);

      res.status(200).json(result);
  } catch(err) {
      res.status(400).json({ message: `error updating accounts`});
  }
})

router.post('/', async (req, res) => {
  try {
      const result = await db('accounts').insert({ name: req.body.name, budget: req.body.budget });

      res.status(200).json(result);
  } catch(err) {
      res.status(400).json({ message: `error creating account`});
  }
})

module.exports = router;