from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
	return "Hello world!"

@app.route('/user/<username>')
def show_user_profile(username):
	return 'User %s' % username

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5005)