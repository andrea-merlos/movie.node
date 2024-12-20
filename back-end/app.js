const path = require("path");
const express = require("express");
const app = express();
const getMovies = require("./utils/movies");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../front-end")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/html/index.html"));
});

app.get("/movie", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "Something went wrong",
    });
    return;
  }

  getMovies(req.query.search, (error, data) => {
    if (error) {
      res.send({
        error: "Something went wrong",
      });
      return;
    }
    res.send(data);
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrea Merlos",
    errorMessage: "Page not found.",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on" + PORT);
});
