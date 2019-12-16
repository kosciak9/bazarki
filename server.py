import os
from flask import Flask, request, jsonify, render_template, send_from_directory
from bazarek.main import find_bazarki, compare_bazarki

app = Flask(__name__, static_folder="client/build")

# Serve React App
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists("client/build/" + path):
        return send_from_directory("client/build", path)
    else:
        return send_from_directory("client/build", "index.html")


@app.route("/bazarki")
def bazarki():
    return jsonify(find_bazarki())


@app.route("/compare", methods=["POST"])
def compare():
    if request.method == "POST":
        return jsonify(compare_bazarki(request.json["text"]))


if __name__ == "__main__":
    app.run(host="0.0.0.0")
