import { moviesShowsContainer} from './dom-elements.js'
import {getData} from './index.js'
import {Details, createLoadMoreBtn, loadMore} from './details.js'

let popularMovie = new Details()

export function addPopularMovies() {
    moviesFirstPage = []
    currentMovies = []
    moviesShowsContainer.innerHTML = ''
    createLoadMoreBtn()
    moviesShowsContainer.style.display = 'flex'
    window.onscroll = () => loadMore.style.display = 'block'

    let currentPage = 1
    let nextPage = 2
    for (let i = currentPage; i < nextPage; i++) {
        getData(`https://api.themoviedb.org/3/discover/movie?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&sort_by=popularity.desc&include_adult=false&page=${i}`).then(data => {
            for (let j = 0; j < 20; j++) {
                popularMovie.title = data.results[j].title
                popularMovie.releaseDate = data.results[j].release_date     
                addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, popularMovie.title, popularMovie.releaseDate)
                moviesFirstPage.push(movieDiv)
            }
        })
    }
    addPopularMovieDetails(moviesFirstPage, 1)

    loadMore.addEventListener('click', () => {
        moviesFirstPage = []
        currentMovies = []
        window.scrollBy(0, -200)
        currentPage++
        nextPage++

        if (currentPage < nextPage) {     
            getData(`https://api.themoviedb.org/3/discover/movie?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&sort_by=popularity.desc&include_adult=false&page=${currentPage}`).then(data => {               
                for (let j = 0; j < 20; j++) {
                    popularMovie.title = data.results[j].title
                    popularMovie.releaseDate = data.results[j].release_date                   
                    addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, popularMovie.title, popularMovie.releaseDate) 
                    currentMovies.push(movieDiv)
                }
            })
        }
        addPopularMovieDetails(currentMovies, currentPage)
    })
}

let moviesFirstPage = []
let currentMovies = []
let movieDiv

function addData(src, name, date) {
    movieDiv = document.createElement('div')
    movieDiv.classList.add('all-movies-shows') 
    moviesShowsContainer.append(movieDiv)

    const img = document.createElement('img')
    img.src = src
    img.style.borderRadius = '3%'

    const h5 = document.createElement('h5')
    h5.append(date)
    h5.style.marginTop = '7%'
    
    movieDiv.append(img, name, h5)
}

import { addImages } from './home-page-info.js'

function addPopularMovieDetails(arr, page) {
    popularMovie.addDetails(`https://api.themoviedb.org/3/discover/movie?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}`, popularMovie, arr, addImages)
}
