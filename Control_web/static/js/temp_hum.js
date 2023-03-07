// const csvtojson = require("csvtojson");

// const path = require("path");

// var pathObj = path.parse(__filename);
// var addObj = "/data/sensor.csv";

// pathObj = path.join(pathObj.dir, addObj);

// const csvfilepath = pathObj;
// console.log(pathObj);

// csvtojson()
//   .fromFile(csvfilepath)
//   .then((jsonObj) => {
//     console.log(jsonObj);
//   });

// const csvtojson = require("csvtojson");
// const csvfilepath = "data/sensor_data.csv";

// csvtojson()
//   .fromFile(csvfilepath)
//   .then((jsonObj) => {
//     console.log(jsonObj);
//   });

const fs = require("fs");
const csv = require("csv-parser");
const results = [];

const readCSVFile = () => {
  fs.createReadStream("sensor.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      for (const result of results) {
        console.log(
          `Humid:${result.humidity} Temp:${result.temperature_celsius}`
        );
      }
    });
};

readCSVFile();
