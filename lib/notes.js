const fs = require('fs');
const path = require('path');
//nanoid is a third party package to generate unique string IDs
//https://www.npmjs.com/package/nanoid 
const { nanoid } = require('nanoid'); 




//delete note function, search id to connect to html
function deleteNote(searchId, notesArray){
  
  //searches for notes id via search id within the index
  const index = (notesArray.findIndex(note => note.id === searchId));
   //defines delete  note variable, insert spolice to delete
  const deletedNote = notesArray.splice(index, 1);
  //and rewrite database
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
// returns the deleted note
  console.log ({results})
  return deletedNote;
}


// makes sure the note.title and .body are both strings

//validate note function
validateNote = (note => {
  //takes argument and validates it by these rules
  if (!note.title || typeof note.title !== 'string') return false;
  else if (!note.text || typeof note.text !== 'string') return false;
  else return true;
});



// filter by query
function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;

  // searches the notesArray for a matching title
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  }
  //returns filtered results
  return filteredResults;
}



//create new note function
function createNewNote(body, notesArray) {
  const note = body;
  
// creates a note, calls nanoid to add unique identifier
  if (!note.id) note.id = nanoid();

// pushes the note onto notes array in memory & writes
  notesArray.push(note);
  fs.writeFileSync(
    // notes array to the database
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return note;
}

//exports modules
module.exports = {
  createNewNote,
  deleteNote,
  filterByQuery,
  validateNote,
};