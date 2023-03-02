#
from flask import Flask     # call flask 

app = Flask(__name__)      # create an app instance

@app.route('/')             # default address
def hello():                # view function
   return "Hello Flask!"  

if __name__ == "__main__": 
   # host is your raspberry IP address, port depends on your setting
   app.run(host="192.168.1.13", port = "8080")
