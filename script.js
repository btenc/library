let library = [
    {
        title: "Temp Title",
        author: "Temp Author",
        pages: "100",
        read: false
    },
    {
        title: "Temp Title",
        author: "Temp Author",
        pages: "100",
        read: false
    },
    {
        title: "Temp Title",
        author: "Temp Author",
        pages: "100",
        read: false
    }
];

const libraryContainer = document.querySelector('.libraryContainer');
const formContainer = document.querySelector('.formContainer');
const libraryContent = document.querySelector("#libraryContent");
const titleInput = document.querySelector("#titleInput");

const toggleButtons = document.querySelectorAll(".toggleButtons");
toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        toggleHidden();
    });
});

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBook(){
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.value;

    let newBook = new Book(title,author,pages,read);
    library.push(newBook);
    updateDisplay();
}

function updateDisplay(){
    library.forEach(function(item){
        let newRow = document.createElement('tr');

        let title = document.createElement('th');
        title.textContent = item.title;
        let author = document.createElement('td');
        author.textContent = item.author;
        let pages = document.createElement('td');
        pages.textContent = item.pages;
        let read = document.createElement('td');
        read.textContent = item.read;

        newRow.appendChild(title);
        newRow.appendChild(author);
        newRow.appendChild(pages);
        newRow.appendChild(read);

        libraryContent.appendChild(newRow);
    });
}

function toggleHidden(){
    libraryContainer.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');
}

updateDisplay();