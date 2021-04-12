const fs = require('fs');
const path = require('path');

validateNote = (note => {
    if (!note.title || typeof note.title !== 'string') return false;
    else if (!note.text || typeof note.text !== 'string') return false;
    else return true;
  });
  

function createNewNote(body, notesArray) {
  const note = body;
  console.log(`note: ${note} 
  is type ${typeof (note)}
  notesArray: ${notesArray} 
  is type ${typeof (notesArray)}
  `)
  // notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notesArray }, null, 2)
  );
  return note;
}



module.exports = {
  validateNote,
  createNewNote,

};
  
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  res.sendFile(path.join(__dirname, './public/index.html'));//works with or without the ./public/??
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

