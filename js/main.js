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
