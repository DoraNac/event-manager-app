import React, { useState } from 'react';

function GoogleMapEventCreator({ lat, lng }) {
    const [zoomLevel, setZoomLevel] = useState(13); // Niveau de zoom initial

    const handleZoomChange = (e) => {
        setZoomLevel(parseInt(e.target.value));
    };

    const apiKey = 'AIzaSyD8xjTg1FBQK9nkAFMESlQmEkcUqKYyrn8'; 
    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoomLevel}&size=600x300&markers=color:red%7C${lat},${lng}&key=${apiKey}`;

    return (
        <div>
            {/* input range might be a pain in the ass to style */}
            <input type="range" min="1" max="20" value={zoomLevel} onChange={handleZoomChange} />
            <div>
                <img src={mapImageUrl} alt="Map" />
            </div>
        </div>
    );
}

export default GoogleMapEventCreator;