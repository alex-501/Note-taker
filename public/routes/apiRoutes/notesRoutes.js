const router = require('express').Router();
const filterByQuery = require('../../lib/notes');

const [notes] = require('../../db/db')

router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
}); 