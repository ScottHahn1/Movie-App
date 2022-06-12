import {trendingDiv, upcomingDiv, details, detailsContainer} from './dom-elements.js'
import {getData} from './index.js'
import {Details} from './details.js'

let div
let trendingArr = []
let upcomingArr = []

let trending = new Details()

export function addWhatsTrending() {
    getData('https://api.themoviedb.org/3/trending/all/day?api_key=6090d74b4dbb23d14565eee8a0e8ec1c').then(data => {
        for (let i = 0; i < 20; i++) {
            const img = document.createElement('img')
            div = document.createElement('div')
            div.classList.add('trending-movies-shows')
            img.src = `https://image.tmdb.org/t/p/w185${data.results[i].poster_path}`
            img.style.padding = '5px'

            div.append(img)
            trendingArr.push(div)
            if (data.results[i].title == undefined) {
                div.append(data.results[i].name)
            }

            else if (data.results[i].title !== undefined) {
                div.append(data.results[i].title)
            }

            trendingDiv.append(div)
        }
    })
    addTrendingDetails()
}

function addTrendingDetails() {
    trending.addDetails('https://api.themoviedb.org/3/trending/all/day?api_key=6090d74b4dbb23d14565eee8a0e8ec1c', trending, trendingArr, addImages)
}

let upcoming = new Details()

export function addUpcoming() {
    getData('https://api.themoviedb.org/3/movie/upcoming?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=1').then(data => {
        for (let i = 0; i < 20; i++) {
            const img = document.createElement('img')
            div = document.createElement('div')
            img.src = `https://image.tmdb.org/t/p/w185${data.results[i].poster_path}`
            img.style.padding = '5px'
            img.style.height = '250px'
            div.append(img)
            upcomingArr.push(div)
            if (data.results[i].title == undefined) {
                div.append(data.results[i].name)
            }
            else if (data.results[i].title !== undefined) {
                div.append(data.results[i].title)
            }
            upcomingDiv.append(div)
        }
    })
    addUpcomingDetails()
}

function addUpcomingDetails() {
    upcoming.addDetails('https://api.themoviedb.org/3/movie/upcoming?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=1', upcoming, upcomingArr, addImages)
}

export function addImages(backgroundSrc, imgSrc) {
    detailsContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${backgroundSrc})`
    const img = document.createElement('img')
    img.src = `https://image.tmdb.org/t/p/original${imgSrc}`
    img.classList.add('details-poster')
    details.append(img)
}

