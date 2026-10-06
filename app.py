from flask import Flask, render_template, request, jsonify
from ocr_provider import extract_text

import os

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['OCR_API_KEY'] = os.getenv('OCR_API_KEY')


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/extract", methods=["POST"])
def extract():
    file = request.files["file"] 

    text = extract_text(file)

    return jsonify({
        "text": text
    })

if __name__ == "__main__":
    app.run(debug=True)