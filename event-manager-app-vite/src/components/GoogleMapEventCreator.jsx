import React from 'react';

function GoogleMapEventCreator({ lat, lng }) {
    const apiKey = 'AIzaSyD8xjTg1FBQK9nkAFMESlQmEkcUqKYyrn8'
    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&markers=color:red%7C${lat},${lng}&key=${apiKey}`;

    return (
        <div>
            <img src={mapImageUrl} alt="Map" />
        </div>
    );
}

export default GoogleMapEventCreator;