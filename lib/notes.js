const fs = require('fs');
const path = require('path');



// function findById(id, notesArray) {
//   const result = notesArray.filter(note => note.id === id)[0];
//   return result;
// }

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notesArray }, null, 2)
  );
  return note;
}



module.exports = {
  //findById,
  createNewNote,

};
  
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  res.sendFile(path.join(__dirname, './public/index.html'));//works with or without the ./public/??
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

