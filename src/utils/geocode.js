const request = require("request");

const geocode1 = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibW9oaXRuYXlhbCIsImEiOiJja290b3JvcWswZGVnMnZsZ3g5aDNwYWVtIn0.RJkolIChTukkwIAQcWp5Pg";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the internet", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode1;
