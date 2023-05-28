import { useContext, useState } from "react"
import { MapsContext, PlacesContext } from "../context"
import { Spinner } from "./";
import { Feature } from "../interfaces/interfaces";

export const SearchResult = () => {

  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { isMapReady, map, getRouteBetweenProvider } = useContext(MapsContext);
  const [placeID, setPlaceID] = useState('');
  
  
  const handleFlyTo = (place: Feature) => {
    if (isMapReady) {
      const [lng, lat] = place.center;
      setPlaceID(place.id)
      map?.flyTo({
        zoom: 14,
        center: [lng, lat],
        essential: true
      });
      return
    }
  };

  const changeClassName = (place: Feature): boolean => (placeID === place.id) ? true : false 

  const handleGetRoute = (place: Feature) => {  

    if (!userLocation) return;
    // Extrameos la longitud y latitud del destino
    const [lng, lat] = place.center;

    //TODO: Chequar si el mapa esta cargado
      
      //TODO: Activar un componente checkbox para seleccionar el tipo de ruta
      //TODO: Setear la opcion seleccionada por el usuario para hacer la peticion
    getRouteBetweenProvider(userLocation, [lng, lat]);

  }
  if (isLoadingPlaces) {
    return <Spinner />
  }

  if (places.length === 0) {
    return <></>
  }
  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action cursor-pointer 
            ${changeClassName(place) ? `active` : ``}`}
          onClick={() => handleFlyTo(place)}>
          <h6> {place.text_es}</h6>
          <p
            className={`${
              changeClassName(place) ? `text-white` : `text-muted`
            }`}
            style={{
              fontSize: "12px",
            }}>
            {place.place_name_es}
          </p>

          <button
            onClick={() => handleGetRoute(place)}
            className={`${
              changeClassName(place)
                ? `btn btn-outline-light btn-sm`
                : `btn btn-outline-primary btn-sm`
            }`}>
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
}
