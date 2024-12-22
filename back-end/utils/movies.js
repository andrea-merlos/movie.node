const request = require("request"); //import reequeest library tto make hTTP request

//functiton to fetch moviee data based on a search  query
function getMovie(movieSearch, callback) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movieSearch
  )}&include_adult=false&language=en-US&page=1`;
  //contruct the api url using  thee search query
  //disables adult content with include_adult=false
  //sets language  to english and retrieves tthe first page of results

  const options = {
    url, //API endpoint URL
    json: true, //parses thee JSON responee into JS object
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjgwMGQzZjg0OWJlYWM2ZmU0MDMxN2JjMTUwNDZkZCIsIm5iZiI6MTczNDQ2MDExOC4wMzksInN1YiI6IjY3NjFjMmQ2NTNiM2IxMzhlODI1NDlmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DoMziz0ubbHVxG6z8svljiC45mNHugNkNnRpDqoAfiE",
    },
  };

  //makee the HTTP request with thee specified options
  request(options, (error, response) => {
    if (error) {
      //if an errorr occurs durring the request invoke the callback with a error message
      callback("Unable to connect to weather service!", undefined);
    } else if (response.statusCode != 200) {
      //if the response status is not 200 invokee the callback with an error message
      callback("Unable to find location", undefined);
    } else {
      //if no errror invokee the callback with the parsed movie data
      callback(undefined, response);
    }
  });
}

module.exports = getMovie;
//export thee function so it can be  used in other modules
