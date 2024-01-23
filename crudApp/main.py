from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data
tasks = [
    {"id": 1, "title": "Task 1"},
    {"id": 2, "title": "Task 2"},
]


@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)


@app.route("/tasks", methods=["POST"])
def add_task():
    new_task = {"id": len(tasks) + 1, "title": request.json["title"]}
    tasks.append(new_task)
    return jsonify(new_task)


@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = next((t for t in tasks if t["id"] == task_id), None)
    if task:
        task["title"] = request.json["title"]
        return jsonify(task)
    else:
        return jsonify({"error": "Task not found"}), 404


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return jsonify({"result": "success"})


if __name__ == "__main__":
    app.run(debug=True)
