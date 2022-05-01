/* global data */
/* exported data */

const imagePreview = document.querySelector('.placeholder-image');
const titleInput = document.querySelector('#title');
const urlInput = document.querySelector('#url');
const notesInput = document.querySelector('textarea');

urlInput.addEventListener('input', function (event) {
  const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlInput.value);
  if (isImage) {
    imagePreview.src = urlInput.value;
  } else {
    imagePreview.src = 'images/placeholder-image-square.jpg';
  }
});

const form = document.querySelector('form');
const entriesHeader = document.querySelector('h3');
const entryFormView = document.querySelector('[data-view="entry-form"]');
const entriesView = document.querySelector('[data-view="entries"]');
const entriesContainer = document.querySelector('.entries-container');
const entriesList = document.querySelector('ul');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const entryObject = {};
  entryObject.title = titleInput.value;
  entryObject.url = urlInput.value;
  entryObject.notes = notesInput.value;

  entryObject.entryID = data.nextEntryId;
  data.entries.unshift(entryObject);

  imagePreview.src = 'images/placeholder-image-square.jpg';
  form.reset();

  entryFormView.className = 'hidden';
  entriesView.className = '';
  updateDataView('entries');

  const entry = createEntry(data.entries[0]);
  entry.setAttribute('data-entry-id', 1);

  for (let i = 0; i < entriesList.children.length; i++) {
    const currentEntry = entriesList.children[i];
    const newID = parseInt(currentEntry.getAttribute('data-entry-id')) + 1;
    currentEntry.setAttribute('data-entry-id', newID);
  }

  entriesList.prepend(entry);
  data.nextEntryId++;

  if (entriesContainer.lastElementChild.nodeName === 'P') {
    entriesContainer.lastElementChild.remove();
  }
});

function createEntry(entry) {
  const entryLi = document.createElement('li');

  const rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  entryLi.appendChild(rowDiv);

  const imageColumn = document.createElement('div');
  imageColumn.setAttribute('class', 'column-half');
  rowDiv.appendChild(imageColumn);

  const entryImage = document.createElement('img');
  entryImage.setAttribute('src', entry.url);
  entryImage.setAttribute('alt', entry.title);
  imageColumn.appendChild(entryImage);

  const textColumn = document.createElement('div');
  textColumn.setAttribute('class', 'column-half');
  rowDiv.appendChild(textColumn);

  const titleRow = document.createElement('div');
  titleRow.setAttribute('class', 'row entry-header');
  textColumn.appendChild(titleRow);

  const title = document.createElement('h2');
  title.textContent = entry.title;
  titleRow.appendChild(title);

  const editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-pen fa-2x');
  titleRow.appendChild(editIcon);

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  textColumn.appendChild(notes);

  return entryLi;
}

window.addEventListener('DOMContentLoaded', event => {
  if (data.entries.length === 0) {
    const noEntriesMessage = document.createElement('p');
    noEntriesMessage.className = 'no-entries-message';
    noEntriesMessage.textContent = 'No entries have been recorded.';
    entriesContainer.appendChild(noEntriesMessage);
  }

  for (let i = 0; i < data.entries.length; i++) {
    const entry = createEntry(data.entries[i]);
    entry.setAttribute('data-entry-id', i + 1);
    entriesList.appendChild(entry);
  }
  if (data.view === 'entries') {
    entryFormView.className = 'hidden';
    entriesView.className = '';
  } else if (data.view === 'entry-form') {
    entryFormView.className = '';
    entriesView.className = 'hidden';
  }
});

entriesHeader.addEventListener('click', event => {
  entryFormView.className = 'hidden';
  entriesView.className = '';
  updateDataView('entries');
});

const newButton = document.querySelector('a');
newButton.addEventListener('click', event => {
  updateDataView('entry-form');
});

function updateDataView(dataView) {
  data.view = dataView;
}

entriesList.addEventListener('click', event => {
  if (event.target.matches('i')) {
    const newEntry = document.querySelector('.new-entry-header');
    newEntry.textContent = 'Edit Entry';
    entryFormView.className = '';
    entriesView.className = 'hidden';
    updateDataView('entry-form');
  }
});
