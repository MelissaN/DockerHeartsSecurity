from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit, join_room, leave_room, request
import dock
from character import Character

#### the app doesn't scale ###
## but it scales more than enough for our purposes for now ## 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'unicorn'
socketio = SocketIO(app)

characters = {}
stages = {}

@socketio.on('connect')
def connect():


if __name__ == '__main__':
	socketio.run(app, host='0.0.0.0', port=80, debug=False)