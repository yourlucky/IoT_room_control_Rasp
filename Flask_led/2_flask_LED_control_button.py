

from flask import Flask, render_template, url_for, redirect 
import RPi.GPIO as GPIO    


GPIO.setmode(GPIO.BCM)  

led_pin_dict = {'red': 14, 'green': 15, 'blue': 18}     # LED pin num
GPIO.setup(led_pin_dict['red'], GPIO.OUT)   
GPIO.setup(led_pin_dict['green'], GPIO.OUT)  
GPIO.setup(led_pin_dict['blue'], GPIO.OUT)   
led_state_dict = {'red':0, 'green':0, 'blue':0}

app = Flask(__name__)              

@app.route('/')                    
def home():                         
    return render_template('index_2.html', led_state_dict = led_state_dict)  

@app.route('/<color>/<int:state>')  # 각각의 LED를 켜고 끄기 위한 주소
def LED_control(color, state):      # 각각의 LED를 켜고 끄기 위한 뷰함수
    led_state_dict[color] = state   # color와 state를 전달받아 LED 현황을 갱신함
    # 참고: color와 state를 전달받는 부분은 index.html 부분에 코드가 있음
    GPIO.output(led_pin_dict['red'], led_state_dict['red'])     
    GPIO.output(led_pin_dict['green'], led_state_dict['green']) 
    GPIO.output(led_pin_dict['blue'], led_state_dict['blue']) 
    # LED 현황을 적용하여 LED를 실제로 켜고 끔
    return redirect(url_for('home'))    # LED 제어가 끝나면 기본주소로 돌아감

@app.route('/all/<int:state>')      # 모든 LED를 한번에 제어하는 주소
def whole_control(state):           # 모든 LED를 한번에 제어하기 위한 뷰함수
    if state is 0:                  # state를 전달받아 LED 현황을 갱신함
        # 참고: state를 전달받는 부분은 index.html 부분에 코드가 있음
        led_state_dict['red']=0     # state가 0이면 LED 현황을 모두 끔으로 해둠
        led_state_dict['green']=0
        led_state_dict['blue']=0 
    elif state is 1: 
        led_state_dict['red']=1
        led_state_dict['green']=1
        led_state_dict['blue']=1 
    # LED 현황을 적용하여 LED를 실제로 켜고 끔
    GPIO.output(led_pin_dict['red'], led_state_dict['red']) 
    GPIO.output(led_pin_dict['green'], led_state_dict['green']) 
    GPIO.output(led_pin_dict['blue'], led_state_dict['blue'])
    return redirect(url_for('home'))      # LED 제어가 끝나면 기본주소로 돌아감

if __name__ == "__main__":  # 웹사이트를 호스팅하여 접속자에게 보여주기 위한 부분
   app.run(host="192.168.1.13", port = "8080")
   # host는 현재 라즈베리파이의 내부 IP, port는 임의로 설정
   # 해당 내부 IP와 port를 포트포워딩 해두면 외부에서도 접속가능