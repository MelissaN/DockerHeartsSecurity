from flask import Flask, render_template, request
from interactive import *
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
	user = request.form.get('user')
	pw = request.form.get('password')
	print("signup pw: {}".format(pw))
	create_user(user, pw)
	uid = get_user_id(user, pw)
	bundle = get_bundle() 
	return render_template('map.html', id = uid, files = bundle)

@app.route('/login', methods=['POST'])
def login():
	user = request.form.get('user')
	pw = request.form.get('password')
	print("longin pw: {}".format(pw))
	uid = get_user_id(user, pw)
	print("get user login: {}".format(uid))
	if uid == -1:
		return render_template('index.html', message="invalid login")
	return render_template('map.html', id = uid, files = get_bundle())

@app.route('/map', methods=['POST'])
def map():
	uid = request.form.get('id')
	if uid == -1:
		return render_template('index.html', message="must be logged in")
	return render_template('map.html', files = get_bundle(), id=uid)

@app.route('/drop', methods=['POST'])
def drop():
	uid = request.form.get('id')
	print("drop uid: {}".format(uid))
	if uid == -1:
		return render_template('index.html', message="must be logged in")
	if 'streetfile' not in request.files or request.files['streetfile'].filename == '':
		return render_template('map.html', message = 'must load a file to drop')
	streetfile = request.files['streetfile']
	fn = streetfile.filename
	print("fn {}, uid: {}".format(fn, uid))
	ret = request.form.get('location')
	update_user_loc(uid, ret)
	create_file(fn, uid)
	streetfile.save('/home/dockerhearts/'+modify(fn, uid))
	return render_template('map.html', files=get_bundle(), id=uid)

@app.route('/collect', methods=['POST'])
def collect():
	uid = request.form.get('id')
	if uid == None:
		return render_template('index.html', message='must be logged in')
	file_id = request.form.get('file_id')
	if (file_id == 2):
		return render_template('index.html', message="damage detected. you are dead")
	return render_template('map.html', message="successfully collected {}, no damage".format(file_id), id=uid, files=get_bundle())

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=80, debug=True)

