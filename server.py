from flask import Flask, request, jsonify, render_template
from bazarek.main import find_bazarki, compare_bazarki

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", flask_token="Hello   world")


@app.route("/bazarki")
def bazarki():
    return jsonify(find_bazarki())


@app.route("/compare", methods=["POST"])
def compare():
    if request.method == "POST":
        return jsonify(compare_bazarki(request.json["text"]))


if __name__ == "__main__":
    app.run()
