import { useContext, useEffect, useReducer, useState } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

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
  const [routingProfile, setRoutingProfile] = useState<string>("driving");
  const [bookmarked, setBookmarked] = useState<boolean>(false)


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

  const getRouteBetweenProvider = async ( start: [number, number], end: [number, number]) => {
    
    // let kilometers: number;
    
    const response = await directionsApi.get<ReponseDirections>(
      `/${routingProfile}/${start.join(",")};${end.join(",")}`
    );

    const { geometry } = response.data.routes[0];
    const { coordinates } = geometry;

    
    //Conversion de los kilometros
    // kilometers = distance / 1000;
    // kilometers = Math.round(kilometers * 1000);
    // kilometers = kilometers / 1000;

    // Total del tiempo
    // const minutes: number = Math.floor(duration / 60);

    // console.log({kilometers, minutes});

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

    //Configuracion de la polyline
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          },
        ],
      },
    };

    // Eliminamos la polyline si ya existe 
    if (state.map?.getLayer("RouteString")) {
      state.map?.removeLayer("RouteString");
      state.map?.removeSource("RouteString");
    }
      state.map?.addSource("RouteString", sourceData);

    // Configuramos el estilo de la polyline
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        'line-cap': 'square',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 4,
      }
    });

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
      }}>
      {children}
    </MapsContext.Provider>
  );
}
