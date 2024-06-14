import React, { useState } from 'react';

function GoogleMapEventCreator({ lat, lng, address }) {
    const [zoomLevel, setZoomLevel] = useState(13); //Adjust Initial Zoom Level ?
    const handleZoomChange = (e) => {
        setZoomLevel(parseInt(e.target.value));
    };

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 
    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoomLevel}&size=600x300&markers=color:red%7C${lat},${lng}&key=${apiKey}`;

    return (
        <div>
            {/* input range might be a pain in the ass to style */}
            <input type="range" min="1" max="20" value={zoomLevel} onChange={handleZoomChange} />
            <div>
                <img src={mapImageUrl} alt="Map" />
            </div>
            <p>{address.streetName} {address.streetNumber} 
                <br />
                {address.city} {address.zipCode} {address.country}
            </p>
        </div>
    );
}

export default GoogleMapEventCreator;