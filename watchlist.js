const watchlistResult = document.getElementById("watchlist-result");
const movieListContainer = document.getElementById("list-container");
let watchlistArr = JSON.parse(localStorage.getItem("watchlist"));

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-id]");
  if (!btn) return;
  if (btn.classList.contains("remove-watchlist-btn")) {
    handleRemoveFromWatchlist(btn.dataset.id);
  }
});

function handleRemoveFromWatchlist(movieId) {
  const removeIndex = watchlistArr.indexOf(movieId);
  watchlistArr.splice(removeIndex, 1);
  localStorage.setItem("watchlist", JSON.stringify(watchlistArr));
  watchlistArr = JSON.parse(localStorage.getItem("watchlist"));
  if (watchlistArr.length > 0) {
    populateWatchlist(watchlistArr);
  } else if (watchlistArr.length === 0) {
    watchlistResult.textContent = "Add movies to your watchlist";
  }
}

function populateWatchlist(movieArr) {
  movieListContainer.innerHTML = "";
  let section = document.createElement("section");
  for (let movieId of movieArr) {
    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=ac21fb74`)
      .then((res) => res.json())
      .then((data) => {
        section.classList.add("movie-list-container");
        section.setAttribute("id", "list-container");
        section.innerHTML += `
          <div id="movie-card" class="movie-card">
              <img src="${data.Poster} "alt="" class="movie-poster" id="movie-poster">
              <div id="movie-information">
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
              <button id="watchlist-btn" class="remove-watchlist-btn watchlist-btn" data-id="${data.imdbID}"><span class="material-symbols-outlined">
                            do_not_disturb_on
                            </span>Remove</button>
                            </div>
                            <hr>
                            `;
      });
  }
  watchlistResult.innerHTML = "";
  watchlistResult.appendChild(section);
}
populateWatchlist(watchlistArr);
