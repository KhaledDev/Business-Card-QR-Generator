from flask import Flask, request, send_from_directory, redirect, url_for, render_template
from werkzeug.utils import secure_filename
import os

app = Flask("Test")

ALLOWED_EXTENTIONS = ["png", "jpg", "jpeg"]

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENTIONS

@app.route("/upload_img", methods=["POST"])
def upload_img():
    if 'file' not in request.files:
        return "no file part in the request"
    
    file = request.files['file']
    
    if file.filename == '':
        return "no filename"
    
    if file and allowed_file(file.filename):
        file.save("Pog" + file.filename) # we will handle saving here.
        return f"File has been uploaded successfully: {file.filename}"
    else:
        return "File type not supported"

@app.route("/get_img/<filename>", methods=["GET"])
def get_img(filename):
    # Connect to the cloudflare server and get image link.
    return send_from_directory("Backend/", filename)

# run server
app.run(port=5000, debug=True)