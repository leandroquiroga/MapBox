/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useReducer, useState } from 'react';
import { LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

import { MapProps, MapState } from '../interfaces/interfaces';
import { MapsContext } from "./MapsContext";
import { mapReducer } from "./mapsReducer";
import { PlacesContext } from '.';
import { directionService } from '../services/direction_services';
import { removeLayersAndSource, createSourceData, createLayerAndSource } from "../helpers";

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapsProvider = ({children}: MapProps): JSX.Element => {
  
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);
  const [routingProfile, setRoutingProfile] = useState<string>("driving");
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [placeCurrent, setPlaceCurrent] = useState<[number, number]>([0,0]);

  useEffect(() => {
    if (places.length === 0) setBookmarked(false)
  }, [places]);

  useEffect(() => {
    // Chequea si hay lugares, sino lo hay lo elimina del mapa y no del estado.
    if (places.length === 0) state.markers.forEach((marker) => marker.remove());

    // Creamos una constante para almacenar los nuevos marcadores
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
        `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .addTo(state.map!);

      newMarkers.push(newMarker);

      dispatch({ type: "setMarkers", payload: newMarkers });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const createPolyline = (coordinates: number[], route?: string) => {

    const sourceData = createSourceData(coordinates);
    
    // Chequeamos si existe la ruta 
    if (route) {
      switch (route) {
          case "driving":
            // Eliminamos la polyline si ya existe
            removeLayersAndSource(state.map!);
            createLayerAndSource(
              state,
              sourceData,
              "DrivingRouting",
              "black"
            );
            return;
          case "walking":
            // Eliminamos la polyline si ya existe
            removeLayersAndSource(state.map!);
            createLayerAndSource(state, sourceData, "WalkingRouting", "red");
            return;

          case "cycling":
            // Eliminamos la polyline si ya existe
            removeLayersAndSource(state.map!);
            createLayerAndSource(
              state,
              sourceData,
              "CyclingRouting",
              "green"
            );
            return;
      }
      return
    }

    // Se llama esta funcion ya que el routeProfile es driving
    createLayerAndSource(state, sourceData, "DrivingRouting", "black");
  };

  const getRouteBetweenProvider = async ( start: [number, number], end: [number, number]) => {
    
    const routeDefault = "driving"
    const response = await directionService(routeDefault, start, end);
    const { geometry } = response.routes[0];
    const { coordinates } = geometry;

    // Creamos los bounce para que el mapa se posione en la posicion entre dos puntos
    const bounds = new LngLatBounds(start, start);

    for ( const coord of coordinates) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      animate: true,
      padding: 200,
      zoom: 12,
    });

    createPolyline(coordinates);
  };

  
  return (
    <MapsContext.Provider
      value={{
        ...state,
        setMap,
        routingProfile,
        setRoutingProfile,
        bookmarked,
        setBookmarked,
        getRouteBetweenProvider,
        placeCurrent,
        setPlaceCurrent,
        createPolyline
      }}>
      {children}
    </MapsContext.Provider>
  );
}
