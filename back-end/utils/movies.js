const request = require("request");

function getMovie(movieSearch, callback) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movieSearch
  )}&include_adult=false&language=en-US&page=1`;

  const options = {
    url,
    json: true,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjgwMGQzZjg0OWJlYWM2ZmU0MDMxN2JjMTUwNDZkZCIsIm5iZiI6MTczNDQ2MDExOC4wMzksInN1YiI6IjY3NjFjMmQ2NTNiM2IxMzhlODI1NDlmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DoMziz0ubbHVxG6z8svljiC45mNHugNkNnRpDqoAfiE",
    },
  };

  request(options, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.statusCode != 200) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, response);
    }
  });
}

module.exports = getMovie;
