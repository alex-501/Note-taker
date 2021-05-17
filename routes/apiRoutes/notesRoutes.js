const fs = require("fs");
const path = require("path");
const { nanoid } = require('nanoid');
const router = require('express').Router();
const {notes} = require('./../../db');


function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);}
    return filteredResults;}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id == id)[0];
    return result;}
function createNewNote(body, notesArray) {
    const note = body;
    note.id = nanoid();
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2) );

    return note;}

function writeOverNotes(notesArray) {
    fs.writeFileSync(
        path.join(__dirname, './../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2));};


function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') 
    {  return false;}
    return true;}


    
router.get('./notes', (req, res) => {
  let results = notes;
  if (req.query)  { results = filterByQuery(req.query, results);}
  res.json(results);});


router.get('./notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result)   {  res.json(result);}

  else {  res.status(404).send('The id does not exist in the notes');}});


router.post('/notes', (req, res) => {
if (!validateNote(req.body)) { res.status(400).send('Error400');}
 else 
 {   const note = createNewNote(req.body, notes);
    res.json(note); }});

router.delete('./notes/:id', (req, res) => {
    const result = notes;

    if (req.params.id) {
      for (i = 0; i < result.length; i++) {
      if (result[i].id == req.params.id) {
      result.splice(i, 1); } }  } 

    writeOverNotes(result);
    res.json(result);});

module.exports  = router;