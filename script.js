const searchBtn = document.getElementById("btn-input")

searchBtn.addEventListener("click", async function() {
    const inputSearch = document.getElementById('input')
    const movies = await getMovies(inputSearch.value)
    updateUI(movies)
})

// event binding 
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('btn-detail')){
        const imdbid = e.target.dataset.imdbid
        const movieDetail = await getMovieDetail(imdbid)
        updateUIDetail(movieDetail)
    }
})

function getMovieDetail(imdbid) {
    return fetch(`http://www.omdbapi.com/?apikey=18237c30&i=${imdbid}`)
        .then(response => response.json())
        .then(response => response)
}

function updateUIDetail(response) {
    const detail = showDetails(response);
    const condetail = document.querySelector('.container-detail')
    condetail.innerHTML = detail;
}

function getMovies(key) {
    return fetch(`http://www.omdbapi.com/?apikey=18237c30&s=${key}`)
        .then(response => response.json())
        .then(response => response.Search)
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(movie => cards += cardslist(movie));
    const films = document.getElementById('films');
    films.innerHTML = cards;
}

function cardslist(movie) {
    return `<div class="col-md-3 col-sm-6">
                <div class="card cards my-1">
                    <img src="${movie.Poster}" height="300px" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <a href="#" class="btn btn-detail btn-dark" data-bs-toggle="modal" data-bs-target="#detailModal" data-imdbid="${movie.imdbID}">Detail</a>
                    </div>
                </div>
            </div>`
}

function showDetails(response) {
    return `<div class="row justify-content-center">
                <div class="col-md-5 col-sm-12 justify-content-center">
                    <img src="${response.Poster}" alt="">
                </div>
                <div class="col-md-7 col-sm-12">
                    <h1 class="text-start">${response.Title}</h1>
                    <p class="text-start">Year : ${response.Year}</p>
                    <p class="text-start">Released : ${response.Released}</p>
                    <p class="text-start">Genre : ${response.Genre}</p>
                    <p class="text-start">Topic : ${response.Plot}</p>
                    <p class="text-start">Actor : ${response.Actors}</p>
                    <p class="text-start">Director : ${response.Director}</p>
                    <p class="text-start">Writer : ${response.Writer}</p>
                    <p class="text-start">Runtime : ${response.Runtime}</p>
                    <p class="text-start">Country : ${response.Country}</p>
                </div>
            </div>`
}