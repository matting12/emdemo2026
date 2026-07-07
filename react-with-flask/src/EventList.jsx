import { useState, useEffect } from 'react';

function EventList() {
    const [events, setEvents] = useState([]);


    useEffect(() => {
        fetch('/api/events').then(res => res.json()).then(data => {
            setEvents(data);
        });
    }, []);

    console.log(events);


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

export default EventList;