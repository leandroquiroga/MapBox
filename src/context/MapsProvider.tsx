import { useContext, useEffect, useReducer } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';

import { MapProps, MapState, ReponseDirections } from '../interfaces/interfaces';
import { MapsContext } from "./MapsContext";
import { mapReducer } from "./mapsReducer";
import { PlacesContext } from '.';
import { directionsApi } from '../api';

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapsProvider = ({children}: MapProps): JSX.Element => {
  
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    // Chequea si hay lugares, sino lo hay lo elimina del mapa y no del estado.
    if (places.length === 0) state.markers.forEach((marker) => marker.remove());
  
    // Creamos una constante para almacenar los nuevos marcadores
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup()
        .setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
        `)
      
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .addTo(state.map!)

      
      newMarkers.push(newMarker);

      dispatch({ type: "setMarkers", payload: newMarkers });
    }

  }, [places]);
  
  const setMap = (map: Map) => {
    // Creacion del Popup
    const popup = new Popup({
      closeButton: true,
      focusAfterOpen: true,
      className:'rounded-xl'
    }).setHTML(`<p>Ubicacion: Tu vieja</p>`);
    
    //Creacion del marcador, necesita la logitud y latitud para colacarlo en el mapa
    new Marker({
      color: "#ff0000",
      draggable: true,
    })
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(popup);
    
    dispatch({ type: 'setMap', payload: map })
  };

  const getRouteBetweenProvider = async ( start: [number, number], end: [number, number]) => {
    
    // let kilometers: number;
    
    const response = await directionsApi.get<ReponseDirections>(
      `/driving/${start.join(",")};${end.join(",")}`
    );
    console.log(response);

    //Conversion de los kilometros
    // const {distance, duration, geometry} = response.data.routes[0]
    // kilometers = distance / 1000;
    // kilometers = Math.round(kilometers * 1000);
    // kilometers = kilometers / 1000;

    // Total del tiempo
    // const minutes: number = Math.floor(duration / 60);

    // console.log({kilometers, minutes});
  };

  
  return (
    <MapsContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenProvider,
      }}>
      {children}
    </MapsContext.Provider>
  );
}
