function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return (`${title} by ${author}, ${pages} pages, ${read}`);
    }
}

const Library = [];

addBookToLibrary = (Book) => {
    Library.push(Book);
}

let title = author = pages = null;
const modal = document.querySelector("#bookModal");
// const title = modal.querySelector("#titleInput");

// Listen to form inputs
document.addEventListener("input", (event) => {

    if (event.target.matches('#titleInput')) {
        console.log("1st: ", event.target.value);
        title = event.target.value;
    }

    if (event.target.matches("#authorInput")) {
        console.log("2nd: ", event.target.value);
        author = event.target.value;
    }

    if (event.target.matches("#pagesInput")) {
        console.log("3rd: ", event.target.value);
        pages = event.target.value;
    }

});

// Update library display
displayLibrary = () => {

    let library = document.querySelector("#library");

    let column = document.createElement("div");
    column.className = "col-4 col-md-3 col-lg-2 align-items-stretch mb-5";
    // column.setAttribute("style", "max-width: 18rem;");
    // column.setAttribute("style", "height: 18rem;");


    let bookCard = document.createElement("div");
    bookCard.className = `card text-white bg-primary mb-5`;
    // bookCard.setAttribute("style", "width: 100%;");
    // bookCard.setAttribute("style", "height: 18rem;");
    bookCard.setAttribute("id", "bookCard");


    let bookTitle = document.createElement("h3");
    bookTitle.className = "card-header";
    bookTitle.setAttribute("style", "font-weight: bold;");
    bookTitle.setAttribute("style", "background-color: #2d4e69;");

    bookTitle.textContent = `${title}`;

    let bookBody = document.createElement("div");
    bookBody.className = "card-body";

    
    let bookAuthor = document.createElement("h5");
    bookAuthor.className = "card-title";
    bookAuthor.textContent = `by ${author}`;


    let bookPages = document.createElement("p");
    bookPages.textContent = `Pages: ${pages}`;

    let bookRead = document.createElement("p");
    bookRead.textContent = `${pages}`;



    // library.appendChild(bookCard);
    // bookCard.appendChild(bookTitle);
    // bookCard.appendChild(bookBody);
    // bookBody.appendChild(bookAuthor);
    // bookBody.appendChild(bookPages);
    library.appendChild(column);
    column.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookBody);
    bookBody.appendChild(bookAuthor);
    bookBody.appendChild(bookPages);  

}

// Trigger save book if you hit ENTER
modal.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        console.log("marika:");
        document.querySelector("#saveBtn").click();
    }
});

// Listen till book is saved
document.addEventListener("click", (event) => {

    if(event.target.matches("#saveBtn")) {
        console.log("ok, i l save ya");
        let book = new Book(title, author, pages, "already read");
        addBookToLibrary(book);
        displayLibrary();
        console.log(Library);


    }
});

// Autofocus to Modal
$('#bookModal').on('shown.bs.modal', function () {
    $('#titleInput').trigger('focus')
});

// Clear all fields after closing modal
$('#bookModal').on('hidden.bs.modal', function () {
    titleInput.value = authorInput.value = pagesInput.value = "";
    readCheck.checked = false;
});





const Sapiens = new Book("Sapiens", "altzazli", 330, "have already read");
const Fofonka = new Book("Fofonka", "Xavi", 120, "not read yet");
const XEsio = new Book("XEsio", "Marika", 70, "have already read");
addBookToLibrary(Sapiens);
addBookToLibrary(Fofonka);
addBookToLibrary(XEsio);

// console.log(Sapiens.info());

console.log(Library);