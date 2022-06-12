import {homeBtn, moviesBtn, tvShowsBtn, searchDiv, popularMoviesBtn, theatresBtn, topRatedBtn, trendingDiv, upcomingDiv, upcoming, detailsContainer, searchBar} from './dom-elements.js'
import { moviesDropdown, tvShowsDropdown,  searchDivContainer, queryType, moviesShowsContainer, popularShowsBtn, onTheAirBtn, peopleBtn, topRatedShowsBtn, footer } from './dom-elements.js'
import { addUpcoming, addWhatsTrending } from './home-page-info.js'
import {addPopularMovies} from './popular-movies.js'
import { addInTheatresMovies } from './in-theatres.js'
import { addTopRatedMovies } from './top-rated-movies.js'
import {addPopularShows} from './popular-shows.js'
import {addAiringShows} from './airing-shows.js'
import { addPopularPeople } from './people.js'
import { addSearched } from './search.js'
import { addTopRatedShows } from './top-rated-shows.js'
import './style.css'

detailsContainer.style.display = 'none'
moviesShowsContainer.style.display = 'none'

export async function getData(link) {
    try {
        const response = await fetch(link)
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

function hideHome() {
    trendingDiv.style.display = 'none'
    upcomingDiv.style.display = 'none'
    upcoming.style.display = 'none'
    searchDivContainer.style.display = 'none'
    searchDiv.style.display = 'none'
    detailsContainer.style.display = 'none'
    moviesShowsContainer.style.top = '35%'
    footer.style.display = 'none'
}

function createImg(src) {
    searchDivContainer.style.backgroundImage = `url(${src})`
}

getData('https://api.themoviedb.org/3/discover/movie?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&sort_by=popularity.desc&include_adult=false')
.then(data => {
    const arr = []
    for (let i = 0; i < 10; i++) {
        arr.push(`https://image.tmdb.org/t/p/w1280${data.results[i].backdrop_path}`)
    }
    const random = arr[Math.floor(Math.random() * arr.length)]
    createImg(random)
})

addWhatsTrending()
addUpcoming()

popularMoviesBtn.addEventListener('click', () => { 
    queryType.innerText = 'Popular Movies'
    addPopularMovies()
    hideHome()
})

theatresBtn.addEventListener('click', () => {
    queryType.innerText = 'In Theatres'
    addInTheatresMovies()
    hideHome()
})

topRatedBtn.addEventListener('click', () => {
    queryType.innerText = 'Top Rated Movies'
    addTopRatedMovies()
    hideHome()
})

popularShowsBtn.addEventListener('click', () => { 
    queryType.innerText = 'Popular Shows'
    addPopularShows()
    hideHome()
})

onTheAirBtn.addEventListener('click', () => {
    queryType.innerText = 'On The Air'
    addAiringShows()
    hideHome()
})

topRatedShowsBtn.addEventListener('click', () => {
    queryType.innerText = 'Top Rated Shows'
    addTopRatedShows()
    hideHome()
})

peopleBtn.addEventListener('click', () => {
    queryType.innerText = 'People'
    addPopularPeople()
    hideHome()
})

homeBtn.addEventListener('click', () => {
    searchDiv.style.display = 'flex'
    trendingDiv.style.display = 'flex'
    upcomingDiv.style.display = 'flex'
    detailsContainer.style.display = 'none'
    moviesShowsContainer.innerHTML = ''
    searchDivContainer.style.display = 'flex'
    queryType.innerText = `What's Trending`
    upcoming.style.display = 'block'
    footer.style.display = 'flex'
})

searchBar.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        queryType.innerText = 'Search Results...'
        addSearched(searchBar.value)
        hideHome()
    }
})

function setMoviesDropdown() {
    moviesDropdown.style.display = 'none'
    moviesBtn.addEventListener('mouseover', () => moviesDropdown.style.display = 'flex')
    moviesBtn.addEventListener('mouseout', () => moviesDropdown.style.display = 'none')
}

function setTvShowsDropdown() {
    tvShowsDropdown.style.display = 'none'
    tvShowsBtn.addEventListener('mouseover', () => tvShowsDropdown.style.display = 'flex')
    tvShowsBtn.addEventListener('mouseout', () => tvShowsDropdown.style.display = 'none')
}

setMoviesDropdown()
setTvShowsDropdown()
