// necessary variable 
const searchField = document.getElementById('search-field');

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
    showBooks(data.docs);
};
// show books by search
const showBooks = books => {
    // console.log(books);
    // loop through array
    books.forEach(book => {
        console.log(book);
    });
}