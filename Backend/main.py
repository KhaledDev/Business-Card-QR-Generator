from flask import Flask, request, send_from_directory, redirect, url_for, render_template
from werkzeug.utils import secure_filename
import os
import firebase

app = Flask("Test")

ALLOWED_EXTENTIONS = ["png", "jpg", "jpeg"]

FIREBASE_CONFIG = {
    "apiKey": os.getenv("FIREBASE_API"),
    "authDomain": "card-nfc.firebaseapp.com",
    "projectId": "card-nfc",
    "databaseURL": "gs://card-nfc.appspot.com",
    "storageBucket": "card-nfc.appspot.com",
    "messagingSenderId": os.getenv("FIREBASE_SENDER_ID"),
    "appId": os.getenv("FIREBASE_APP_ID")
}

# Initalize the firebase app
firebase_app = firebase.initialize_app(FIREBASE_CONFIG)

storage = firebase_app.storage()

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENTIONS

@app.route("/<_business_name>/upload_img", methods=["POST"])
def upload_img(_business_name):
    if 'file' not in request.files:
        return "no file part in the request"
    
    file = request.files['file']
    
    if file.filename == '':
        return "no filename"
    
    if file and allowed_file(file.filename):
        #file.save(file.filename) # we will handle saving here.
        storage.child(_business_name + "/" + file.filename).put(file)
        return f"File has been uploaded successfully: {file.filename}"
    else:
        return "File type not supported"

@app.route("/get_img/<_business_name>/<_filename>", methods=["GET"])
def get_img(_business_name,_filename):
    # Connect to the google firebase server and get image link.
    img_link = storage.child(_business_name + "/" + _filename).get_url(None)
    return redirect(img_link) # don't really like it this way much. But it works.

# run server
app.run(port=5000, debug=True)