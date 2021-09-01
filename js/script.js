// necessary variable 
const searchField = document.getElementById('search-field');
const bookContainer = document.getElementById('book-container');

// load data
const loadData = async () => {
    const searchText = searchField.value;
    // fetch data
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    // clear search field 
    searchField.value = '';
    // call function
    bookContainer.innerHTML = '';
    getBooks(data.docs);
};
// get all books by search
const getBooks = books => {
    // loop through array
    books.forEach(book => {
        showBooks(book)
    });
};

// show books 

const showBooks = book => {
    console.log(book.title);
    const bookCard = document.createElement('div');
    bookCard.classList.add('col');
    bookCard.innerHTML = `
        <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
                <h4 class="card-title">${book.title}</h4>
                <p>Author: ${book.author_name}</p>
                <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
    `;
    bookContainer.appendChild(bookCard);
}