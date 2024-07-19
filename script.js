
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
        
    /* Array.forEach((similar) => {
        
        console.log(similar.Poster);
        const exists = favs.some( fav => fav.imdbid == similar.imdbID);
        let favClass = ""
        if(exists) {
            favClass = "active"
        } */
         
        similarMovies.innerHTML += `  <div class="similarCard" style="background-image: url('${similar.Poster}')">
                <div class="favStar" data-poster = ${similar.Poster} data-title = ${similar.Title} data-imdbid = ${similar.imdbID} >
                 <img src="./img/favBtn.svg" alt="">

                </div>
                <h3>${similar.Title}</h3>
            </div>` 
        
    });
    
    similarMovies.style.display = "grid"
    addactivateFavbtns()

}

    function addactivateFavbtns(){
        document.querySelectorAll(".favStar").forEach((Button) => {
            Button.addEventListener('click', addToFav)
        })
    }
   /*  let favs = localStorage.getItem('favs')
    if (!favs) {
        favs = []
        localStorage.setItem('favs', JSON.stringify(favs))
    }
    else{
        favs = JSON.parse(favs)
    } */
    function addToFav(){
        let Button = event.currentTarget /* содержит в себе причину вызова фунции. какой из элементов вызвал функцию  */
        console.log(Button)
        let poster = Button.getAttribute('data-poster')
        let tittle = Button.getAttribute('data-title')
        let imdbid = Button.getAttribute('data-imdbid')
        Button.classList.toggle('active')
       
       /*  const exists = favs.some(fav => fav.imdbid == imdbid);
        
        if (exists) {
            //удалить из LS
            favs = favs.filter(fav => fav.imdbid !== imdbid);
            localStorage.setItem('favs', JSON.stringify(favs))

            Button.classList.remove('active')
        } else {
            //Добавить в LS
            let fav = {imdbid, tittle, poster}
            favs.push(fav)
            
            localStorage.setItem('favs', JSON.stringify(favs))

            Button.classList.add('active')
        }
 */
        
    }

   /*  Объяснение кода
    document.querySelectorAll(".favStar"): выбирает все элементы с классом favStar и возвращает NodeList.
    .forEach((favBtn) => {...}): итерируется по каждому элементу в NodeList. В этом контексте favBtn представляет текущий элемент из NodeList.
    favBtn.addEventListener('click', addToFav): для текущего элемента (favBtn) добавляется обработчик события click, который вызывает функцию addToFav.
    Когда событие клика происходит, браузер передает объект события (event) в функцию addToFav. Внутри addToFav вы можете получить целевой элемент (элемент, на который кликнули) через event.target. */