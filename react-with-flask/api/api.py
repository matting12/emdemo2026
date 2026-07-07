import time
from flask import Flask

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/events')
def get_events():
    return [
        {"id": 1, "label": "Breakfast", "time": "09:00"},
        {"id": 2, "label": "Design Review", "time": "11:30"},
        {"id": 3, "label": "Lunch", "time": "12:30"},
        {"id": 4, "label": "1:1 with Manager", "time": "14:00"},
        {"id": 5, "label": "Sprint Planning", "time": "16:00"},
    ]