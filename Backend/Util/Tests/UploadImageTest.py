import requests

def upload_img():
    with open("C:\\Users\\khali\\OneDrive\\Documents\\Long-term-Projects\\NFC_Business_App\\Backend\\test.png", "rb") as f:
        img_data = f
        r = requests.post("http://127.0.0.1:5000/upload_img", files={"file": img_data})
        print(r.text)

upload_img()