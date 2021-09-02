// Get input
const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    
    // clear serach field
    searchField.value = '';

    //fetch data
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayBook(data.docs,data));

    
    // Display books on ui
    const displayBook = (books, data) => {
        const totalResults = document.getElementById('total-results');
        // clear result found text
        totalResults.textContent = '';
        const resultDiv = document.createElement('div');

        // Check wheather input data is available
        if (data.numFound) {
            resultDiv.innerHTML = `<h2>${data.numFound} number of results found </h2>`;
        totalResults.appendChild(resultDiv);
        }
        else {
            resultDiv.innerHTML = `<h2>No results found </h2>`;
        totalResults.appendChild(resultDiv);
        }

        const searchResult = document.getElementById('search-result');
        // clear previous result
        searchResult.innerText = '';
        books.forEach(book => {
            console.log(book);
            if (book.publisher == undefined) {
                book.publisher = 'Not published';
            }
            if (book.author_name == undefined) {
                book.author_name = 'Not published';
            }
            if (book.first_publish_year == undefined) {
                book.first_publish_year = 'Not published';
            }
            const div = document.createElement('div');
          
                div.innerHTML = ` <div class="col">
                <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">Book Title:${book.title}</h5>
                    <p class="card-text"><b></b>Author Name: ${book.author_name}</p>
                    <p class="card-text">Publisher Name: ${book.publisher}</p>
                    <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                  </div>
                </div>
              </div>`;
                searchResult.appendChild(div);
            
        })
    }
};