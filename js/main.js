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
const entriesList = document.querySelector('ul');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const entryObject = {};
  entryObject.title = titleInput.value;
  entryObject.url = urlInput.value;
  entryObject.notes = notesInput.value;

  entryObject.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entryObject);

  imagePreview.src = 'images/placeholder-image-square.jpg';
  form.reset();

  entryFormView.className = 'hidden';
  entriesView.className = '';
  for (let i = 0; i < data.entries.length; i++) {
    const entry = createEntry(data.entries[i]);
    entriesList.appendChild(entry);
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

  const title = document.createElement('h2');
  title.textContent = entry.title;
  textColumn.appendChild(title);

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  textColumn.appendChild(notes);

  return entryLi;
}

for (let i = 0; i < data.entries.length; i++) {
  const entry = createEntry(data.entries[i]);
  window.addEventListener('DOMContentLoaded', event => {
    entriesList.appendChild(entry);
  });
}

entriesHeader.addEventListener('click', event => {
  entryFormView.className = 'hidden';
  entriesView.className = '';
});
