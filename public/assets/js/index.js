

//define noteTitle, noteText, saveNote, newNote and noteString
let noteTitle; let noteText; let SaveNote;let newNoteBtn; let noteString;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  SaveNote = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteString = document.querySelectorAll('.list-container .list-group');}


  //show, hide, & get notes
const show = (elem) => {
  elem.style.display = 'inline';};

const hide = (elem) => {
  elem.style.display = 'none';};
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', 
  {  method: 'GET',
    headers:
     {  'Content-Type': 'application/json', },});

const saveNote = (note) =>
  fetch('/api/notes',
   {  method: 'POST', headers: 
    {  'Content-Type': 'application/json',},
    body: JSON.stringify(note),  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',},});

const renderActiveNote = () => {
  
    hide(SaveNote);

  if (activeNote.id) 
  {  noteTitle.setAttribute('readonly', true); noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;    noteText.value = activeNote.text;} 
  
  
    else {
 noteTitle.removeAttribute('readonly');    noteText.removeAttribute('readonly');
    noteTitle.value = '';    noteText.value = '';}};

const handleNoteSave = () => {
    const newNote = {    title: noteTitle. value,text: noteText. value,  };
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
//gets notes contents


const rendernoteString = async (notes) => {
  let jsonNotes = await notes.json();
  console.log("in rendernoteString", jsonNotes);
  console.group("window.location.pathname", window.location.pathname);
  console.log("jsonNotes.length", jsonNotes.length)
  if (window.location.pathname === '/notes') {
    noteString.forEach((el) => (el.innerHTML = ''));  }

  let noteStringItems = [];
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);
    liEl.append(spanEl);

    if (delBtn) 
    {  const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',        'fa-trash-alt',        'float-right', 'text-danger',       'delete-note' );

        delBtnEl.addEventListener('click', handleNoteDelete);
      liEl.append(delBtnEl);}
    return liEl;};

  if (jsonNotes.length === 0) {
    noteStringItems.push(createLi('No saved Notes', false));}

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note); noteStringItems.push(li);});

  if (window.location.pathname === '/notes') {
    noteStringItems.forEach((note) => noteString[0].append(note));}};


const getAndRenderNotes = () => getNotes().then(rendernoteString);
if ( window .location .pathname === '/notes') 
{  SaveNote.addEventListener('click', handleNoteSave);  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);  noteText.addEventListener('keyup', handleRenderSaveBtn);}


  //render notes
getAndRenderNotes();