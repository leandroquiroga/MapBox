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

mapboxgl.accessToken = "pk.eyJ1IjoibGVhbmRldjE0IiwiYSI6ImNsaHBpZzc4ODBpd3Mzb2xwcnJwZHBpbjQifQ.Xex3uSdDU5cVXFY4C5fOUQ";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapBox />
  </React.StrictMode>
);
