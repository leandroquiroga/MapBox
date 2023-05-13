import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapBox } from './MapBox.tsx';

import './App.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MapBox />
  </React.StrictMode>
);
