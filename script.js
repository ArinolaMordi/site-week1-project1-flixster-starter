console.log("Hello")

var submitBtn = document.getElementById("submitBtn");
var moviesGrid = document.getElementById("moviesGrid");
var searchInput = document.getElementById("searchInput");
var loadMoreBtn = document.getElementById("loadMoreBtn");
var currentPage = 1; // Track the current page of loaded movies

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission (optional)
  const searchTerm = searchInput.value.trim(); // Get the search term from the input field
  currentPage = 1; // Reset the current page to 1
  moviesGrid.innerHTML = ""; // Clear the existing movie grid
  await getAndShowcaseMovies(searchTerm); // Call the API with the search term
});

loadMoreBtn.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim(); // Get the search term from the input field
  currentPage++; // Increment the current page
  await getAndShowcaseMovies(searchTerm); // Call the API with the search term
});

const getAndShowcaseMovies = async (searchTerm = "") => {
  try {
    const API_KEY = "ecfcc9722bda2c1cd214647a67356e27";
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${currentPage}`;

    if (searchTerm !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        searchTerm
      )}&page=${currentPage}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      const movieTitle = document.createElement("div");
      movieTitle.classList.add("movie-title");
      movieTitle.textContent = movie.title;

      const movieRating = document.createElement("div");
      movieRating.classList.add("movie-rating");
      movieRating.textContent = "⭐️ " + movie.vote_average;

      const img = document.createElement("img");
      img.classList.add("movie-poster");
      img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

      movieCard.appendChild(img);
      movieCard.appendChild(movieRating);
      movieCard.appendChild(movieTitle);

      moviesGrid.appendChild(movieCard);
    });

    if (movies.length === 0) {
      // If no movies found
      loadMoreBtn.style.display = "none"; // Hide the "Load More" button
      if (currentPage === 1) {
        // If it's the initial load, show a message
        const noResultsMsg = document.createElement("div");
        noResultsMsg.textContent = "No movies found.";
        moviesGrid.appendChild(noResultsMsg);
      }
    } else {
      loadMoreBtn.style.display = "block"; // Show the "Load More" button
    }
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", (event) => {
  event.preventDefault();
  submitBtn.click(); // Trigger the submit button click event on initial load
});
