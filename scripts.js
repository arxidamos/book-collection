// Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return (`${title} by ${author}, ${pages} pages, ${read}`);
    }
}

// Initialize vars
let title = author = pages = null;
let read = null;
const modal = document.querySelector("#bookModal");

// Library object
const Library = [];
// List of displayed books
const alreadyShown = [];

// Add to library function
addBookToLibrary = (book) => {
    if (Library.includes(book)){
        confirm("Oops! This book is already in your library.");
    }
    else {
        Library.push(book);
    }
}

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

// Listen to read checkbox
const readCheck = document.querySelector("#readCheck");
readCheck.addEventListener("change", (event) => {
    console.log("Initially we ve got ", read);
    if (event.target.checked) {
        read = true;
    } else {
        read = false;
    }
    console.log("After change:", read);
});

// Validate that pages filed is a number
let pagesInput = document.querySelector("#pagesInput");
pagesInput.addEventListener('keyup', (event) => {
    if (event.which != 8 && event.which != 0 && event.which < 48 || event.which > 57) {
        this.value = this.value.replace(/\D/g, "");
    }
});

// Trigger save book if you hit ENTER
modal.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        console.log("marika:");
        document.querySelector("#saveBtn").click();
    }
});

// Save book
document.addEventListener("click", (event) => {

    if(event.target.matches("#saveBtn")) {
        console.log("ok, i l save ya");

        if (title == "" || author == "" || pages == "") {
        }
        
        let book = new Book(title, author, pages, read);
        addBookToLibrary(book);
        displayLibrary(Library);    

        console.log(Library);

    }
});

// Delete book
removeBook = (book, i) => {
    Library.splice(i, 1);
    // console.table(Library);
    alreadyShown.splice(i, 1);
    // console.table(alreadyShown);

    let library = document.querySelector("#library");
    let column = document.querySelector(`#column-${book.title}`);
    console.log(column);

    library.removeChild(column);

    displayLibrary(Library);

};

// Autofocus to Modal
$('#bookModal').on('shown.bs.modal', function () {
    $('#titleInput').trigger('focus')
});

// Clear all fields after closing modal
$('#bookModal').on('hidden.bs.modal', function () {
    titleInput.value = authorInput.value = pagesInput.value = "";
    readCheck.checked = false;
});

// Display book cards
displayLibrary = (collection) => {
    
    collection.forEach( (item) => {
        // Display every new item of the Library
        if (!alreadyShown.includes(item.title))  {
            let library = document.querySelector("#library");

            let column = document.createElement("div");
            column.className = "col-6 col-md-4 col-lg-3 align-items-stretch mb-5";
            column.setAttribute("id", `column-${item.title}`);
            library.appendChild(column);

            let bookCard = document.createElement("div");
            bookCard.className = `card text-white bg-primary mb-5`;
            bookCard.setAttribute("id", "bookCard");
            column.appendChild(bookCard);
            
            let cardHeader = document.createElement("div");
            cardHeader.className = "card-header container-fluid";
            cardHeader.setAttribute("style", "background-color: #2d4e69;");
            bookCard.appendChild(cardHeader);

            let headerRow = document.createElement("row");
            headerRow.className = `row`;
            cardHeader.appendChild(headerRow);

            let col1 = document.createElement("col");
            col1.className = `col-10`;
            headerRow.appendChild(col1);

            let bookTitle = document.createElement("h5");
            bookTitle.className = "bookTitle";
            bookTitle.setAttribute("style", "font-weight: bold;");
            bookTitle.textContent = `${item.title}`;
            col1.appendChild(bookTitle);

            let col2 = document.createElement("col");
            col2.className = `col-2`;
            headerRow.appendChild(col2);

            let closeBtn = document.createElement("button");
            closeBtn.className = "btn float-right";
            closeBtn.textContent = "x";
            closeBtn.type = "button";
            closeBtn.setAttribute("id", `${item.title}`);
            col2.appendChild(closeBtn);

            ////////////////////////////////////////////////////////////////
            let bookBody = document.createElement("div");
            bookBody.className = "card-body";
            bookCard.appendChild(bookBody);
        
            let bookAuthor = document.createElement("h5");
            bookAuthor.className = "card-title";
            bookAuthor.textContent = `by ${item.author}`;
            bookBody.appendChild(bookAuthor);
        
            let bookPages = document.createElement("p");
            bookPages.textContent = `Pages: ${item.pages}`;
            bookBody.appendChild(bookPages);

        
            let bookRead = document.createElement("button");
            if (item.read === true) {
                bookRead.textContent = `Read`;
            } else {
                bookRead.textContent = `Not read yet`;
            }
            bookRead.setAttribute("type", "button");
            bookRead.className = "btn  bookRead ";
            bookBody.appendChild(bookRead);

            alreadyShown.push(item.title);
        }
    });
};

const Sapiens = new Book("Sapiens", "altzazli", 330, true);
const Fofonka = new Book("Fofonka", "Xavi", 120, true);
const XEsio = new Book("XEsio", "Marika", 70, false);
addBookToLibrary(Sapiens);
addBookToLibrary(Fofonka);
addBookToLibrary(XEsio);

// console.table(Library);
displayLibrary(Library);

// X remove button
document.addEventListener("click", (event) => {
    for (let i=0; i<Library.length; i++) {
        if (event.target.id == `${Library[i].title}`) {
            console.log("x button event listener");
            removeBook(Library[i], i);
        }
    }
});