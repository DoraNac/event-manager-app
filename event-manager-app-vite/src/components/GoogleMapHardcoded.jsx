
import React from 'react';

function GoogleMapHardcoded() {
    const coordinates = { lat: 50.8118498, lng: 4.335008999999999 };
    const apiKey = 'AIzaSyD8xjTg1FBQK9nkAFMESlQmEkcUqKYyrn8';
    const mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=13&size=600x300&markers=color:red%7C${coordinates.lat},${coordinates.lng}&key=${apiKey}`;

    return (
        <div>
            <img src={mapImage} alt="Map" />
        </div>
    );
}

export default GoogleMapHardcoded;