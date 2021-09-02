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
    books.forEach(book => {
        showBooks(book)
    });
};

// show books 

const showBooks = book => {
    // console.log(book);
    const bookCard = document.createElement('div');
    bookCard.classList.add('col');
    // cover image 
    const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    bookCard.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl ? imgUrl : ''}" class="card-img-top image-top" alt="..." />
            <div class="card-body">
                <h3 class="card-title">${book.title}</h3>
                <h5>Author: ${book.author_name ? book.author_name[0] : ''}</h5>
                <h5>Publishar: ${book.publisher ? book.publisher[0] : ''}</h5>
                <p>First publication: ${book.first_publish_year ? book.first_publish_year: ''}</p>
                <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
            </div>
            
        </div>
    `;
    bookContainer.appendChild(bookCard);
}