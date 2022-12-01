import axios from "axios";
import ENV from "../data/env.js";

class MovieDatabase {
  static searchMovie(keyword) {
    return axios
      .get(`${ENV.APP_BASE_URL}/search/movie?query=${keyword}`, {
        headers: {
          Authorization: `Bearer ${ENV.APP_API_KEY_v4}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((responseJson) => {
        console.log(responseJson.results);
        if (responseJson.results.length) {
          return Promise.resolve(responseJson.results);
        } else if (responseJson.errors) {
          return Promise.reject(responseJson.errors);
        } else {
          return Promise.reject(`${keyword} is not found`);
        }
      });
  }

  static getAllMoviesData() {
    return axios
      .get(`${ENV.APP_BASE_URL}/discover/movie?`, {
        headers: {
          Authorization: `Bearer ${ENV.APP_API_KEY_v4}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((responseJson) => {
        if (responseJson.results.length) {
          return Promise.resolve(responseJson.results);
        } else {
          return Promise.reject(responseJson.errors);
        }
      });
  }
}

export default MovieDatabase;
