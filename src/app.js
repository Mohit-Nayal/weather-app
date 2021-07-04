const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for express config
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPathDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App Home",
    creator: "Mohit Nayal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App About",
    about: "About the weather app",
    creator: "Mohit Nayal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App HELP",
    message: "Let us know if you need help with the weather app",
    creator: "Mohit Nayal",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello Express!");
// });

// app.get("/help", (req, res) => {
//   res.send("Help Page!!");
// });

// app.get("/about", (req, res) => {
//   res.send("About Page");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error }); //short hand property
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: "Delhi",
  //   address: req.query.address,
  // });
});

// query string for products

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "HELP ARTICLE NOT FOUND",
    creator: "Mohit Nayal",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "PAGE NOT FOUND",
    creator: "Mohit Nayal",
  });
});
//to start the server
app.listen(3000, () => {
  console.log("Server is up on port 3000!!");
});
