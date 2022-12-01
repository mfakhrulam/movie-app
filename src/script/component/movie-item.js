import ENV from "../data/env.js";

class MovieItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        } 
        
        :host {
          display: flex;
          flex-direction: column;
          flex: 1 0 20%;
          box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
            0 0 0 1px rgb(10 10 10 / 2%);
          padding: 1em;
          border-radius: 0.5em;
          border: 1px solid #e3e3e3;
          margin: 0.5em;
        }

        :host img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
        }

        .movie-content {
          padding: 0.5em;
        }

        .movie-content > h2 {
          font-weight: bold;
        }

        .movie-content > p {
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 10; /* number of lines to show */
        }

        @media screen and (max-width: 1024px) {
          :host {
            flex: 1 0 30%;
          }
        }

        @media screen and (max-width: 768px) {
          :host {
            flex: 1 0 40%;
          }
        }
        
      </style>

      <img src="${ENV.APP_IMG_URL}/${this._movie.poster_path}" alt="${this._movie.title} Image" class="movie-img">
      <div class="movie-content">
        <h2>${this._movie.title}</h2>
        <h3>Rating: ${this._movie.vote_average}</h4>
        <h3>Release: ${this._movie.release_date}</h4>
        <p>${this._movie.overview}</p>
      </div>
    `;
  }
}

customElements.define("movie-item", MovieItem);
