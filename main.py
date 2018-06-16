from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import dock

#### the app doesn't scale ###
## but it scales more than enough for our purposes for now ## 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'unicorn'
socketio = SocketIO(app)
files = {}
characters = {}

@socketio.on('disconnect')
def disconnect():
	print('a user disconnected')

@socketio.on('message')
def handleMessage(msg):
	send(msg, broadcast=True)

@socketio.on('update')
def update(character):
	characters[character['uid']] = character
	emit("update", character, broadcast=True)

@socketio.on('drop')
def drop(filedict):
	files[filedict['key']] = filedict
	emit("drop", filedict, broadcast=True)

@socketio.on('collect')
def collect(keydict):
	res = dock.run(files[keydict['filekey']]['text'])
	characters[keydict['uid']]['heart'] = res['heartexists']
	print(characters[keydict['uid']]['heart'])
	emit("update", characters[keydict['uid']], broadcast=True)
	

@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	socketio.run(app, host='0.0.0.0', port=80, debug=False)
