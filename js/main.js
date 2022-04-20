/* global data */
/* exported data */

const urlInput = document.querySelector('#url');
const imagePreview = document.querySelector('.placeholder-image');

urlInput.addEventListener('input', function (event) {
  const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlInput.value);
  if (isImage) {
    imagePreview.src = urlInput.value;
  } else {
    imagePreview.src = 'images/placeholder-image-square.jpg';
  }
});

const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const notesInput = document.querySelector('textarea');

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
  titleInput.value = '';
  urlInput.value = '';
  notesInput.value = '';
});
