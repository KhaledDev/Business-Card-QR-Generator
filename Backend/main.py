from flask import Flask, request, send_from_directory, redirect, url_for, render_template
from werkzeug.utils import secure_filename
import os
import firebase
import json
import threading # Will be used later on to handle cached images.

app = Flask("Test")

ALLOWED_EXTENTIONS : list[str] = ["png", "jpg", "jpeg"]

FIREBASE_CONFIG : dict = {
    "apiKey": os.getenv("FIREBASE_API"),
    "authDomain": "card-nfc.firebaseapp.com",
    "projectId": "card-nfc",
    "databaseURL": "gs://card-nfc.appspot.com",
    "storageBucket": "card-nfc.appspot.com",
    "messagingSenderId": os.getenv("FIREBASE_SENDER_ID"),
    "appId": os.getenv("FIREBASE_APP_ID")
}

cached_Images : dict = {} # TODO: Implement caching to lower the amount of Request to firebase

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
        
        # Create a JSON object that will be also sent to the storage with the image and it will have the image link.
        # TODO: Test the JSON stuff.
        JSON_obj = {
            "Name" : file.filename,
            "Business" : _business_name,
            "Type" : file.content_type,
            "Size" : file.content_length,
            "image_link": storage.child(_business_name + "/" + file.filename).get_url(None),
        }
        
        with open(_business_name + "-" + file.filename + '.json', 'w', encoding='utf-8') as f:
            json.dump(JSON_obj, f, ensure_ascii=False, indent=4)
            f.close()
        
        print("Created JSON file")
        
        storage.child(_business_name + "/" + file.filename.replace(".png","") + ".json").put(_business_name + "-" + file.filename + '.json')
        
        os.remove(_business_name + "-" + file.filename + '.json')
        
        return f"File has been uploaded successfully: {file.filename}"
    else:
        return "File type not supported"

@app.route("/get_img/<_business_name>/<_filename>", methods=["GET"])
def get_img(_business_name,_filename):
    # TODO: Check if the requested filename and business are in the cache
    #       If not then call a request and cache it. If they are cached then return the JSON Object.
    # THIS DOES NOT WORK.
    # UPDATE THIS WORKS!!!!
    storage.child(_business_name + "/" + _filename).download(_filename)
    
    json_details : str
    
    with open(_filename, 'r', encoding='utf-8') as f:
        json_details = f.read()
        f.close()
    
    print(json_details)
    
    os.remove(_filename)
    
    return json_details # don't really like it this way much. But it works.

def handle_cached():
    pass # TODO: Implement cache handling

# run server
app.run(port=5000, debug=True)