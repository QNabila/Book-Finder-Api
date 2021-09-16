// search with enter
const searchBtn = document.getElementById('button-addon2');
const searchField = document.getElementById('search-field');

searchField.addEventListener("keypress", (event) => {
  // event.preventDefault();
  if (event.keyCode == 13)
    {
      searchBtn.click();
    }
})

// alert for no input
document.getElementById("alert").style.display = "none";
// Get input
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // alert for no input
  if (searchField.value == 0) {
    document.getElementById("alert").style.display = "block";
  } else {
    document.getElementById("alert").style.display = "none";
    // clear serach field
    searchField.value = "";

    //fetch data
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayBook(data.docs, data));

    // Display books on ui
    const displayBook = (resultBooks, data) => {
      const totalResults = document.getElementById("total-results");
      // clear result found text
      totalResults.textContent = "";
      const resultDiv = document.createElement("div");

      // Check wheather input data is available
      if (data.numFound) {
        resultDiv.innerHTML = `<h4 class="text-center mb-4">${data.numFound} number of results found </h4>`;
        totalResults.appendChild(resultDiv);
      } else {
        resultDiv.innerHTML = `<h2 class="text-center">No results found </h2>`;
        totalResults.appendChild(resultDiv);
      }
      const searchResult = document.getElementById("search-result");
      // clear previous result
      searchResult.innerText = "";
      // limiting searching result
      const books = resultBooks.slice(0, 20);
      books.forEach((book) => {
        console.log(book);
        // assigning  value for absent informations
        if (book.publisher == undefined) {
          book.publisher = "Not published";
        }
        if (book.author_name == undefined) {
          book.author_name = "Not published";
        }
        if (book.first_publish_year == undefined) {
          book.first_publish_year = "Not published";
        }
        const div = document.createElement("div");

        div.innerHTML = `<div class="col">
                <div class="card h-75">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"class="card-img-top" alt="">
                  <div class="card-body">
                    <h5 class="card-title">Book Title:${book.title}</h5>
                    <p class="card-text"><b></b>Author Name: ${book.author_name}</p>
                    <p class="card-text">Publisher Name: ${book.publisher}</p>
                    <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                  </div>
                </div>
              </div>`;
        searchResult.appendChild(div);
      });
    };
  }
};
