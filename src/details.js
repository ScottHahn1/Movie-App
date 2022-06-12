import {genres} from './genres.js'
import {getData} from './index.js'
import {detailsOverview, detailsContainer, detailsHead, trendingDiv, searchDiv, moviesShowsContainer, queryType, upcomingDiv, footer} from './dom-elements.js'

export class Details {
    constructor(title, releaseDate, genre, overview) {
        this.title = title
        this.releaseDate = releaseDate
        this.genre = genre
        this.overview = overview
    }

    addDetails(request, obj, arr, images) { 
        getData(request).then(data => {
            arr.forEach((item, index) => item.addEventListener('click', () => {
                detailsContainer.style.display = 'block'
                queryType.innerText = ''
                moviesShowsContainer.style.top = '150vh'
                trendingDiv.style.display = 'none'
                upcomingDiv.style.display = 'none'
                searchDiv.style.display = 'none'
                footer.style.paddingTop = '3vh'
                footer.style.marginTop = '50vh'

                detailsHead.childNodes[1].innerText = ''
                detailsOverview.childNodes[1].innerText = 'Overview:'
                detailsHead.childNodes[3].innerText = ''
                detailsHead.childNodes[5].innerText = ''
                detailsOverview.childNodes[3].innerText = ''

                data.results[index].title == undefined ? obj.title = data.results[index].name : obj.title = data.results[index].title
                
                detailsHead.childNodes[1].append(obj.title)

                images(data.results[index].backdrop_path, data.results[index].poster_path)

                data.results[index].release_date == undefined ? obj.releaseDate = data.results[index].first_air_date : obj.releaseDate = data.results[index].release_date

                data.results[index].release_date == undefined ? detailsHead.childNodes[3].append(`First Aired: \xa0 ${obj.releaseDate}`) : detailsHead.childNodes[3].append(`Released: \xa0 ${obj.releaseDate}`)

                obj.genre = data.results[index].genre_ids[0]
                genres(obj.genre, detailsHead.childNodes[5])

                obj.overview = data.results[index].overview
                detailsOverview.childNodes[3].append(obj.overview)
            
                detailsContainer.scrollIntoView()
            }))
        })
    }
}

export class Person {
    constructor(name, overview) {
        this.name = name
        this.overview = overview
    }

    addPeopleDetails(request, obj, arr, images) {
        getData(request).then(data => {
            arr.forEach((item, index) => item.addEventListener('click', () => {
                queryType.innerText = ''
                moviesShowsContainer.style.top = '150vh'
                detailsContainer.style.display = 'block'

                detailsOverview.childNodes[1].innerText = 'Biography:'

                trendingDiv.style.display = 'none'
                searchDiv.style.display = 'none'

                detailsHead.childNodes[1].innerText = ''
                detailsHead.childNodes[3].innerText = ''
                detailsHead.childNodes[5].innerText = ''
                detailsOverview.childNodes[3].innerText = ''

                obj.name = data.results[index].name
                detailsHead.childNodes[1].append(obj.name)

                let img
                data.results[index].known_for[0].backdrop_path == undefined ? img = data.results[index].known_for[0].poster_path : img = data.results[index].known_for[0].backdrop_path

                images(img, data.results[index].profile_path)

                getData(`https://api.themoviedb.org/3/person/${data.results[index].id}?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US`).then(data => {
                    obj.overview = data.biography
                    detailsOverview.childNodes[3].append(obj.overview)
                })
            
                detailsContainer.scrollIntoView()
            }))
        })
    }
}

export class Search {
    constructor(name, overview, title, releaseDate, genre) {
        this.name = name
        this.overview = overview
        this.title = title
        this.releaseDate = releaseDate
        this.genre = genre
    }

    addSearchDetails(request, obj, arr, images) {
        getData(request).then(data => {
            arr.forEach((item, index) => item.addEventListener('click', () => {
                if (data.results[index].media_type == 'movie' || data.results[index].media_type == 'tv') {
                    detailsContainer.style.display = 'block'
                    queryType.innerText = ''
                    moviesShowsContainer.style.top = '150vh'
                    trendingDiv.style.display = 'none'
                    searchDiv.style.display = 'none'
    
                    detailsHead.childNodes[1].innerText = ''
                    detailsOverview.childNodes[1].innerText = 'Overview:'
                    detailsHead.childNodes[3].innerText = ''
                    detailsHead.childNodes[5].innerText = ''
                    detailsOverview.childNodes[3].innerText = ''
    
                    data.results[index].title == undefined ? obj.title = data.results[index].name : obj.title = data.results[index].title
                    
                    detailsHead.childNodes[1].append(obj.title)
    
                    images(data.results[index].backdrop_path, data.results[index].poster_path)
    
                    data.results[index].release_date == undefined ? obj.releaseDate = data.results[index].first_air_date : obj.releaseDate = data.results[index].release_date
    
                    data.results[index].release_date == undefined ? detailsHead.childNodes[3].append(`First Aired: \xa0 ${obj.releaseDate}`) : detailsHead.childNodes[3].append(`Released: \xa0 ${obj.releaseDate}`)
    
                    obj.genre = data.results[index].genre_ids[0]
                    genres(obj.genre, detailsHead.childNodes[5])
    
                    obj.overview = data.results[index].overview
                    detailsOverview.childNodes[3].append(obj.overview)
                
                    detailsContainer.scrollIntoView()
                }
                    
            }))
        })
    }

    addPeopleDetails(request, obj, arr, images) {
        getData(request).then(data => {
            arr.forEach((item, index) => item.addEventListener('click', () => {
                if (data.results[index].media_type == 'person') {
                    queryType.innerText = ''
                    moviesShowsContainer.style.top = '150vh'
                    detailsContainer.style.display = 'block'

                    detailsOverview.childNodes[1].innerText = 'Biography:'

                    trendingDiv.style.display = 'none'
                    searchDiv.style.display = 'none'

                    detailsHead.childNodes[1].innerText = ''
                    detailsHead.childNodes[3].innerText = ''
                    detailsHead.childNodes[5].innerText = ''
                    detailsOverview.childNodes[3].innerText = ''

                    obj.name = data.results[index].name
                    detailsHead.childNodes[1].append(obj.name)

                    let img
                    data.results[index].known_for[0].backdrop_path == undefined ? img = data.results[index].known_for[0].poster_path : img = data.results[index].known_for[0].backdrop_path

                    images(img, data.results[index].profile_path)

                    getData(`https://api.themoviedb.org/3/person/${data.results[index].id}?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US`).then(data => {
                        obj.overview = data.biography
                        detailsOverview.childNodes[3].append(obj.overview)
                    })
                
                    detailsContainer.scrollIntoView()
                }
            }))
        })
    }
}

export let loadMore

export function createLoadMoreBtn() {
    loadMore = document.createElement('btn')
    moviesShowsContainer.append(loadMore)
    loadMore.style.display = 'none'
    loadMore.classList.add('load-more')
    loadMore.innerText = 'Load More'
}
