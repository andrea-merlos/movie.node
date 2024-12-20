const formElement = document.querySelector("#form");
const searchInput = document.querySelector("#search");
const submitElement = document.querySelector("#submit");
const resultContainer = document.querySelector(".result");
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function () {
  console.log("Form reset triggered");
  searchInput.value = "";
  resultContainer.innerHTML = "";
});

async function getMovie(movieName) {
  try {
    const response = await fetch(`/movie?search=${movieName}`);
    if (!response.ok) {
      alert("There was a problem");
      return;
    }

    const data = await response.json();
    return data;
  } catch {
    console.error("There was a problem");
  }
}

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = await getMovie(searchInput.value);
  console.log(data.body.results);
  data.body.results.forEach((movie) => {
    resultContainer.innerHTML += `
            <div>
            <img src=https://image.tmdb.org/t/p/w200${movie.poster_path}/>
                <p class="">${movie.title}</p>
            </div>
        `;
  });
});
