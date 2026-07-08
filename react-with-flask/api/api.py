import time
from flask import Flask

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/events/<day>')
def get_events_by_day(day):
    print(day)
    all_events = {
        "monday": [
            {"id": 1, "label": "Standup", "time": "09:00"},
            {"id": 2, "label": "Design Review", "time": "11:30"},
        ],
        "tuesday": [
            {"id": 3, "label": "Lunch", "time": "12:30"},
            {"id": 4, "label": "1:1 with Manager", "time": "14:00"},
        ],
    }
    return all_events.get(day, [])