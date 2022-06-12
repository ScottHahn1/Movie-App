export function genres(genreId, div) {
    const genreSpace = 'Genre: \xa0'

    switch (genreId) {
        case 28:
            div.append(genreSpace + 'Action')
            break
    
        case 12:
            div.append(genreSpace + 'Adventure')
            break

        case 16:
            div.append(genreSpace + 'Animation')
            break

        case 35:
            div.append(genreSpace + 'Comedy')
            break

        case 80:
            div.append(genreSpace + 'Crime')
            break

        case 99:
            div.append(genreSpace + 'Documentary')
            break

        case 18:
            div.append(genreSpace + 'Drama')
            break

        case 10751:
            div.append(genreSpace + 'Family')
            break

        case 14:
            div.append(genreSpace + 'Fantasy')
            break

        case 36:
            div.append(genreSpace + 'History')
            break

        case 27:
            div.append(genreSpace + 'Horror')
            break

        case 10402:
            div.append(genreSpace + 'Music')
            break

        case 9648:
            div.append(genreSpace + 'Mystery')
            break

        case 10749:
            div.append(genreSpace + 'Romance')
            break

        case 878:
            div.append(genreSpace + 'Science Fiction')
            break

        case 10770:
            div.append(genreSpace + 'TV-Movie')
            break

        case 53:
            div.append(genreSpace + 'Thriller')
            break

        case 10752:
            div.append(genreSpace + 'War')
            break

        case 37:
            div.append(genreSpace + 'Western')
            break

        case 10759:
            div.append(genreSpace + 'Action & Adventure')
            break
    }
}