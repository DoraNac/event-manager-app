import { useState } from "react";
import MapDirections from "./MapDirections";
import GoogleMapEventCreator from "./GoogleMapEventCreator";

function NewEvent() {
    const [address, setAddress] = useState({
        streetNumber: '',
        streetName: '',
        city: '',
        zipCode: '',
        country: ''
    });

    const [name, setName] = useState('')
    const [time, setTime] = useState(0)
    const [date, setDate] = useState(0)
    const [participants, setParticipants] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
        // console.log(address);
    };

    // get the coordinates of the address send by the event creator
    const getCoordinates = async (e) => {
        e.preventDefault();
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        const fullAddress = `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.zipCode}, ${address.country}`;
        const encodedAddress = encodeURIComponent(fullAddress);
        // console.log(encodedAddress);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setCoordinates({ lat: location.lat, lng: location.lng });
                console.log(coordinates);

            } else {
                console.error('No coordinates found for this address.');
            }
        } catch (error) {
            console.error('Error fetching geocode:', error);
        }
    };

 // useEffect Needed (or dependencies) ?
// useEffect(() => {handleSubmit goes here}, [name, date, time, participants, price, description, coordinates]);
    const handleSubmit = async (e) => {
        await getCoordinates(e);
        e.preventDefault();
        try {
            const response = await fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    date: date,
                    time: time,
                    // address: address, probably?
                    participants: participants,
                    price: price,
                    description: description,
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    // onBlur or onChange ?
    return (
        <div className="flex gap-5">
            <form method="post" className="event-creator" data-theme="cyberpunk"
            onSubmit={handleSubmit}>
            <h1 className="self-center">Create Event</h1>
            <div className="line1">
                <label>Name:
                    <input type="text" value={name} 
                    onChange={(e)=> setName(e.target.value)}/>
                </label>
                <label>Date:
                    <input type="date" value={date}
                    onChange={(e)=>setDate(e.target.value)} />
                </label>
                <label>Time:
                    <input type="time" value={time}
                    onChange={(e)=>setTime(e.target.value)} />
                </label>
            </div>
            <div className="line2">
                <label>Street:
                    <input type="text" name="streetName" 
                    value={address.streetName} onChange={handleChange} />
                </label>
                <label>N°:
                    <input type="number" className="w-11" name="streetNumber" 
                    value={address.streetNumber} onChange={handleChange} />
                </label>
                <label>Zip Code:
                    <input type="text" className="w-11" name="zipCode" 
                    value={address.zipCode} onChange={handleChange} />
                </label>
            </div>
            <div className="line3">
                <label>City:
                    <input type="text" name="city" 
                    value={address.city} onChange={handleChange} />
                </label>
                <label>Country:
                    <input type="text" name="country" 
                    value={address.country} onChange={handleChange} />
                </label>
            </div>
            <div className="line4">
                <label>Participants:
                    <input type="number" 
                    value={participants} onChange={(e)=>setParticipants(e.target.value)}/>
                </label>
                <label>Price:
                    <input type="number" 
                    value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </label>
            </div>
            <label>Description:
                <textarea className="w-96 h-24"
                value={description} onChange={(e)=>setDescription(e.target.value)}>
                </textarea>
            </label>
            <label>Add an image:
                <input type="file" accept="image/*" />
            </label>
            <button className="btn btn-primary w-20" type="submit">
                Submit
            </button>
        </form>
        <GoogleMapEventCreator lat={coordinates.lat} lng={coordinates.lng} />
        </div>
    );
}

export default NewEvent;