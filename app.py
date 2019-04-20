import os


# We'll render HTML templates and access data sent by GET
# using the request object from flask. jsonify is required
# to send JSON as a response of a request
from flask import Flask, render_template, request, jsonify, url_for, redirect

from bilinear import bilinear

app = Flask(__name__)

# This route will show a form to perform an AJAX request
# jQuery is loaded to execute the request and update the
# value of the operation
@app.route('/')
def root():
    #return render_template('index.html')
    #return app.send_static_file('static/index.html')
    return redirect(url_for('static', filename='index.html'))

# Route that will process the AJAX request and return the
# result as a proper JSON response (Content-Type, etc.)
@app.route('/_get_diff')
def get_diff():
    lon = request.args.get('lon', -121.0, type=float)
    lat = request.args.get('lat', 47.0, type=float)
    return jsonify(result=bilinear(lon,lat))

# How to run the main Flask app in Cloud9
if __name__ == '__main__':
    app.run(
        host=os.getenv('IP', '0.0.0.0'),
        port = int(os.getenv('PORT', 8080)),
        debug=True
    )

# otherwise:
# app.run(debug=True)
