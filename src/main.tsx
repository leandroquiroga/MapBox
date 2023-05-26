import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapBox } from './MapBox.tsx';

import mapboxgl from "mapbox-gl";
import './App.css';

// Verifica si el navegador contien la opcion de geolocalization
if (!navigator.geolocation) {
  alert('Tu navegador no tiene la opcion de Geolocation');
  throw new Error('Tu navegador no tiene la opcion de Geolocation');
}

mapboxgl.accessToken = import.meta.env.VITE_TOKEN_MAPBOX;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapBox />
  </React.StrictMode>
);
