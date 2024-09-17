import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [destination, setDestination] = useState('');
  const [mapSrc, setMapSrc] = useState('');

  // Получение геолокации пользователя с высокой точностью при загрузке страницы
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Ошибка при получении геолокации", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation не поддерживается вашим браузером");
    }
  }, []);

  // Функция для построения маршрута
  const handleBuildRoute = () => {
    if (userLocation.lat && destination) {
      const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lon}&destination=${encodeURIComponent(destination)}`;
      window.open(mapUrl, '_self');
    }
  };

  return (
    <div className="App">
      <h1>Построение маршрута</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Введите конечный адрес"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="destination-input"
        />
        <button onClick={handleBuildRoute} className="route-button">
          Построить маршрут
        </button>
      </div>

      {/* Встроенная карта Google Maps */}
      {mapSrc && (
        <iframe
          title="Google Maps Route"
          src={mapSrc}
          allowFullScreen
          loading="lazy"
          className="map-iframe"
        ></iframe>
      )}
    </div>
  );
}

export default App;
