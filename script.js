let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.toggleStatus = function(){
        if (this.read == "read"){
            this.read = "not read";
        }
        else{
            this.read = "read";
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("Life", "Yelarys", "202", "read")
addBookToLibrary("Washington", "DJ", "222", "not read")




const body = document.querySelector("body");
const booksContainer = document.createElement("div");
body.appendChild(booksContainer);
booksContainer.setAttribute("class", "books-container");

function displayBooks(){
    booksContainer.innerHTML = '';
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.setAttribute('data-id', book.id);

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

        if (book.read === 'read') {
            readElement.style.color = '#28a745'; // Green
        } else {
            readElement.style.color = '#dc3545'; // Red
        }

        card.appendChild(readElement);

        const delButton = document.createElement("button");
        delButton.textContent = "Remove Book";
        delButton.setAttribute('data-id', book.id);
        delButton.style.backgroundColor = '#dc3545';

        delButton.addEventListener("click", () => {
            const id_bookToDel = delButton.getAttribute("data-id");
            myLibrary = myLibrary.filter(book => book.id !== id_bookToDel);
            displayBooks();
        })

        card.appendChild(delButton);


        const statusBtn = document.createElement("button");
        statusBtn.setAttribute('data-id', book.id);
        statusBtn.textContent = "Change Status";
        statusBtn.style.marginLeft = "50px";
        statusBtn.style.backgroundColor = "lightblue";

        statusBtn.addEventListener('click', () => {
            const id_statusBtn = statusBtn.getAttribute("data-id");
            for (const book of myLibrary){
                if (book.id == id_statusBtn){
                    book.toggleStatus();
                }
            }
            displayBooks();
        });

        card.appendChild(statusBtn);
        
        booksContainer.appendChild(card);
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