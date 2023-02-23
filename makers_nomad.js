const fs = require("fs");
const BME280 = require("bme280-sensor");

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
      // temperature_C, pressure_hPa, and humidity are returned by default.
      // used pre-made function to convert celsius to fahrenheit
      data.temperature_F = BME280.convertCelciusToFahrenheit(
        data.temperature_C
      );

      //print data to console-relieve from comment to see
      console.log(data.temperature_C);
      console.log(data.humidity);

      //first data
      //# of iteration for csv line
      let iteration = 1;
      //temperature in celsius-from sensor
      let current_celsius = data.temperature_C;
      //temperature in fahrenheit-by formula
      let current_fahrenheit = Math.round(data.temperature_F);
      //humidity-from sensor
      let current_humidity = Math.round(data.humidity);
      //current time
      let current_time;

      let update_celsius; //update_temperature_celsius;
      let update_fahrenheit; //update_temperaute_fahrenheit;
      let update_humidity; //update_humidity;

      while (iteration < 10) {
        //update_temperaute_celsius;
        update_celsius = Math.random() + 20;
        //update_temperaute_fahrenheit;
        update_fahrenheit = Math.round(update_celsius * 1.8 + 32);
        //update_humidity;
        update_humidity = Math.round(Math.random() * 3 + 70);
        current_time = get_time();

        //if temp diff or humdity diff more than 1 F, save data
        if (
          Math.abs(update_fahrenheit - current_fahrenheit) >= 1 ||
          Math.abs(update_humidity - current_humidity) >= 1
        ) {
          //math.abs
          write_f(
            file_name,
            iteration,
            current_time,
            update_celsius,
            update_fahrenheit,
            update_humidity
          );
          iteration++;
        }
        //update sensor data
        current_celsius = update_celsius;
        current_fahrenheit = update_fahrenheit;
        current_humidity = update_humidity;

        sleep(1001);
      }

      //console.log(`data = ${JSON.stringify(data, null, 2)}`);
      //setTimeout(readSensorData, 2000);
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
      setTimeout(readSensorData, 2000);
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
  return (
    "" +
    year +
    (month < 10 ? "0" + month : month) +
    (day < 10 ? "0" + day : day) +
    (hh < 10 ? "0" + hh : hh) +
    (mm < 10 ? "0" + mm : mm) +
    (ss < 10 ? "0" + ss : ss)
  );
}

//sleep function-delay ex-2s
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}
//write data to file
function write_f(
  file_name,
  iteration,
  time,
  temperature_celsius,
  temperature_fahrenheit,
  humidity
) {
  temperature_celsius = Math.round(temperature_celsius * 100) / 100;
  one_row =
    iteration +
    "," +
    time +
    "," +
    temperature_celsius +
    "," +
    temperature_fahrenheit +
    "," +
    humidity +
    "\n";

  fs.appendFileSync(file_name, one_row, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

//create csv file and write header
head_row = "#,time,temperature_celsius,temperature_fahrenheit,humidity\n";
file_name = "senor_data" + get_time() + ".csv";
fs.appendFileSync(file_name, head_row, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

bme280
  .init()
  .then(() => {
    console.log("BME280 initialization succeeded");
    readSensorData();
  })
  .catch((err) => console.error(`BME280 initialization failed: ${err} `));
