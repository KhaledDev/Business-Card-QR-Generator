from flask import Flask, request, send_from_directory, redirect, url_for, render_template, jsonify
from werkzeug.utils import secure_filename
import os
import firebase
import json
import base64
import io
from PIL import Image
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
    '''
    print("attempting")
    if 'file' not in request.files:
        return "no file part in the request"

    file = request.files.get('file')
    print("got file part " + file.filename)
    
    if file == None:
        return "no file was recived in the request"
    
    if file.filename == '':
        return "no filename"
    if file and allowed_file(file.filename):
        print("file allowed")
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
    '''
    
    data = request.get_json()
    base64_image = data.get("image")
    
    if not base64_image:
        return jsonify({"error": "No image provided"}), 400
    
    try:
        # decode the base64 string to bytes
        image_data = base64.b64decode(base64_image)
        
        # Convert bytes data to an image
        image = Image.open(io.BytesIO(image_data))
        
        # Save the image to a temporary file
        image.save("temp.png")
        
        # Upload the image to Firebase Storage
        storage.child(_business_name + "/" + "temp.png").put("temp.png")
        
        
        # Create a JSON object that will be also sent to the storage with the image and it will have the image link.
        # TODO: Test the JSON stuff.
        
        _size = os.path.getsize("temp.png")
        _image_link = storage.child(_business_name + "/" + "temp.png").get_url(None)
        
        JSON_obj = {
            "Name" : "temp.png",
            "Business" : _business_name,
            "Type" : "image/png",
            "Size" : _size,
            "image_link": _image_link,
        }
        
        _sendable_json : str
        
        os.remove("temp.png")
        
        with open(_business_name + "-" + "temp" + '.json', 'w', encoding='utf-8') as f:
            json.dump(JSON_obj, f, ensure_ascii=False, indent=4)
            
        
        # Read back the JSON file as a string for _sendable_json
        with open(_business_name + "-" + "temp" + '.json', 'r', encoding='utf-8') as f:
            fileContent = f.read()
            _sendable_json = json.loads(fileContent)
        
        print("Created JSON file")
        
        storage.child(_business_name + "/" + "temp.json").put(_business_name + "-" + "temp" + '.json')
        
        os.remove(_business_name + "-" + "temp.json")
        
        return jsonify({"message": "File has been uploaded successfully", "file": _sendable_json}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

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