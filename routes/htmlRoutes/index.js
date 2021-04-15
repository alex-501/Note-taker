//routes

const path = require('path');
const router = require('express').Router();
//GET method requests

//Send method- for short strings
//requests data from index.html
router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
//request data from notes.html
router.get('/notes', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});
//requests data from index.html
router.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
//helps require statement acquire exported data and objects
module.exports = router;