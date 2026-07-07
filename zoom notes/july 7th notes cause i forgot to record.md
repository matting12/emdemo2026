
## Step 1 — Add the endpoint

```python
import time
from flask import Flask

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/events')
def get_events():
    return [
        {"id": 1, "label": "Standup", "time": "09:00"},
        {"id": 2, "label": "Design Review", "time": "11:30"},
        {"id": 3, "label": "Lunch", "time": "12:30"},
        {"id": 4, "label": "1:1 with Manager", "time": "14:00"},
        {"id": 5, "label": "Sprint Planning", "time": "16:00"},
    ]
```

---

## Step 2 — Fetch and render manually, inside `App.jsx`

```javascript
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
          <p>The current time is {new Date(currentTime * 1000).toLocaleString()}.</p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <ul>
        <li>{events[0]?.label} — {events[0]?.time}</li>
        <li>{events[1]?.label} — {events[1]?.time}</li>
        <li>{events[2]?.label} — {events[2]?.time}</li>
        <li>{events[3]?.label} — {events[3]?.time}</li>
        <li>{events[4]?.label} — {events[4]?.time}</li>
      </ul>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
```

---

## Step 3 — Port it to a component and replace manual repetition with `.map()`

```javascript
import { useState, useEffect } from 'react';

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          {event.label} — {event.time}
        </li>
      ))}
    </ul>
  );
}

export default EventsList;
```

`App.jsx` now just renders it:

```javascript
import { useState, useEffect } from 'react'
import EventsList from './EventsList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
          <p>The current time is {new Date(currentTime * 1000).toLocaleString()}.</p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <EventsList />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
```

---

## Step 4 — Introduce a dependency array

```python
@app.route('/api/events/<day>')
def get_events_by_day(day):
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
```

```javascript
import { useState, useEffect } from 'react';

function EventsList() {
  const [day, setDay] = useState('monday');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`/api/events/${day}`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [day]);

  return (
    <div>
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
      </select>

      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.label} — {event.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
```