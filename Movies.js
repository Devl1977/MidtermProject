// basically using the one from the flags project i used it here.  But we need to do this 3 times?
// maybe there is a way to do this all in one function where i can do specific searches for popular, upcoming and top rated? looking throug notes and searching
// Based on project constraints we're not getting into any other API sections so just going to focus on popular, upcoming and top rated.
// Because i want to make sure that I can maximize my grade and time spent on perfecting this and trying to get a decent grade
// genres absolutely drove me crazy.  i spent the bulk of my hours working on figureing out how this works but i needed two different calls and to match up the ID's between arrays.

async function fetchGenres() {
  try 
  {
      //popularMovies = document.getElementById('');
      const DATA_API_URL = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=8ea5d7168687526a85589a1b60fadec2`;

      // https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1
      //console.log(popularMovies);
      // CALL THE API HERE!
      const response = await fetch(DATA_API_URL);
      if (response.ok)
        {
          const data = await response.json()
          return data.genres;
      } else {
        console.error("something went wrong with the 'fetch'")
      }
    
  } catch(error) 
  {
      console.log(error);
  }  
}
// I found out how to do a function for multiple "Types" for popular, top rated and upcoming....
async function fetchData(type) {
    try 
    {
        //popularMovies = document.getElementById('');
        const DATA_API_URL = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1&api_key=8ea5d7168687526a85589a1b60fadec2`;

        // https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1
        //console.log(popularMovies);
        // CALL THE API HERE!
        const response = await fetch(DATA_API_URL);
        if (response.ok)
          {
            const data = await response.json()
            return data.results;
        } else {
          console.error("something went wrong with the 'fetch'")
        }
      
    } catch(error) 
    {
        console.log(error);
    }  
}


// 5 hours later and im hitting a wall but this is what i have 
function getMatchingGenre(genre_id_array, all_genres) {
  // console.log(all_genres)
  const newArray = [];
  for(const genre_id of genre_id_array){
    
    const matchingGenre = all_genres.find(genre_object => genre_object.id === genre_id)
    newArray.push(matchingGenre.name)
  }
  return newArray;
}

const bannerElement = document.getElementById("banner");
function changeBackgroundImage(event){
  
  const paragraphElement = event.target
  console.log(paragraphElement.getAttribute('data-url'))
  bannerElement.style.backgroundImage = `url(${paragraphElement.getAttribute('data-url')})`
}

function displayMovies(movies, type, genres_array)
{
  const movieContainer = document.getElementsByClassName("grid-container")[0]
  for (const movie in movies) {
     const movieLayer = document.createElement("div");
     movieLayer.setAttribute("class", `movie ${type}`)
     movieLayer.setAttribute("onclick", `changeBackgroundImage(event)`)

      // Image Layer
     const movieImageLayerElement = document.createElement("div");
     movieImageLayerElement.setAttribute("class", "movie-image")
     movieImageLayerElement.setAttribute("style", `background-image: url(https://media.themoviedb.org/t/p/w220_and_h330_face/${movies[movie].poster_path});`);
     movieLayer.append(movieImageLayerElement);


     const movieInfoLayer = document.createElement("div");
     movieInfoLayer.setAttribute("class", "movie-info");
     movieLayer.append(movieInfoLayer);

    // Title
     const movieTitleElement = document.createElement("h1");
     const movieTitleTextElement = document.createTextNode(movies[movie].title);
     movieTitleElement.append(movieTitleTextElement)
     movieInfoLayer.append(movieTitleElement)

      //Year
      const movieYearElement = document.createElement("p");
      const movieYearText = document.createTextNode(new Date(movies[movie].release_date).getFullYear());
      movieYearElement.append(movieYearText)
      movieInfoLayer.append(movieYearElement)

      // Description
     const movieDescription = document.createElement("p");
     const movieDescriptionText = document.createTextNode(movies[movie].overview);
     movieDescription.setAttribute("data-url", `https://media.themoviedb.org/t/p/w220_and_h330_face/${movies[movie].poster_path}`);
     movieDescription.append(movieDescriptionText)
     movieImageLayerElement.append(movieDescription)

     //Genres
     const allGenreNamesArray = getMatchingGenre(movies[movie].genre_ids, genres_array)
     const movieGenresLayer = document.createElement("p");
  
     for(const genre of allGenreNamesArray){
      movieGenresLayer.innerHTML += `${genre} | `
     }
     movieInfoLayer.append(movieGenresLayer)


     movieContainer.append(movieLayer)

    //  console.log(movies[movie].genre_ids)
     
  }
}

// im so tired!!!

(async () => {

  const popularMovies = await fetchData("popular");
  const upcomingMovies = await fetchData("upcoming");
  const topRatedMovies = await fetchData("top_rated")
  console.log('topRatedMovies: ', topRatedMovies)
  const movieGenres = await fetchGenres();
  console.log('genres: ', movieGenres)

  displayMovies(upcomingMovies, "upcoming", movieGenres)
  displayMovies(popularMovies, "popular", movieGenres)
  displayMovies(topRatedMovies, "top_rated", movieGenres)


})();


const popularButton = document.getElementById("popular");
const upcomingButton = document.getElementById("upcoming");
const topRatedButton = document.getElementById("top_rated");

const movieTypeHeadline = document.getElementById("movie-type");

popularButton.addEventListener("click", function(event){
  console.log(document.getElementsByClassName("popular"))
  document.querySelector(".movie").style.display = "none";
  document.querySelector(".popular").style.display = "block";
  movieTypeHeadline.innerHTML = event.target.id
})
upcomingButton.addEventListener("click", function(event){
  console.log(document.getElementsByClassName("upcoming"))
  document.querySelector(".movie").style.display = "none";
  document.querySelector(".upcoming").style.display = "block";
  movieTypeHeadline.innerHTML = event.target.id
})

topRatedButton.addEventListener("click", function(event){
  console.log(document.getElementsByClassName("top_rated"))
  document.querySelector(".movie").style.display = "none";
  document.querySelector(".top_rated").style.display = "block";
  movieTypeHeadline.innerHTML = event.target.id
})




//poster_path
// https://media.themoviedb.org/t/p/w220_and_h330_face
// year released first_air_date
//realease_date
// title
// description
// genre

// It's 3am..  I'm so done i just need to work on some CSS.. i don't think im going to make the navigation bar i can't keep my eyes open.

