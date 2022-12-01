import "../component/movie-list.js";
import "../component/search-bar.js";
import MovieDatabase from "../data/movie-database.js";

const main = () => {
  const searchElement = document.querySelector("search-bar");
  const movieListElement = document.querySelector("movie-list");
  const logo = document.querySelector("#logo");
  logo.addEventListener("click", () => {
    getAllMovies();
  });

  const onButtonSearchClicked = async () => {
    try {
      if (searchElement.value === "") {
        getAllMovies();
      } else {
        const result = await MovieDatabase.searchMovie(searchElement.value);
        renderResult(result);
      }
      movieListElement.changeDiscoverOrSearchText(searchElement.value);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const getAllMovies = async () => {
    const result = await MovieDatabase.getAllMoviesData(searchElement.value);
    renderResult(result);
  };

  const renderResult = (results) => {
    movieListElement.movies = results;
  };

  const fallbackResult = (message) => {
    movieListElement.renderError(message);
  };

  getAllMovies();
  searchElement.clickEvent = onButtonSearchClicked;
};

export default main;
