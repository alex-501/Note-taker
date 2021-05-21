const express = require('express');
const { v1: uuidv1 } = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');const fs = require('fs');
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));}) ; app.get('/notes', (req, res) => {    res.sendFile(path.join(__dirname, './public/notes.html'));})
//.gET POST WRITE FILE DELETE READ
app.get('/api/notes', (req, res) => 
{    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw (err);
        let notes = JSON.parse(data);
        return res.json(notes);    })});
  
app.post('/api/notes', (req, res) => {
    let note = { ...req.body, id: uuidv1() };
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw (err);        let addNote = (JSON.parse(data)); addNote.push(note);

fs.writeFile('./db/db.json', JSON.stringify(addNote), (err) => {
            console.log( 'note  created') })});
    res.json(note);})

app .delete ('/api/notes/:id', (req, res) => {
    let deletedId = req.params.id

    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw (err);
        let pastNote = JSON.parse(data);
        let filteredNotes = pastNote.filter(eachNote => eachNote.id != deletedId);
        fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
            console.log(`Deleted ${deletedId} successfully`);})
        res.json(filteredNotes); })})

//LISTEN 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);});