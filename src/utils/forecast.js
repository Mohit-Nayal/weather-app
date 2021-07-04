const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4d582c96f83dc0901059bf7fd94ab169&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          response.body.current.temperature +
          " degrees out. But feels like " +
          response.body.current.feelslike +
          " degrees."
      );
    }
  });
};

module.exports = forecast;

// const request = require("request");

// const forecast = (latitude, longitude, callback) => {
//   const url =
//     "http://api.weatherstack.com/current?access_key=4d582c96f83dc0901059bf7fd94ab169&query=" +
//     latitude +
//     "," +
//     longitude +
//     "&units=f";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to weather service!", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find location", undefined);
//     } else {
//       callback(
//         undefined,
//         "It is currently " +
//           response.body.current.temperature +
//           " degrees out. But feels like " +
//           response.body.current.feelslike +
//           " degrees."
//       );
//     }
//   });
// };

module.exports = forecast;
