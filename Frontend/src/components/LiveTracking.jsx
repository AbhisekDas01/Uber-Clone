import React, { useState, useEffect, useRef } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const [locationError, setLocationError] = useState('');
    const mapRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const next = { lat: latitude, lng: longitude };
                setCurrentPosition(next);
                if (mapRef.current) {
                    mapRef.current.panTo(next);
                }
            },
            () => {
                setLocationError('Location access denied. Enable location to see your position.');
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const next = { lat: latitude, lng: longitude };
                setCurrentPosition(next);
                if (mapRef.current) {
                    mapRef.current.panTo(next);
                }
            },
            () => {
                setLocationError('Unable to fetch live location updates.');
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    if (!isLoaded) {
        return (
            <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                <p className='text-sm text-gray-600'>Loading map...</p>
            </div>
        );
    }

    return (
        <div className='w-full h-full'>
            {locationError && (
                <div className='absolute z-10 top-4 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-2 rounded shadow text-xs text-red-600'>
                    {locationError}
                </div>
            )}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
                onLoad={(map) => {
                    mapRef.current = map;
                }}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </div>
    )
}

export default LiveTracking