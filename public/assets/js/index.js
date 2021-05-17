let noteTitle; let noteText; let SaveNote;let newNoteBtn; let noteList;

if (window.location.pathname === './notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  SaveNote = document.querySelector('.save-note');
  noteList = document.querySelectorAll('.list-container .list-group');}

const show = (elem) => {
  elem.style.display = 'inline';};          
  
  const hide = (elem) => {
  elem.style.display = 'none';};
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes.html', 
  {  method: 'GET',
    headers:
     {  'Content-Type': 'application/json', },});

const saveNote = (note) =>
  fetch('./api/notes.html',
   {  method: 'POST', headers: 
    {  'Content-Type': 'application/json',},
    body: JSON.stringify(note),  });

const deleteNote = (id) =>
  fetch(`./api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',},});

const renderActiveNote = () =>
 {  if (activeNote.id) 
  {  noteTitle. setAttribute(' read only' , true); noteText. setAttribute('read only' , true );
    noteTitle.value = activeNote.title;    noteText.value = activeNote.text;} 
  
  
    else {noteTitle.removeAttribute('readonly');    noteText.removeAttribute('readonly');
    noteTitle.value = '';    noteText.value = '';}};

const handleNoteSave = () => 

{   const newNote = {    title: noteTitle. value,text: noteText. value,  };
  saveNote(newNote).then(() =>
   {  getAndRenderNotes(); renderActiveNote();});};

   const handleNoteDelete = (e) => { e.stopPropagation();
  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;




  if (activeNote.id === noteId) {    activeNote = {};}

  deleteNote(noteId).then(() => {
    getAndRenderNotes();  renderActiveNote();});};

const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();};
const handleNewNoteView = (e) => { activeNote = {};  renderActiveNote();};

const handleRenderSaveBtn = () => {
  if ( !noteTitle. value. trim() || !noteText.value.trim() || noteText.hasAttribute('readonly')) {hide(SaveNote); }
    
    
  else { show(SaveNote); }};


const getAndRenderNotes = () => getNotes().then(rendernoteList);
if ( window .location .pathname === './notes') 
{  SaveNote.addEventListener('click', handleNoteSave);  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);  noteText.addEventListener('keyup', handleRenderSaveBtn);}

getAndRenderNotes();