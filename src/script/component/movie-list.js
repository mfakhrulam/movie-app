import "./movie-item.js";

class MovieList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  renderError(message) {
    this.shadowDOM.innerHTML = `
    <style>
        .placeholder {
          font-weight: lighter;
          color: rgba(0, 0, 0, 0.5);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
    </style>
    `;
    this.shadowDOM.innerHTML += `
      <h2 class="placeholder">${message}</h2>
    `;
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      :host {
        margin-top: 2em;
        display: flex;
        flex-direction: column;
      }

      :host h1 {
        margin-top: 1em; 
        margin-bottom: 0;
      }
      
      .wrapper {
        margin-top: 1em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    </style>
    `;
    const h1 = document.createElement("h1");
    const wrapper = document.createElement("div");
    h1.innerText = "Discover Popular Movie";
    wrapper.classList.add("wrapper");
    this.shadowDOM.appendChild(h1);
    this.shadowDOM.appendChild(wrapper);
    this._movies.forEach((movie) => {
      const movieItemElement = document.createElement("movie-item");
      movieItemElement.movie = movie;
      wrapper.appendChild(movieItemElement);
    });
  }

  changeDiscoverOrSearchText(keyword) {
    const h1 = this.shadowDOM.querySelector("h1");
    if (keyword === "") {
      h1.innerText = `Discover Popular Movie`;
    } else {
      h1.innerText = `Showing results for: ${keyword}`;
    }
  }
}

customElements.define("movie-list", MovieList);
