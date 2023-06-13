const searchBtn = document.getElementById("btn-input")
const inputSearch = document.getElementById('input')

searchBtn.addEventListener("click", function() {
    let cards = ''
    fetch(`http://www.omdbapi.com/?apikey=18237c30&s=${inputSearch.value}`)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search
            movies.forEach(m => {
                cards += `<div class="col-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <p class="card-text">${m.Year}</p>
                    <a href="#" class="btn btn-detail btn-dark" data-bs-toggle="modal" data-bs-target="#detailModal" data-imdbid="${m.imdbID}">Detail</a>
                    </div>
                </div>
            </div>`
            });
            const films = document.getElementById('films')
            films.innerHTML = cards
            const btndetail = Array.from(document.getElementsByClassName('btn-detail'))
            console.log(btndetail)

            btndetail.forEach(btn => {
                btn.addEventListener('click', function() {
                    let detail = '';
                    fetch(`http://www.omdbapi.com/?apikey=18237c30&i=${this.dataset.imdbid}`)
                        .then(response => response.json())
                        .then(response => {
                            detail = `
                            <div class="row justify-content-center">
                                <div class="col-6 justify-content-center">
                                    <img src="${response.Poster}" alt="">
                                </div>
                                <div class="col-6">
                                    <h1 class="text-start">Title :${response.Title}</h1>
                                    <p class="text-start">Year :${response.Year}</p>
                                    <p class="text-start">Released :${response.Released}</p>
                                    <p class="text-start">Genre :${response.Genre}</p>
                                    <p class="text-start">Topic :${response.Plot}</p>
                                    <p class="text-start">Actor :${response.Actors}</p>
                                </div>
                            </div>`
                            const condetail = document.querySelector('.container-detail')
                            condetail.innerHTML = detail;
                        })
                })
            })
        
        })
    
})