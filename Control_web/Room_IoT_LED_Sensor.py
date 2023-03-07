from flask import Flask, render_template, url_for, redirect 
import RPi.GPIO as GPIO    


import time                 # add time module
import threading            # add threading module

import pandas as pd

GPIO.setmode(GPIO.BCM)  

led_pin_dict = {'red': 14, 'green': 15, 'blue': 18}     # LED pin num
GPIO.setup(led_pin_dict['red'], GPIO.OUT)   
GPIO.setup(led_pin_dict['green'], GPIO.OUT)  
GPIO.setup(led_pin_dict['blue'], GPIO.OUT)   

thread_state = {'red':0, 'green':0, 'blue':0} # set each thread state 0->inactive, 1->active
app = Flask(__name__)        


# when thread_state[color] =1 , LED turn it on/off for every second
def LED_blink_core():                      
    past_time = int(time.time())                # past time
    led_state_dict = {'red': 0, 'green': 0, 'blue': 0}  # current LED statusLED
    while True:                                 # While loop
        current_time = int(time.time())         # current time
        if current_time - past_time >= 1.0:        # run every second 
            for color_idx in ['red', 'green', 'blue']: # for each color
                led_state_dict[color_idx] = not led_state_dict[color_idx]   # change LED stautus
                if thread_state[color_idx]:       # when thread_state[color] =1
                    GPIO.output(led_pin_dict[color_idx], led_state_dict[color_idx])    # update LED status with new changed value
            past_time = current_time            # update past time

thread = threading.Thread(target=LED_blink_core, args=()) 

# run thread
thread.start()
    
@app.route('/')                                 
def home():
    data=pd.read_csv('data.csv')       
    #return render_template('index.html', tables=[data.to_html()], titles=[''])
    return render_template('merge.html', tables=[data.to_html()], titles=[''])
    #return render_template('merge.html')  

@app.route('/<color>/<int:state>')           # for each LED trun on/off
def LED_control(color, state):                
    thread_state[color] = False               
    GPIO.output(led_pin_dict[color], state)   
    return redirect(url_for('home'))          

@app.route('/<color>')                        # for each LED blink
def LED_blink(color):                         
    thread_state[color] = True                
    return redirect(url_for('home'))          

@app.route('/all/<int:state>')                # for all LED turn on/off and blink
def whole_control(state):                    
    if state == 0 or state == 1:                            
        for color_idx in ['red', 'green', 'blue']:          
            thread_state[color_idx] = False                
            GPIO.output(led_pin_dict[color_idx], state)     
    elif state == 2:                                        
        for color_idx in ['red', 'green', 'blue']:          
            thread_state[color_idx] = True                   
    return redirect(url_for('home'))                        

if __name__ == "__main__":  
   # host is your raspberry IP address, port depends on your setting
   app.run(host="192.168.1.13", port = "8080")
   