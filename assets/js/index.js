//declare variables/constants 
let noteTitle;
let noteText;
let SaveNote;
let newNoteBtn;
let noteString;

//if property. location
if (window.location.pathname === '/notes') {
  //query selector returns first element within document which matches specified selectors
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  SaveNote = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteString = document.querySelectorAll('.list-container .list-group');
}

// defines show element & displays element 'inline'
const show = (elem) => {
  elem.style.display = 'inline';
};

// defines hide element-no style display
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
//fetch request/Get request
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
//fetch request / post request
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
//const which fetches and deletes note
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
//creates active note when hitting save button
const renderActiveNote = () => {
  hide(SaveNote);
//coditions - if else statement which sets or removes the readonly attribute
  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

//handlebars to create new note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  //Saves note then renders it(output to browser)
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Deletes clicked note
const handleNoteDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  //The JSON.parse() method parses a JSON string, constructing the value or object specified
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }
//delete note then show it in the browser
  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  //sets activeNote
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
 
// displays active notes 
  renderActiveNote();
};

// makes note blank so the user can enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};
//dipplays save button
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(SaveNote);
  } else {
    show(SaveNote);
  }
};

// displays a list of note titles
const rendernoteString = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteString.forEach((el) => (el.innerHTML = ''));
  }

  let noteStringItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);
//deletebutton 
    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);
// inserts Node objects or DOMString objects after the last child of the ParentNode (liEl)
      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteStringItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteStringItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteStringItems.forEach((note) => noteString[0].append(note));
  }
};

// Get notes from the database
const getAndRenderNotes = () => getNotes().then(rendernoteString);

if (window.location.pathname === '/notes') {
  SaveNote.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}
// and renders them to the sidebar
getAndRenderNotes();