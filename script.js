const libraryContainer = document.getElementById('library');
const bookFormContainer = document.getElementById('bookFormContainer');
const bookForm = document.getElementById('bookForm');
const newBookBtn = document.getElementById('newBookBtn');

let myLibrary = JSON.parse(localStorage.getItem('library')) || [];


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


function addBookToLibrary(book) {
  myLibrary.push(book);
  saveAndRender();
}


function saveAndRender() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
  renderLibrary();
}


function renderLibrary() {
  libraryContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('bookCard');
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong></p>
      <button class="${book.read ? 'read-toggle' : 'not-read'}" data-index="${index}">
        ${book.read ? 'Read' : 'Not Read'}
      </button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    libraryContainer.appendChild(card);
  });
}


libraryContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('read-toggle') || e.target.classList.contains('not-read')) {
    const index = e.target.dataset.index;
    myLibrary[index].read = !myLibrary[index].read;
    saveAndRender();
  }

  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    myLibrary.splice(index, 1);
    saveAndRender();
  }
});


newBookBtn.addEventListener('click', () => {
  bookFormContainer.classList.toggle('hidden');
});


bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  if (title && author && pages) {
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    bookForm.reset();
    bookFormContainer.classList.add('hidden');
  }
});


renderLibrary();
