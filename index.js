let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");


let getMovie = () => {
  let movieName = movieNameRef.value;
  
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
    return;
  }
  
  let url = `https://api.themoviedb.org/3/search/movie?api_key=72aa5b9b9ee9eb6b01664274b78f344d&query=${movieName}`;
  

  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      return resp.json();
    })
    .then((data) => {
      //if movie exists in the database
      if (data.Response == "True") {
        result.innerHTML = `
          <div class="info">
              <img src=${data.Poster} class="poster">
              <div>
                  <h2>${data.Title}</h2>
                  <div class="rating">
                      <img src="star-icon.svg">
                      <h4>${data.imdbRating}</h4>
                  </div>
                  <div class="details">
                      <span>${data.Rated}</span>
                      <span>${data.Year}</span>
                      <span>${data.Runtime}</span>
                  </div>
                  <div class="genre">
                      <div>${data.Genre.split(",").join("</div><div>")}</div>
                  </div>
              </div>
          </div>
          <h3>Plot:</h3>
          <p>${data.Plot}</p>
          <h3>Cast:</h3>
          <p>${data.Actors}</p>
        `;
      } else {
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })
    .catch((error) => {
      //if an error occurs
      console.error(error);
      result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
    });
};

searchBtn.addEventListener("click", getMovie);
