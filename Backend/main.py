from flask import Flask

app = Flask("Test")

@app.route("/upload_img", methods=["POST"])
def upload_img():
    # Connect to the cloudflare server and upload the image
    pass

@app.route("/get_img", methods=["GET"])
def get_img():
    # Connect to the cloudflare server and get image link.
    pass

# run server
app.run(port=5000, debug=True)