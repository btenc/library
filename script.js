function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let library = [
  {
    title: "Temporary Book",
    author: "William TenCate",
    pages: "404",
    read: "Yes",
  }
];

const libraryContainer = document.querySelector("#libraryContainer");
const formContainer = document.querySelector("#formContainer");
const form = document.querySelector("#addBookForm");
const libraryContent = document.querySelector("#libraryContent");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
let read = document.querySelector('input[name="read"]:checked');

const submitButton = document.querySelector("#submitButton");
const resetButton = document.querySelector("#resetButton");
const toggleButtons = document.querySelectorAll(".toggleButtons");

submitButton.addEventListener("click", () => {
  addBook();
  toggleHidden();
  resetForm();
  validateForm();
});

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleHidden();
    resetForm();
    validateForm();
  });
});

resetButton.addEventListener("click", () => {
  resetForm();
  validateForm();
});

titleInput.addEventListener("keyup", () => {
  validateForm();
});
authorInput.addEventListener("keyup", () => {
  validateForm();
});

pagesInput.addEventListener("keyup", () => {
  validateForm();
});
pagesInput.addEventListener("change", () => {
  //have to add this listener for arrow buttons on number entry field.
  validateForm();
});

function validateForm() {
  if (
    titleInput.checkValidity() == true &&
    authorInput.checkValidity() == true &&
    pagesInput.checkValidity() == true
  ) {
    submitButton.disabled = false;
  } else if (
    titleInput.checkValidity() == false ||
    authorInput.checkValidity() == false ||
    pagesInput.checkValidity() == false
  ) {
    submitButton.disabled = true;
  }
}

function getReadInput() {
  read = document.querySelector('input[name="read"]:checked');
  if (read.value == "Yes") {
    return "Yes";
  } else {
    return "No";
  }
}

function addBook() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = getReadInput();

  let newBook = new Book(title, author, pages, read);
  library.push(newBook);
  updateDisplay();
}

function updateDisplay() {
  libraryContent.innerHTML = "";
  library.forEach(function (item, index) {
    let newRow = document.createElement("tr");

    let title = document.createElement("th");
    title.textContent = item.title;
    let author = document.createElement("td");
    author.textContent = item.author;
    let pages = document.createElement("td");
    pages.textContent = item.pages;
    
    newRow.appendChild(title);
    newRow.appendChild(author);
    newRow.appendChild(pages);
 
    newRow.appendChild(createToggleCell(index));
    newRow.appendChild(createRemoveCell(index));

    libraryContent.appendChild(newRow);
  });
}

function createRemoveCell(index) {
  let rmButtonRow = document.createElement("td");

  let rmButton = document.createElement("button");
  rmButton.classList.add("button", "remove-button");
  rmButton.textContent = "Remove";
  rmButton.addEventListener("click", () => {
    library.splice(index, 1);
    updateDisplay();
  });

  rmButtonRow.appendChild(rmButton);
  return rmButtonRow;
}

function createToggleCell(index) {
  let toggleButtonRow = document.createElement("td");

  let toggleButton = document.createElement("button");
  toggleButton.classList.add("button", "toggle-button");
  toggleButton.textContent = library[index].read;
  toggleButton.addEventListener("click", () => {
    if (library[index].read == "Yes") {
      library[index].read = "No";
      toggleButton.textContent = "No";
    } else {
      library[index].read = "Yes";
      toggleButton.textContent = "Yes";
    }
    updateDisplay();
  });

  toggleButtonRow.appendChild(toggleButton);
  return toggleButtonRow;
}

function toggleHidden() {
  libraryContainer.classList.toggle("hidden");
  formContainer.classList.toggle("hidden");
}

function resetForm() {
  form.reset();
}

updateDisplay();
