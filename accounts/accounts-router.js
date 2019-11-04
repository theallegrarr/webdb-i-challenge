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

      res.status(200).json(result);
  } catch(err) {
      res.status(500).json({ message: `error fetching accounts`});
  }
})

router.post('/', async (req, res) => {
  try {
      const result = await db('accounts').insert({ name: req.body.name, budget: req.body.budget });

      res.status(200).json(result);
  } catch(err) {
      res.status(500).json({ message: `error fetching accounts`});
  }
})

module.exports = router;