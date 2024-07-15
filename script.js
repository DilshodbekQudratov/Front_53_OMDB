
/* в body добавляет класс dark */
let themeChanger = document.getElementById("changeBtn")
themeChanger.addEventListener("click", changeTheme)
function changeTheme(){
    let body = document.querySelector("body")
    body.classList.toggle("dark")
}

async function sendRequest(url, method, data) {
    
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET"
        })
        response = await response.json()
        return response
    }
}

let searchBtn = document.querySelector(".search_Btn")
searchBtn.addEventListener("click", findMovie)

let loader = document.querySelector(".loader")
let massage = document.querySelector(".massage")
let main = document.querySelector("main")



async function findMovie() {
    massage.style.display = "none"
    loader.style.display = "block"
    main.style.display = "block"

    let search = document.getElementsByName("search")[0].value 
    let movie = await sendRequest("http://www.omdbapi.com/", "GET", {
    "apikey": "61131782",
    "t": search
}) 

loader.style.display = "none"

if (movie.Response =="False"){
    massage.innerHTML = movie.Error 
    massage.style.display = "block"
  
} else {
    showMovie(movie)
    searchSimilarMovies(search)
}
  console.log(movie)
} 

 function showMovie(movie){
    let movieIitleH2 = document.querySelector(".movieTitle h2") 
    let movieName = document.querySelector(".movieTitle")
    let movieCard = document.querySelector(".movie")
    let moviePoster = document.querySelector(".movieImage")
    let movieActors = document.querySelector(".movieImage")
    let movieDesc = document.querySelector(".movieDesc")

    movieDesc.innerHTML = ""
    movieIitleH2.innerHTML = movie.Title
    console.log(movieIitleH2)

    movieName.style.display = "block"
    movieCard.style.display = "flex"
    moviePoster.style.backgroundImage = `url('${movie.Poster}')` 

    let movieArray = [ 'imdbRating', 'Actors', 'Year', 'Language', 'Genre', 'Country', 'Runtime', 'Plot'] 

    movieArray.forEach(function(key) {
        // здесь можно использовать переменную key для доступа к текущему элементу массива
        movieDesc.innerHTML =  movieDesc.innerHTML + `<div class="desc">
        <div class="movieLeft"> ${key}</div>
        <div class="movieRight">${movie[key]}</div>
        </div>` 
        
    });
}

searchBtn.addEventListener("click", searchSimilarMovies )
let similarTitle = document.querySelector(".similarTitle")

    async function searchSimilarMovies(title){
        let movieSimilar = await sendRequest("http://www.omdbapi.com/", "GET", {
        "apikey": "61131782",
        "s": title
        })
        
        if (movieSimilar.Response =="False"){
            similarTitle.style.display = "none"
            
        } else {
            showSimilarMovies(movieSimilar)
            similarTitle.style.display = "block"
            let MoviesNumber = document.querySelector(".similarTitle h2")
            MoviesNumber.innerHTML = "Похожих фильмов " + movieSimilar.totalResults
            

        }
        console.log(movieSimilar)

    }
function showSimilarMovies(movies){
    let Array = movies.Search
    let similarMovies = document.querySelector(".similarMovies")
    similarMovies.style.display = "block"
    similarMovies.innerHTML = ""
    console.log(Array)

    Array.forEach(function(similar) {
        
        console.log(similar.Poster);
         
        similarMovies.innerHTML += `  <div class="similarCard" style="background-image: url('${similar.Poster}')">
                <div class="favStar">
                 <img src="./img/favBtn.svg" alt="">

                </div>
                <h3>${similar.Title}</h3>
            </div>` 
        
    });
    
    similarMovies.style.display = "grid"

}
    
    