
        // Sample book data
        const books = [
            {
                id: 1,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Fiction",
                status: "read",
                rating: 5,
                added: "2025-05-15"
            },
            {
                id: 2,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
                status: "read",
                rating: 4,
                added: "2025-04-22"
            },
            {
                id: 3,
                title: "1984",
                author: "George Orwell",
                genre: "Science Fiction",
                status: "unread",
                rating: null,
                added: "2025-06-01"
            },
            {
                id: 4,
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                status: "reading",
                rating: null,
                added: "2025-05-30"
            },
            {
                id: 5,
                title: "Pride and Prejudice",
                author: "Jane Austen",
                genre: "Fiction",
                status: "read",
                rating: 5,
                added: "2025-04-10"
            },
            {
                id: 6,
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                genre: "Fiction",
                status: "unread",
                rating: null,
                added: "2025-05-05"
            }
        ];

        // DOM Elements
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        const startTrackingBtns = document.querySelectorAll('.start-tracking');
        const bookForm = document.getElementById('book-form');
        const booksContainer = document.getElementById('books-container');
        const filterStatus = document.getElementById('filter-status');
        const filterGenre = document.getElementById('filter-genre');
        const searchInput = document.getElementById('search');
        const galleryGrid = document.getElementById('gallery-grid');
        const gallerySort = document.getElementById('gallery-sort');
        const galleryStatus = document.getElementById('gallery-status');
        const resetGalleryBtn = document.getElementById('reset-gallery');
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Show selected page
                const pageId = link.getAttribute('data-page');
                showPage(pageId);
                
                // Close mobile menu
                nav.classList.remove('active');
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        });

        // Start tracking buttons
        startTrackingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector('[data-page="tracker"]').classList.add('active');
                
                // Show tracker page
                showPage('tracker');
                
                // Close mobile menu
                nav.classList.remove('active');
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        });

        // Show page function
        function showPage(pageId) {
            pages.forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
        }

        // Render book cards
        function renderBooks(booksToRender) {
            booksContainer.innerHTML = '';
            
            if (booksToRender.length === 0) {
                booksContainer.innerHTML = '<p class="text-center">No books found. Add some books to your collection!</p>';
                return;
            }
            
            booksToRender.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                
                let statusText = '';
                let statusClass = '';
                
                switch(book.status) {
                    case 'unread':
                        statusText = 'Want to Read';
                        statusClass = 'status-unread';
                        break;
                    case 'reading':
                        statusText = 'Currently Reading';
                        statusClass = 'status-reading';
                        break;
                    case 'read':
                        statusText = 'Read';
                        statusClass = 'status-read';
                        break;
                }
                
                bookCard.innerHTML = `
                    <div class="book-header">
                        <h3>${book.title}</h3>
                    </div>
                    <div class="book-body">
                        <p class="book-meta"><i class="fas fa-user"></i> ${book.author}</p>
                        <p class="book-meta"><i class="fas fa-book"></i> ${book.genre}</p>
                        ${book.rating ? `<p class="book-meta"><i class="fas fa-star"></i> ${book.rating}/5</p>` : ''}
                        <span class="book-status ${statusClass}">${statusText}</span>
                    </div>
                    <div class="book-actions">
                        <button class="action-btn edit-btn" data-id="${book.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="action-btn delete-btn" data-id="${book.id}"><i class="fas fa-trash"></i> Delete</button>
                    </div>
                `;
                
                booksContainer.appendChild(bookCard);
            });
            
            // Add event listeners to action buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const bookId = btn.getAttribute('data-id');
                    editBook(bookId);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const bookId = btn.getAttribute('data-id');
                    deleteBook(bookId);
                });
            });
        }

        // Render gallery items
        function renderGallery(booksToRender) {
            galleryGrid.innerHTML = '';
            
            if (booksToRender.length === 0) {
                galleryGrid.innerHTML = '<p class="text-center">No books match your filters.</p>';
                return;
            }
            
            booksToRender.forEach(book => {
                const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12', '#1abc9c'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.backgroundColor = randomColor;
                
                let statusText = '';
                
                switch(book.status) {
                    case 'unread':
                        statusText = 'Want to Read';
                        break;
                    case 'reading':
                        statusText = 'Currently Reading';
                        break;
                    case 'read':
                        statusText = 'Read';
                        break;
                }
                
                galleryItem.innerHTML = `
                    <div class="gallery-info">
                        <h3>${book.title}</h3>
                        <p>${book.author}</p>
                        <p>${book.genre} • ${statusText}</p>
                    </div>
                `;
                
                galleryGrid.appendChild(galleryItem);
            });
        }

        // Filter and sort books
        function filterBooks() {
            const statusValue = filterStatus.value;
            const genreValue = filterGenre.value;
            const searchValue = searchInput.value.toLowerCase();
            
            let filteredBooks = [...books];
            
            // Apply status filter
            if (statusValue !== 'all') {
                filteredBooks = filteredBooks.filter(book => book.status === statusValue);
            }
            
            // Apply genre filter
            if (genreValue !== 'all') {
                filteredBooks = filteredBooks.filter(book => book.genre === genreValue);
            }
            
            // Apply search
            if (searchValue) {
                filteredBooks = filteredBooks.filter(book => 
                    book.title.toLowerCase().includes(searchValue) || 
                    book.author.toLowerCase().includes(searchValue)
                );
            }
            
            renderBooks(filteredBooks);
        }

        // Filter and sort gallery
        function filterGallery() {
            const statusValue = galleryStatus.value;
            const sortValue = gallerySort.value;
            
            let filteredBooks = [...books];
            
            // Apply status filter
            if (statusValue !== 'all') {
                filteredBooks = filteredBooks.filter(book => book.status === statusValue);
            }
            
            // Apply sorting
            switch(sortValue) {
                case 'title':
                    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'author':
                    filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
                    break;
                case 'rating':
                    filteredBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    break;
                case 'added':
                default:
                    filteredBooks.sort((a, b) => new Date(b.added) - new Date(a.added));
                    break;
            }
            
            renderGallery(filteredBooks);
        }

        // Add new book
        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const genre = document.getElementById('genre').value;
            const status = document.getElementById('status').value;
            const rating = document.getElementById('rating').value;
            const notes = document.getElementById('notes').value;
            
            // Simple validation
            let valid = true;
            
            if (!title) {
                document.getElementById('title-error').textContent = 'Title is required';
                document.getElementById('title-error').style.display = 'block';
                valid = false;
            } else {
                document.getElementById('title-error').style.display = 'none';
            }
            
            if (!author) {
                document.getElementById('author-error').textContent = 'Author is required';
                document.getElementById('author-error').style.display = 'block';
                valid = false;
            } else {
                document.getElementById('author-error').style.display = 'none';
            }
            
            if (!valid) return;
            
            // Create new book object
            const newBook = {
                id: Date.now(),
                title,
                author,
                genre,
                status,
                rating: rating ? parseInt(rating) : null,
                notes,
                added: new Date().toISOString().split('T')[0]
            };
            
            // Add to books array
            books.push(newBook);
            
            // Render books
            filterBooks();
            
            // Reset form
            bookForm.reset();
            
            // Show success message
            alert(`"${title}" has been added to your collection!`);
        });

        // Edit book (placeholder)
        function editBook(bookId) {
            alert(`Edit book with ID: ${bookId}`);
        }

        // Delete book
        function deleteBook(bookId) {
            if (confirm('Are you sure you want to delete this book?')) {
                const index = books.findIndex(book => book.id == bookId);
                if (index !== -1) {
                    books.splice(index, 1);
                    filterBooks();
                    filterGallery();
                }
            }
        }

        // Contact form validation
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation
            let valid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            document.querySelectorAll('.error').forEach(el => {
                el.style.display = 'none';
            });
            
            if (!name) {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').style.display = 'block';
                valid = false;
            }
            
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                document.getElementById('email-error').style.display = 'block';
                valid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                document.getElementById('email-error').style.display = 'block';
                valid = false;
            }
            
            if (!subject) {
                document.getElementById('subject-error').textContent = 'Subject is required';
                document.getElementById('subject-error').style.display = 'block';
                valid = false;
            }
            
            if (!message) {
                document.getElementById('message-error').textContent = 'Message is required';
                document.getElementById('message-error').style.display = 'block';
                valid = false;
            }
            
            if (!valid) return;
            
            // Form is valid - show success message
            successMessage.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                successMessage.style.display = 'none';
            }, 3000);
        });

        // Event listeners for filters
        filterStatus.addEventListener('change', filterBooks);
        filterGenre.addEventListener('change', filterBooks);
        searchInput.addEventListener('input', filterBooks);
        
        gallerySort.addEventListener('change', filterGallery);
        galleryStatus.addEventListener('change', filterGallery);
        resetGalleryBtn.addEventListener('click', () => {
            gallerySort.value = 'added';
            galleryStatus.value = 'all';
            filterGallery();
        });

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            // Render initial book list
            filterBooks();
            
            // Render initial gallery
            filterGallery();
        });
  