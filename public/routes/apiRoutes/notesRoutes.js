const router = require('express').Router();

const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json')


router.get('/notes', (req, res) => {
  let results = notes;
  console.log(`router.get /notes = ${results}`);
  // if (req.query) {
  // //   results = filterByQuery(req.query, results);
  // }
  res.json(results);
}); 

router.post('/notes', (req, res) => {
    if (!validateNote(req.body)) {
      res.status(400).send('This note is not properly formatted.');
    } else {
      console.log(`router.post: req.body is: ${req.body}
      notes is: ${notes} 
      typeof Notes ${typeof (notes)}
    `)
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
  });
  
  module.exports = router; 