class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector("#searchElement").value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
          * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Nunito', sans-serif;
        } 

        .search-bar-wrapper {
          display: flex;
          justify-content: flex-start;
          width: 100%;
        }
        
        .control.is-expanded {
          flex-grow: 1;
          flex-shrink: 1;
        }
        
        .input {
          background-color: #fcfcfc;
          border: 1px solid rgb(10 10 10 / 10%);
          border-top-left-radius: 0.4em;
          border-bottom-left-radius: 0.4em;
          color: #363636;
          box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
          outline: none;
          padding: 1em;
          width: 100%;
        }
        
        .input:focus {
          background-color: #f5f5f5;
          box-shadow: 0 0 0.5em #00a088;
        }

        .input:hover {
          background-color: #f5f5f5;
        }
        
        .button {
          cursor: pointer;
          justify-content: center;
          padding: 1em;
          text-align: center;
          background-color: #00d1b2;
          border: 1px solid rgb(10 10 10 / 10%);
          color: #fff;
          border-top-right-radius: 0.5em;
          border-bottom-right-radius: 0.5em;
        }
        
        .button:hover {
          background-color: #00a088;
        }
      </style>

      <div class="search-bar-wrapper" id="search-container">
        <div class="control is-expanded">
          <input class="input" id="searchElement" type="text" placeholder="Search for a movie...">
        </div>
        <div class="control">
          <button class="button is-primary" id="searchButtonElement">
            Search
          </button>
        </div>
      </div>
    `;

    this.shadowDOM
      .querySelector("#searchButtonElement")
      .addEventListener("click", this._clickEvent);
  }
}

customElements.define("search-bar", SearchBar);
