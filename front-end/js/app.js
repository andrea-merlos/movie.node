//selecting form and input elements from the DOM
const formElement = document.querySelector("#form");
const searchInput = document.querySelector("#search");
const submitElement = document.querySelector("#submit");
const resultContainer = document.querySelector(".result");
const resetButton = document.getElementById("reset");

//adding event listener to my reset buttton
resetButton.addEventListener("click", function () {
  console.log("Form reset triggered");
  searchInput.value = ""; //clear search input field
  resultContainer.innerHTML = ""; // cleearr results container
});

//defining an asynchronous functtion tto fetch movie data
async function getMovie(movieName) {
  try {
    //make an http  request to /movie endpoint with search query
    const response = await fetch(`/movie?search=${movieName}`);
    if (!response.ok) {
      //show an alert if the response status is not ok
      alert("There was a problem");
      return;
    }

    //parse response as JSON and return the data
    const data = await response.json();
    return data;
  } catch {
    //log error message if the fetch request fails
    console.error("There was a problem");
  }
}

//added event listener to tthe forrm element forr the sumbmit event
formElement.addEventListener("submit", async (event) => {
  event.preventDefault(); //rpreveent thee default form submission beehavior
  const data = await getMovie(searchInput.value); //call the getmovie functtion with the userrs input value
  console.log(data.body.results); //log movie results
  data.body.results.forEach((movie) => {
    resultContainer.innerHTML += `
            <div>
            <img src=https://image.tmdb.org/t/p/w200${movie.poster_path}/>
                <p class="">${movie.title}</p>
            </div>
        `;
  });
});
