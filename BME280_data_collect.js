const fs = require("fs");
const BME280 = require("bme280-sensor");
const READ_INTERVAL = 1000; // sensor read interval for a second
const MAX_RETRIES = 3; // max number of retries to read sensor data
const END_COUNTER = 10; // sensor read interval for a second

// configuation obj for BME280
const options = {
  i2cBusNo: 1, // defaults to 1
  i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS(), // defaults to 0x77
};

const bme280 = new BME280(options);

//reasSensorData given by bme280-sensor example
const readSensorData = () => {
  bme280
    .readSensorData()
    .then((data) => {
      // function to convert celsius to fahrenheit
      temp_fahrenheit = data.temperature_C * 1.8 + 32;
      console.log("count :", data_count);
      //console.log("temp_c :", Math.round(data.temperature_C));

      console.log("temp_f :", Math.round(temp_fahrenheit));
      //console.log("before_temp_f :", Math.round(current_fahrenheit));

      console.log("humidity :", Math.round(data.humidity));
      //console.log("before_humidity :", Math.round(current_humidity));
      console.log("------------------------------------");

      error_retries = 0;

      if (
        data_count == 0 ||
        Math.abs(temp_fahrenheit - current_fahrenheit) >= 1 ||
        Math.abs(data.humidity - current_humidity) >= 1
      ) {
        data_count++;
        write_f(file_name, data);
        current_fahrenheit = temp_fahrenheit;
        current_humidity = data.humidity;
      }

      if (data_count < END_COUNTER) {
        setTimeout(readSensorData, READ_INTERVAL);
      }
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
      if (error_retries++ < MAX_RETRIES) {
        setTimeout(readSensorData, READ_INTERVAL);
      } else {
        console.error(
          "BME280 read error: max retries(3) exceeded, Check the connected h/w!"
        );
      }
    });
};

//get current time with format yyyyMMddhhmmss
function get_time() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hh = date.getHours();
  var mm = date.getMinutes();
  var ss = date.getSeconds();
  return `${year}${month < 10 ? "0" + month : month}${
    day < 10 ? "0" + day : day
  }${hh < 10 ? "0" + hh : hh}${mm < 10 ? "0" + mm : mm}${
    ss < 10 ? "0" + ss : ss
  }`;
}

//write data to file
function write_f(file_name, data) {
  // # of data, time, temperature_celsius, temperature_fahrenheit, humidity
  const one_row = `${data_count},${get_time()},${
    Math.round(data.temperature_C * 100) / 100
  },${Math.round(data.temperature_C * 1.8 + 32)},${Math.round(
    data.humidity
  )}\n`;

  fs.appendFileSync(file_name, one_row, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

//create csv file and write header
const head_row = "#,time,temperature_celsius,temperature_fahrenheit,humidity\n";
const file_name = "senor_data" + get_time() + ".csv";
fs.appendFileSync(file_name, head_row, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

//# of data for csv line
let data_count = 0;

// # of consecutive sensor errors, reset when once sensor data is read
let error_retries = 0;

//temperature in fahrenheit-by formula
let current_fahrenheit;
// calculated temperature in fahrenheit by data.temperature_C
let temp_fahrenheit;
//humidity-from sensor
let current_humidity;

bme280
  .init()
  .then(() => {
    console.log("BME280 initialization succeeded");
    readSensorData();
  })
  .catch((err) => console.error(`BME280 initialization failed: ${err} `));
