// necessary variable 
const searchField = document.getElementById('search-field');
const bookContainer = document.getElementById('book-container');
const errorMessage = document.getElementById('error-message');
const spinner = document.getElementById('spinner');

// result found 
const resultFound = numFound => {
    const bookFoundNumber = document.getElementById('book-number');
    bookFoundNumber.innerText = numFound;
}

// show error message 
const showError = (message) => {
    errorMessage.innerText = `${message}`;
    spinner.classList.add('d-none')
}

// load data
const loadData = async () => {
    const searchText = searchField.value;
    // search result found
    resultFound('')

    // spinner
    spinner.classList.remove('d-none');

    errorMessage.innerText = '';

    // clear container
    bookContainer.innerHTML = '';

    // error handle for empty search field
    if (searchField.value === '') {
        resultFound('')
        showError('⚠️ Please search by book name to show results.');
    } else {
        // fetch data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        // clear search field 
        searchField.value = '';


        if (data.numFound === 0) {
            resultFound('')
            showError('⚠️ No result found. PLease try again.');
        } else {
            // call function
            bookContainer.innerHTML = '';
            showError('');
            resultFound(`${data.numFound} Search result found.`);
            // spinner
            spinner.classList.add('d-none')
            getBooks(data.docs);
        }
    }

};


// get all books by search
const getBooks = books => {
    // loop through array
    books.slice(0, 30).forEach(book => {
        showBooks(book)
    });
};

// show books 
const showBooks = book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('col');
    // cover image 
    const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    bookCard.innerHTML = `
        <div class="card book-card shadow-lg">
            <img src="${imgUrl ? imgUrl : ''}" class="card-img-top image-top" alt="..." />
            <div class="card-body">
                <h3 class="card-title book-title fw-bold">${book.title.slice(0, 100)}</h3>
                <h5 class="author-name">Author: ${book.author_name ? book.author_name[0] : ''}</h5>
                <h5 class="publishar">Publishar: ${book.publisher ? book.publisher[0] : ''}</h5>
            </div>
            <div class="card-footer border-0">
            <p class="text-muted text-center">First publication:  ${book.first_publish_year ? book.first_publish_year: ''}</p>
            </div>
        </div>
    `;
    bookContainer.appendChild(bookCard);
};