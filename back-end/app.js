const path = require("path"); //  imports path module to handle and manipulate file paths
const express = require("express"); //imports express framwork for building web  applications
const app = express();
const getMovies = require("./utils/movies"); //imports the getMovies function

const PORT = process.env.PORT || 3000; //define port number

app.use(express.static(path.join(__dirname, "../front-end"))); // serve files from specific directory

app.get("/", (req, res) => {
  //define route for the root URL
  res.sendFile(path.join(__dirname, "../front-end/html/index.html")); // sends file from front-end folder to the client
});

app.get("/movie", (req, res) => {
  //define  a  route for fetching  movie data
  if (!req.query.search) {
    res.send({
      error: "Something went wrong", //if the search query parameterr is missing send an errorr response
    });
    return; //exit function
  }

  getMovies(req.query.search, (error, data) => {
    //call function with seearch query
    if (error) {
      res.send({
        error: "Something went wrong", // if an error happens send an error message
      });
      return;
    }
    res.send(data); //send the movie data as the reesponse
  });
});

app.get("*", (req, res) => {
  //deeefine catch-all route for undefined routes(404)
  res.render("404", {
    //render a 404 eerror message
    title: "404", //page title
    name: "Andrea Merlos",
    errorMessage: "Page not found.", //error message
  });
});

app.listen(PORT, () => {
  //start tthe servere and listen on the specifide port
  console.log("Server is running on" + PORT); // log the eport the server is running on
});
