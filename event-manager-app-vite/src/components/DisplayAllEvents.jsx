import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DisplayAllEvents() {
    const [events, setEvents] = useState(null);
    
    async function getEventList() {
        try {
            const url = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3b0af1a54398d8aeeb1c8154ce1faf06&page=1'
            const response = await fetch(url)
            const data = await response.json()
            setEvents(data)
            console.log(data)
        } catch (error) {
            console.error('Failed to retrieve data:', error)
        }
    }
    useEffect(() => {
        getEventList()
    }, [])

    return (
    <div className='flex gap-9 flex-wrap '>
        {events && events.results.map(event => (
        <div key={event.id} className='w-64 justify-center' data-theme='cyberpunk'>
            <div className='image'>
                <img src={`https://image.tmdb.org/t/p/w500/${event.poster_path}`} alt="" />
                {/* <img src={event.mainImage} alt="" /> */}
            </div>
            <div className="info">
                <p>{event.original_name}</p>
                <p>{event.first_air_date}</p>
                {/* <p>{event.name}</p>
                <p>{event.date}{event.time}</p> */}
                {/* <p>{event.city}{event.country}</p>
                <p>{event.price}{event.participans}</p> */}
                <div>
                    <Link to={`/event/${event.id}`} state={event}>
                    <button className='btn btn-primary w-20'>See Event</button>
                    </Link>
                </div>
            </div>
        </div>
        ))}
    </div>
    )
}
    


export default DisplayAllEvents
