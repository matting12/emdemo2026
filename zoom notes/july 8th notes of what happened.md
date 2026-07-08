Step 5 — Add Bulma for mobile-first styling

index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1/css/bulma.min.css">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

app.jsx

```javascript
import { useState, useEffect } from 'react'
import EventList from './EventList'
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
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          <span className="navbar-item"><strong>My App</strong></span>
        </div>
      </nav>

      <main className="container">
        <section id="center" className="section">
          <div className="box">
            <h1 className="title">Get started</h1>
            <p className="subtitle">
              Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
            </p>
            <p>The current time is {new Date(currentTime * 1000).toLocaleString()}.</p>
          </div>
          <button
            type="button"
            className="button is-primary"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </section>

        <EventList />
      </main>
    </>
  )
}

export default App
```

eventlist.jsx

```javascript
import { useState, useEffect } from 'react';

function EventList() {
  const [day, setDay] = useState('monday');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`/api/events/${day}`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [day]);

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Schedule</p>
      </header>

      <div className="card-content">
        <div className="select">
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
          </select>
        </div>

        <ul className="mt-4">
          {events.map(event => (
            <li key={event.id} className="mb-2">
              <span className="tag is-info">{event.time}</span> {event.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventList;
```