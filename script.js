console.log("Hello")

var submitBtn = document.getElementById("submitBtn");
var moviesDiv = document.getElementById("moviesDiv");
var searchInput = document.getElementById("searchInput"); 

submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission (optional)
});
 https://api.themoviedb.org/3/movie/now_playing?api_key=ecfcc9722bda2c1cd214647a67356e27&q="movie"
const getAndShowcaseMovies = async( ) => {
    try {
        const apiKey = "ecfcc9722bda2c1cd214647a67356e27";
        //const searchTerm = searchInput.value;
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&="movies"`
        const response = await fetch(url);
        const data = await response.json();
        const images = data.results;

        images.forEach(movies => {
            const img = document.createElement("img");
            img.src = movies.poster_path;
            moviesDiv.appendChild(img); // Step 3: Add the image url to the gifsDiv
        });

        console.log(data.results[0]);
        console.log(data.results[0].images.original.url);
        // Process the data returned from the API
        // console.log(data);
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.log(error);
    }

    // Perform your desired action here
    console.log("Button clicked!");
}