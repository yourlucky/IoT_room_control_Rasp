from flask import Flask     
import RPi.GPIO as GPIO     


GPIO.setmode(GPIO.BCM)      

RED_PIN = 14                     # RED LED   -> Raspberry GPIO 14 
GREEN_PIN = 15                   # GREEN LED -> Raspberry GPIO 15
BLUE_PIN = 18                    # BLUE LED  -> Raspberry GPIO 18 
GPIO.setup(RED_PIN, GPIO.OUT)    # set GPIO.out 
GPIO.setup(GREEN_PIN, GPIO.OUT)  
GPIO.setup(BLUE_PIN, GPIO.OUT)   

app = Flask(__name__)       # Flask라는 이름의 객체 생성

@app.route('/')             # IP:addres:port defualt page (port 8080)
def hello():                # default basic run function
   return "Turn the LED by add url ex)http://192.168.1.13:8080/green_on"    
   
@app.route('/red_on')       # run for IP:addres:port/red_on 
def red_on():               # red LED on
   GPIO.output(RED_PIN, GPIO.HIGH)  
   return "red LED on"              

@app.route('/green_on')     # run for IP:addres:port/green_on
def green_on():             # green LED on 
   GPIO.output(GREEN_PIN, GPIO.HIGH) 
   return "green LED on"    

@app.route('/blue_on')      # run for IP:addres:port/blue_on
def blue_on():              # blue LED on
   GPIO.output(BLUE_PIN, GPIO.HIGH)
   return "blue LED on"    

@app.route('/off')          # run for IP:addres:port/off
def off():                  # all LED off
   GPIO.output(RED_PIN, GPIO.LOW)   
   GPIO.output(GREEN_PIN, GPIO.LOW) 
   GPIO.output(BLUE_PIN, GPIO.LOW) 
   return "all LED off"    

@app.route('/clean_up')            
def clean_up():               
   GPIO.cleanup()
   return "clean up"    

if __name__ == "__main__":  
   # host is your raspberry IP address, port depends on your setting
   app.run(host="192.168.1.13", port = "8080")
   