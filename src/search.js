import { getData } from "./index.js"
import { moviesShowsContainer } from "./dom-elements.js"
import { loadMore, createLoadMoreBtn, Search} from "./details.js"
import { addImages } from "./home-page-info.js"

let search = new Search()

export function addSearched(query) {
    moviesFirstPage = []
    currentSearch = []

    moviesShowsContainer.innerHTML = ''
    createLoadMoreBtn()
    moviesShowsContainer.style.display = 'flex'
    window.onscroll = () => loadMore.style.display = 'block'

    let currentPage = 1
    let nextPage = 2
    let knownFor

    getData(`https://api.themoviedb.org/3/search/multi?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&include_adult=false&query=${query}&page=1`).then(data => {
            for (let j = 0; j < 20; j++) {
                if (data.results[j].media_type == 'movie') {
                    search.title = data.results[j].title
                    search.releaseDate = data.results[j].release_date
                    addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, search.title, search.releaseDate, data.results[j].poster_path)
                }

                if (data.results[j].media_type == 'tv') {
                    search.title = data.results[j].name
                    search.releaseDate = data.results[j].first_air_date
                    addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, search.title, search.releaseDate)
                }

                if (data.results[j].media_type == 'person') {
                    data.results[j].known_for[0].title == undefined ? knownFor = data.results[j].known_for[0].name : knownFor = data.results[j].known_for[0].title
                    search.name = data.results[j].name
                    addData(`https://image.tmdb.org/t/p/w342${data.results[j].profile_path}`, search.name, knownFor)
                }    

                moviesFirstPage.push(movieDiv)

                addSearchedDetails(moviesFirstPage, query, 1)
                addPeopleSearchedDetails(moviesFirstPage, query, 1)
            }
        })

        loadMore.addEventListener('click', () => {
            moviesFirstPage = []
            currentSearch = []
            window.scrollBy(0, -200)
            currentPage++
            nextPage++
    
            if (currentPage < nextPage) {         
                getData(`https://api.themoviedb.org/3/search/multi?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&include_adult=false&query=${query}&page=${currentPage}`).then(data => {               
                    for (let j = 0; j < 20; j++) {
                        if (data.results[j].media_type == 'movie') {
                            search.title = data.results[j].title
                            search.releaseDate = data.results[j].release_date
                            addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, search.title, search.releaseDate, data.results[j].poster_path)
                            currentSearch.push(movieDiv)
                        }
                        if (data.results[j].media_type == 'tv') {
                            search.title = data.results[j].name
                            search.releaseDate = data.results[j].first_air_date
                            addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, search.title, search.releaseDate)
                            currentSearch.push(movieDiv)
                        }
                        if (data.results[j].media_type == 'person') {
                            data.results[j].known_for[0].title == undefined ? knownFor = data.results[j].known_for[0].name : knownFor = data.results[j].known_for[0].title
                            search.name = data.results[j].name
                            addData(`https://image.tmdb.org/t/p/w342${data.results[j].profile_path}`, search.name, knownFor)
                            currentSearch.push(movieDiv)
                        }  
                    }
                })
                addSearchedDetails(currentSearch, query, currentPage)
                addPeopleSearchedDetails(currentSearch, query, currentPage)
            }
        })
}

let moviesFirstPage = []
let currentSearch = []
let movieDiv

function addData(src, name, date, imgPath) {
    movieDiv = document.createElement('div')
    movieDiv.classList.add(`all-movies-shows`) 
    moviesShowsContainer.append(movieDiv)

    const img = document.createElement('img')
    if (imgPath !== null) {
        img.src = src
    }
    img.style.borderRadius = '3%'

    const h5 = document.createElement('h5')
    h5.append(date)
    h5.style.marginTop = '7%'
    
    movieDiv.append(img, name, h5)
}

function addSearchedDetails(arr, query, page) {
    search.addSearchDetails(`https://api.themoviedb.org/3/search/multi?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&include_adult=false&query=${query}&page=${page}`, search, arr, addImages)
}

function addPeopleSearchedDetails(arr, query, page) {
    search.addPeopleDetails(`https://api.themoviedb.org/3/search/multi?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&include_adult=false&query=${query}&page=${page}`, search, arr, addImages)
}
