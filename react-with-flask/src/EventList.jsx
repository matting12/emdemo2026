import { useState, useEffect } from 'react';

function EventList() {
    const [events, setEvents] = useState([]);
    const [day, setDay] = useState('monday');


    useEffect(() => {
        fetch(`/api/events/${day}`).then(res => res.json())
            .then(data => {
                setEvents(data);
            });
    }, [day]);

    console.log(day);
    console.log(events);


    return (
        <>
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
        </>
    );


}

export default EventList;