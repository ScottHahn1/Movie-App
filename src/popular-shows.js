import { moviesShowsContainer} from './dom-elements.js'
import {getData} from './index.js'
import {Details, createLoadMoreBtn, loadMore} from './details.js'

let popularShow = new Details()

export function addPopularShows() {
    tvShowsFirstPage = []
    currentShows = []
    moviesShowsContainer.innerHTML = ''
    createLoadMoreBtn()
    moviesShowsContainer.style.display = 'flex'
    window.onscroll = () => loadMore.style.display = 'block'

    let currentPage = 1
    let nextPage = 2
    for (let i = currentPage; i < nextPage; i++) {
        getData(`https://api.themoviedb.org/3/tv/popular?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=${i}`).then(data => {
            for (let j = 0; j < 20; j++) {
                popularShow.title = data.results[j].name
                popularShow.releaseDate = data.results[j].first_air_date
                addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, popularShow.title, popularShow.releaseDate)
                tvShowsFirstPage.push(tvShowsDiv)
            }
        })
    }
    addPopularShowsDetails(tvShowsFirstPage, 1)

    loadMore.addEventListener('click', () => {
        tvShowsFirstPage = []
        currentShows = []
        window.scrollBy(0, -200)
        currentPage++
        nextPage++

        if (currentPage < nextPage) {         
            getData(`https://api.themoviedb.org/3/tv/popular?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=${currentPage}`).then(data => {               
                for (let j = 0; j < 20; j++) {
                    popularShow.title = data.results[j].name
                    popularShow.releaseDate = data.results[j].first_air_date                   
                    addData(`https://image.tmdb.org/t/p/w342${data.results[j].poster_path}`, popularShow.title, popularShow.releaseDate) 
                    currentShows.push(tvShowsDiv)
                }
            })
        }
        addPopularShowsDetails(currentShows, currentPage)
    })
}

let tvShowsFirstPage = []
let currentShows = []
let tvShowsDiv

function addData(src, name, date) {
    tvShowsDiv = document.createElement('div')
    tvShowsDiv.classList.add('all-movies-shows') 
    moviesShowsContainer.append(tvShowsDiv)

    const img = document.createElement('img')
    img.src = src
    img.style.borderRadius = '3%'

    const h5 = document.createElement('h5')
    h5.append(date)
    h5.style.marginTop = '7%'
    
    tvShowsDiv.append(img, name, h5)
}

import { addImages } from './home-page-info.js'

function addPopularShowsDetails(arr, page) {
    popularShow.addDetails(`https://api.themoviedb.org/3/tv/popular?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=${page}`, popularShow, arr, addImages)
}
