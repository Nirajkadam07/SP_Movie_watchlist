const inputSearch = document.getElementById("input-search");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");
const movieListContainer = document.getElementById("list-container");
let watchlistArr = [];

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-id]");
  if (!btn) return;
  if (btn.classList.contains("add-watchlist-btn")) {
    handleAddToWatchlist(btn.dataset.id, btn);
  } else if (btn.classList.contains("remove-watchlist-btn")) {
    handleRemoveFromWatchlist(btn.dataset.id, btn);
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(
    `http://www.omdbapi.com/?s=${inputSearch.value}&apikey=ac21fb74&type=movie`
  )
    .then((res) => res.json())
    .then((data) => {
      let section = document.createElement("section");
      for (let movie of data.Search) {
        fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=ac21fb74`)
          .then((res) => res.json())
          .then((data) => {
            section.classList.add("movie-list-container");
            section.setAttribute("id", "list-container");
            section.innerHTML += `
          <div id="movie-card" class="movie-card">
              <img src="${data.Poster} "alt="" class="movie-poster" id="movie-poster">
              <div id="movie-information" class="movie-information">
                        <div id="title" class="title">
                            <h1>${data.Title} <span id="rating" class="rating">⭐ ${data.Ratings[0].Value}</span></h1>
                        </div>
                        <div id="second-title" class="second-title">
                            <p>${data.Year}</p>
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                        </div>
                        <div id="plot" class="plot">
                            <p>${data.Plot}</p>
                        </div>
              </div>
              <button id="watchlist-btn" class="add-watchlist-btn watchlist-btn" data-id="${data.imdbID}"><span class="material-symbols-outlined">
                            add_circle
                    </span>Watchlist</button>
          </div>
          <hr>
            `;
          });
      }
      searchResult.innerHTML = "";
      searchResult.appendChild(section);
    })
    .catch((err) => {
      searchResult.innerHTML = "Please try something else to search..";
    });
});

function handleAddToWatchlist(movieId, clickedBtn) {
  if (!watchlistArr.includes(movieId)) {
    watchlistArr.push(movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlistArr));
  }
  clickedBtn.innerHTML = `<span class="material-symbols-outlined">do_not_disturb_on</span>Remove`;
  clickedBtn.classList.toggle("remove-watchlist-btn");
  clickedBtn.classList.toggle("add-watchlist-btn");
}

function handleRemoveFromWatchlist(movieId, clickedBtn) {
  const removeIndex = watchlistArr.indexOf(movieId);
  watchlistArr.splice(removeIndex, 1);
  localStorage.setItem("watchlist", JSON.stringify(watchlistArr));
  clickedBtn.innerHTML = `<span class="material-symbols-outlined">add_circle</span>Watchlist`;
  clickedBtn.classList.toggle("remove-watchlist-btn");
  clickedBtn.classList.toggle("add-watchlist-btn");
}
