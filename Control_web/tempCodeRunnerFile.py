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
    if state is 0 or state is 1:                            
        for color_idx in ['red', 'green', 'blue']:          
            thread_state[color_idx] = False                
            GPIO.output(led_pin_dict[color_idx], state)     
    elif state is 2:                                        
        for color_idx in ['red', 'green', 'blue']:          
            thread_state[color_idx] = True                   
    return redirect(url_for('home'))   