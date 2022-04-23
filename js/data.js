/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = window.localStorage.getItem('code-journal');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  window.localStorage.setItem('code-journal', dataJSON);
});
