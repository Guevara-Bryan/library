let mylibrary = {};

function Book(title, author, pages, isRead, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    // HTML version of the current book
    this.HTML_book = document.createElement("div");
    this.HTML_book.setAttribute("class", "book");
    let max_string_length = 15;
    let fixed_title = this.title.length > max_string_length ? this.title.substring(0, max_string_length) + "..." : this.title;
    let fixed_author = this.author.length > max_string_length ? this.author.substring(0, max_string_length) + "..." : this.author;
    this.HTML_book.innerHTML = `
    <div class="book-header">
        <h2>${fixed_title}</h2>
        <button id="remove-self" class="custom-button" value="${this.id}">X</button>
    </div>
    <div id="info">
        <h3>Author: ${fixed_author}</h3>
        <h3>Pages: ${this.pages}</h3>
        <div id="readnotread">
            <h3>Read:</h3>
            <button class="custom-checkbox" id="isread" value=${this.isRead}></button>
        </div> 
    </div>
    `;
    this.HTML_book.querySelector("#remove-self").addEventListener("click", function(){ removeBook(mylibrary, this.value); });

    let checkbox = this.HTML_book.querySelector("#isread");
    checkbox.addEventListener("click", function(){ toggleCustomCheckbox(this) });
    if(this.isRead === "1"){
        checkbox.classList.add("custom-checkbox-checked");
        checkbox.classList.remove("custom-checkbox");
    }
}

function addBook(library){
    const title = document.querySelector("#input-title");
    const author = document.querySelector("#input-author")
    const pages = document.querySelector("#input-pages")
    const read = document.querySelector("#input-read")
    let all_checks_pass = true;
    if(title.value.length === 0){
        title.classList.add("error");
        all_checks_pass = false;
        setTimeout(()=> title.style.transform = "scale(1)", 1000);
    }else {
        title.classList.remove("error");
    }
    if(author.value.length === 0){
        author.classList.add("error");
        all_checks_pass = false;
        setTimeout(()=> author.style.transform = "scale(1)", 1000);
    }else {
        author.classList.remove("error");
    }
    if(pages.value.length === 0){
        pages.classList.add("error");
        all_checks_pass = false;
        setTimeout(()=> pages.style.transform = "scale(1)", 1000);
    }else{
        pages.classList.remove("error");
    }

    


    if(!all_checks_pass) return;
    let bookDisplay = document.querySelector(".book-display");
    const id = Object.keys(library).length;
    library[id] = new Book(title.value, author.value, pages.value, read.value, id);
    bookDisplay.appendChild(library[id].HTML_book);
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

function removeBook(library, id){
    let bookDisplay = document.querySelector(".book-display");
    bookDisplay.removeChild(library[id].HTML_book);
    delete library[id];
}


function toggleCustomCheckbox(checkbox){
    if(checkbox.value === "1"){
        checkbox.value = "0";
        checkbox.classList.remove("custom-checkbox-checked");
        checkbox.classList.add("custom-checkbox");
    }else{
        checkbox.value = "1";
        checkbox.classList.remove("custom-checkbox");
        checkbox.classList.add("custom-checkbox-checked");
    }
}
//==================================================================================

let add_book_button = document.querySelector("#add-book");
add_book_button.addEventListener("click", ()=>{ addBook(mylibrary); });
let read_checkbox = document.querySelector("#input-read");
read_checkbox.addEventListener("click", function(){ toggleCustomCheckbox(this); });
