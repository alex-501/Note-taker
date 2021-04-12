const fs = require('fs');
const path = require('path');
//nanoid= third party package to generate unique IDs
const { nanoid } = require('nanoid'); 

/////////////////////////////////////////////
// FUNCTION deleteNote (body, notesArray)
// searches for note by ID in the notesArray
// removes it, and rewrites the db.
// returns the deleted note

function deleteNote(searchId, notesArray) {
  const index = (notesArray.findIndex(note => note.id === searchId));
  const deletedNote = notesArray.splice(index, 1);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  console.log ({results})
  return deletedNote;
}

/////////////////////////////////////////////
// FUNCTION validateNote (note)
// makes sure the note.title and .body are both strings
validateNote = (note => {
  if (!note.title || typeof note.title !== 'string') return false;
  else if (!note.text || typeof note.text !== 'string') return false;
  else return true;
});

/////////////////////////////////////////////
// FUNCTION filterByQuery(query, notesArray)
// searches the notesArray for a matching title
// there's no front-end provided for this, but 
// tested with .../api/notes?title=bob
function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  }
  return filteredResults;
}
/////////////////////////////////////////////
// FUNCTION createNewNote (body, notesArray)
// creates a note, calls nanoid to add unique identifier
// pushes the note onto notesArray in memory & writes
// notesArray to the database
function createNewNote(body, notesArray) {
  const note = body;
  if (!note.id) note.id = nanoid();
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return note;
}

module.exports = {
  createNewNote,
  deleteNote,
  filterByQuery,
  validateNote,
};