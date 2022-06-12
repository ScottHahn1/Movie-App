import {moviesShowsContainer} from './dom-elements.js'
import {getData} from './index.js'
import {createLoadMoreBtn, Person, loadMore} from './details.js'

let person = new Person()

export function addPopularPeople() {
    peopleFirstPage = []
    peopleNextPages = []
    moviesShowsContainer.innerHTML = ''
    createLoadMoreBtn()
    moviesShowsContainer.style.display = 'flex'
    window.onscroll = () => loadMore.style.display = 'block'

    let currentPage = 1
    let nextPage = 2
    let knownFor

    for (let i = currentPage; i < nextPage; i++) {
        getData(`https://api.themoviedb.org/3/person/popular?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=${i}`).then(data => {
            for (let j = 0; j < 20; j++) {
                data.results[j].known_for[0].title == undefined ? knownFor = data.results[j].known_for[0].name : knownFor = data.results[j].known_for[0].title
                addData(`https://image.tmdb.org/t/p/w342${data.results[j].profile_path}`, data.results[j].name, knownFor)
                peopleFirstPage.push(peopleDiv)
            }
        })
    }
    addPerson(peopleFirstPage, 1) 

    loadMore.addEventListener('click', () => {
        peopleFirstPage = []
    	peopleNextPages = []
        window.scrollBy(0, -200)
        currentPage++
        nextPage++

        if (currentPage < nextPage) {   
            getData(`https://api.themoviedb.org/3/person/popular?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=${currentPage}`).then(data => {               
                for (let j = 0; j < 20; j++) {
                    data.results[j].known_for[0].title == undefined ? knownFor = data.results[j].known_for[0].name : knownFor = data.results[j].known_for[0].title
                    addData(`https://image.tmdb.org/t/p/w342${data.results[j].profile_path}`, data.results[j].name, knownFor)
                    peopleNextPages.push(peopleDiv)
                }
            })
        }
        addPerson(peopleNextPages, currentPage)
    })
}

let peopleFirstPage = []
let peopleNextPages = []
let peopleDiv

function addData(src, name, date) {
    peopleDiv = document.createElement('div')
    peopleDiv.classList.add('all-people') 
    moviesShowsContainer.append(peopleDiv)

    const img = document.createElement('img')
    img.src = src
    img.style.borderRadius = '3%'

    const h5 = document.createElement('h5')
    h5.append(date)
    h5.style.marginTop = '7%'
    
    peopleDiv.append(img, name, h5)
}

import { addImages } from './home-page-info.js'

function addPerson(arr, page) {
    person.addPeopleDetails(`https://api.themoviedb.org/3/person/popular?api_key=6090d74b4dbb23d14565eee8a0e8ec1c&language=en-US&page=${page}`, person, arr, addImages)
}
