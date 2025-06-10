// Book Tracker logic: Add, Edit, Delete

let books = [];
let editIndex = null;

const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const statusInput = document.getElementById('status');

// Handle form submission (Add or Edit)
if (bookForm) {
    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const status = statusInput.value;

        if (!title || !author) return;

        if (editIndex !== null) {
            // Edit mode
            books[editIndex] = { title, author, status };
            editIndex = null;
            bookForm.querySelector('button[type="submit"]').textContent = "Add Book";
        } else {
            // Add mode
            books.push({ title, author, status });
        }

        bookForm.reset();
        renderBooks();
    });
}

// Render all books
function renderBooks() {
    if (!bookList) return;
    bookList.innerHTML = '';
    if (books.length === 0) {
        bookList.innerHTML = '<p style="text-align:center;color:#aaa;">No books added yet.</p>';
        return;
    }
    books.forEach((book, idx) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-header">
                <h3>${book.title}</h3>
            </div>
            <div class="book-body">
                <div class="book-meta"><i class="fas fa-user"></i> ${book.author}</div>
                <div class="book-status status-${book.status}">${capitalize(book.status)}</div>
            </div>
            <div class="book-actions">
                <button class="action-btn edit-btn" data-index="${idx}"><i class="fas fa-edit"></i> Edit</button>
                <button class="action-btn delete-btn" data-index="${idx}"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;
        bookList.appendChild(card);
    });

    // Attach event listeners for edit and delete
    const editBtns = bookList.querySelectorAll('.edit-btn');
    const deleteBtns = bookList.querySelectorAll('.delete-btn');

    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-index');
            startEditBook(idx);
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-index');
            deleteBook(idx);
        });
    });
}

function startEditBook(idx) {
    const book = books[idx];
    titleInput.value = book.title;
    authorInput.value = book.author;
    statusInput.value = book.status;
    editIndex = idx;
    bookForm.querySelector('button[type="submit"]').textContent = "Update Book";
    titleInput.focus();
}

function deleteBook(idx) {
    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(idx, 1);
        renderBooks();
        // If editing this book, reset form
        if (editIndex == idx) {
            bookForm.reset();
            editIndex = null;
            bookForm.querySelector('button[type="submit"]').textContent = "Add Book";
        }
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initial render
renderBooks();
