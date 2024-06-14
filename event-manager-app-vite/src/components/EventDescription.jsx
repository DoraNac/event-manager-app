import React from 'react'
import { useLocation } from "react-router-dom"
import InteractiveGoogleMap from './InteractiveGoogleMap';
import MapDirections from './MapDirections';

function EventDescription() {
    
    const location = useLocation()
    const event = location.state || {} 
    console.log(event);

    return (
        <div className='flex'>
            <div className='flex-row' data-theme='cyberpunk'>
                <div>
                <img className='h-72 w-full' src={`https://image.tmdb.org/t/p/w500/${event.poster_path}`} alt="" />
                </div>
                <div className='info'>
                    <p>{event.original_name}</p>
                    <p>{event.first_air_date}</p>
                    {/* <p>{event.name}</p>
                    <p>{event.date}{event.time}</p> */}
                    {/* <p>{event.city}{event.country}</p>
                    <p>{event.price}{event.participans}</p> */}
                    <div>
                        <button className='btn btn-primary w-20'>Book Now</button>
                    </div>
                </div>
                <InteractiveGoogleMap lat={50.84553805049348} lng={4.357455203315006} address={{}} />
            </div> 
            <MapDirections coordinates={{lat:50.84553805049348, lng:4.357455203315006}}/>
        </div>
    ) 
}

export default EventDescription