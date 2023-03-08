# Raspberry_pi 

<br/>
Video Link : https://youtu.be/7tV5KoYnHwk <br/>
<br/>
1) Control LED on the Web by python flask <br/>

  * From Raspberry BME280 <br/>
    : Get room temperature, humidity <br/>
    : Control LED <br/>
  * From Web API<br/>
    : Get outside temperature, weather <br/>
  * Others <br/>
    : To-do list <br/>
    : Greeting message <br/>
    
<img width="1607" alt="Room_iot" src="https://user-images.githubusercontent.com/74134434/223565123-eb1c1202-06da-4a74-93b7-6ff18d83d6e5.png">



2) Temperature/Humidity (BME220) Sensor  by javascript
  
<img width="753" alt="Screenshot 2023-03-02 at 17 20 21" src="https://user-images.githubusercontent.com/74134434/222585795-c4f4cfd6-8ac9-4170-97a8-f1f89da0a835.png">


</br>
</br>
#How to Run </br>

Run BME280 Sensor</br>

 * Get data with the accumulated </br>
        command: node temp_humidity/BME280_data_collect.js </br>
        output: sensor_data20230307163611.csv </br>


* Get data for the Web (specific format for web) </br>
      Command: node temp_humidity/web_BME280.js </br>
      output: data.csv

Run HTML </br>
 * With the BME280 sensor </br>
       Command: python3 Control_web/Room_IoT_LED_Sensor.py </br>
       type URL on the (chrome)Browser –URL on 70 line (your Raspberry IP) </br>
       # tip: Change any random value for the port number when you get the port error. </br>

 * Without the sensor </br>
       Command: python3 Control_web/Room_IoT_LED.py </br>
       type URL on the (chrome)Browser –URL on 70 line (your Raspberry IP) </br>
