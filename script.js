const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("Chigga Life", "Yelarys", "202", "Not READ")
addBookToLibrary("LA Life", "DJ", "222", "READ")
addBookToLibrary("nUH UH Life", "Insane", "212", "Not READ")



const body = document.querySelector("body");
const booksContainer = document.createElement("div");
body.appendChild(booksContainer);
booksContainer.setAttribute("class", "books-container");

function displayBooks(){
    booksContainer.innerHTML = '';
    myLibrary.forEach(book => {
        const card = document.createElement("div");

        const titleElement = document.createElement('h2');
        titleElement.textContent = book.title;
        card.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;
        card.appendChild(authorElement);

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${book.pages}`;
        card.appendChild(pagesElement);

        const readElement = document.createElement('p');
        readElement.textContent = `Status: ${book.read}`;
        card.appendChild(readElement);

        if (booksContainer) {
            booksContainer.appendChild(card);
        } 
    })
}

displayBooks();


const myForm = document.querySelector('form');

myForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const statusInput = document.getElementById('status');

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const status = statusInput.value;

    addBookToLibrary(title, author, pages, status);

    displayBooks();

    myForm.reset();
});