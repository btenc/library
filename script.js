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

const libraryContainer = document.querySelector('#libraryContainer');
const formContainer = document.querySelector('#formContainer');
const form = document.querySelector('#addBookForm');
const libraryContent = document.querySelector("#libraryContent");

let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#pages");
let read = document.querySelector('input[name="read"]:checked')

const submitButton = document.querySelector("#submitButton");
const resetButton = document.querySelector("#resetButton");
const toggleButtons = document.querySelectorAll(".toggleButtons");
//TODO read T/F NOT WORKING
//consolidate button listeners
submitButton.addEventListener('click', ()=>{
    addBook();
});

toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        toggleHidden();
        resetForm();
        validateForm();
    });
});

resetButton.addEventListener('click', ()=>{
    resetForm();
    validateForm();
});

titleInput.addEventListener('keyup', ()=>{
    validateForm();
});
authorInput.addEventListener('keyup', ()=>{
    validateForm();
});
pagesInput.addEventListener('keyup', ()=>{
    validateForm();
});

function validateForm(){
    if(titleInput.checkValidity() == true && authorInput.checkValidity() == true && pagesInput.checkValidity() == true){
        submitButton.disabled = false;
    }  
    else if(titleInput.checkValidity() == false || authorInput.checkValidity() == false || pagesInput.checkValidity() == false){
        submitButton.disabled = true;
    }
}

function getReadInput(){
    if(read.value == 'Yes'){
        return true;
    }
    else{
        return false;
    }
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(){
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = getReadInput();

    let newBook = new Book(title,author,pages,read);
    library.push(newBook);
    console.log(newBook);
    updateDisplay();
}

function updateDisplay(){
    libraryContent.innerHTML = "";
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

function resetForm(){
    form.reset();
}

updateDisplay();