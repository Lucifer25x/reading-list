// Elements
const addBookButton = document.getElementById('add-book');
const editListButton = document.getElementById('edit-list');
const addBookForm = document.querySelector('.add-book');
const bookList = document.querySelector('.edit-list');
const closeFormButton = document.getElementById('close-form');
const closeList = document.getElementById('close-list');
const addNewBook = document.getElementById('add-new-book');
const bookTable = document.getElementById('book-table');
const editListTable = document.getElementById('edit-list-table');
const removeAllButton = document.getElementById('remove-all');

// Functions
function loadBookTable() {
    bookTable.innerHTML = '';
    const bookList = window.localStorage.getItem('bookList');
    const parsedData = JSON.parse(bookList) || [];

    parsedData.forEach(book => {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const authorTd = document.createElement('td');
        const pageTd = document.createElement('td');
        const statusTd = document.createElement('td');
        nameTd.innerText = book.name;
        authorTd.innerText = book.author;
        pageTd.innerText = book.page;
        statusTd.innerText = book.status;
        tr.appendChild(nameTd);
        tr.appendChild(authorTd);
        tr.appendChild(pageTd);
        tr.appendChild(statusTd);
        bookTable.appendChild(tr);
    })
}

function addBook({ name, author, page, status, id }) {
    const book = {
        id: id,
        name: name,
        author: author,
        page: page,
        status: status
    }

    const bookListData = window.localStorage.getItem('bookList');
    const parsedData = JSON.parse(bookListData) || [];
    parsedData.push(book);
    window.localStorage.setItem('bookList', JSON.stringify(parsedData));
    loadBookTable();
}

function removeBook(id) {
    const bookList = window.localStorage.getItem('bookList');
    const data = JSON.parse(bookList) || [];
    let newData = data.filter(book => book.id !== id);
    window.localStorage.setItem('bookList', JSON.stringify(newData));
    loadBookTable();
}

function loadEditList() {
    editListTable.innerHTML = '';
    const bookList = window.localStorage.getItem('bookList');
    const parsedData = JSON.parse(bookList) || [];

    parsedData.forEach(book => {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const statusTd = document.createElement('td');
        const select = document.createElement('select');
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        const option3 = document.createElement('option');
        option1.innerText = 'Finished';
        option1.value = 'Finished';
        option2.innerText = 'Reading';
        option2.value = 'Reading';
        option3.innerText = 'Not Started';
        option3.value = 'Not Started';
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        const btn = document.createElement('button');
        btn.innerText = 'Remove';
        nameTd.innerText = book.name;
        nameTd.contentEditable = true;
        nameTd.addEventListener('keyup', e => {
            const bookList = window.localStorage.getItem('bookList');
            const parsedData = JSON.parse(bookList) || [];
            parsedData.forEach(el => {
                if (el.id === book.id) {
                    el.name = e.target.innerText;
                };
            });
            window.localStorage.setItem('bookList', JSON.stringify(parsedData));
            loadBookTable();
        })
        select.value = book.status;
        statusTd.appendChild(select);
        tr.appendChild(nameTd);
        tr.appendChild(statusTd);
        tr.appendChild(btn);
        select.addEventListener('change', () => {
            updateStatus(book.id, select.value);
        });
        btn.addEventListener('click', () => {
            removeBook(book.id);
            loadEditList();
        })
        editListTable.appendChild(tr);
    })
}

function updateStatus(id, status) {
    const bookList = window.localStorage.getItem('bookList');
    const parsedData = JSON.parse(bookList) || [];
    parsedData.forEach(book => {
        if (book.id === id) {
            book.status = status;
        }
    })

    window.localStorage.setItem('bookList', JSON.stringify(parsedData));
    loadBookTable();
}

// Add book
addBookButton.addEventListener('click', () => {
    addBookForm.classList.remove('hide');
})
closeFormButton.addEventListener('click', () => {
    addBookForm.classList.add('hide');
})
addNewBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = addNewBook.querySelector('#name').value;
    const author = addNewBook.querySelector('#author').value;
    const page = addNewBook.querySelector('#page').value;
    const status = addNewBook.querySelector('#status').value;
    const id = Date.now();
    addBook({
        name: name, 
        author: author,
        page: page,
        status: status, 
        id: id
    });
    addBookForm.classList.add('hide');
})

// Edit List
editListButton.addEventListener('click', () => {
    bookList.classList.toggle('hide');
    loadEditList();
})
closeList.addEventListener('click', () => {
    bookList.classList.add('hide');
})

// Remove all
removeAllButton.addEventListener('click', () => {
    const bookList = window.localStorage.getItem('bookList');
    const parsedData = JSON.parse(bookList) || [];

    if (parsedData.length > 0) {
        let areYouSure = confirm('Are you sure to remove all books from the list?');
        if (areYouSure) {
            parsedData.forEach(book => {
                removeBook(book.id);
            });
            loadEditList();
            loadBookTable();
        }
    } else {
        alert('There is no book in the list');
    }
})

// Onload
window.addEventListener('load', () => {
    loadBookTable();
})
