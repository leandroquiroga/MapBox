import { Dispatch, SetStateAction, useContext, useState } from "react"
import { MapsContext, PlacesContext } from "../context"
import { Spinner } from "./";
import { Feature } from "../interfaces/interfaces";
import { removeLayersAndSource } from '../helpers';

export const SearchResult = ({setPlaceContainer }: {setPlaceContainer: Dispatch<SetStateAction<boolean>>}) => {
  const {
    places,
    isLoadingPlaces,
    userLocation,
    setInputValue,
    setShowAside,
    setInfoPlaces
  } = useContext(PlacesContext);
  const {
    isMapReady,
    map,
    getRouteBetweenProvider,
    setBookmarked,
    setPlaceCurrent,
  } = useContext(MapsContext);
  const [placeID, setPlaceID] = useState("");

  const handleFlyTo = (place: Feature) => {
    if (isMapReady) {
      const [lng, lat] = place.center;
      setPlaceID(place.id);
      map?.flyTo({
        zoom: 14,
        center: [lng, lat],
        animate: true,
      });

      setInputValue(place.text_es);
      setPlaceContainer(false);
      setBookmarked(true);
      return;
    }
  };

  const changeClassName = (place: Feature): boolean =>
    placeID === place.id ? true : false;

  // Crea la ruta entre dos puntos
  const handleGetRoute = (place: Feature) => {
    if (!userLocation) return;
    // Extrameos la longitud y latitud del destino
    const [lng, lat] = place.center;
    // Seteamos la coordenadas actuales del actual lugar
    setPlaceCurrent([lng, lat]);

    // Seteamos la informacion del destino 
    setInfoPlaces(place.place_name_es)
    //Chequar si el mapa esta cargado
    if (!isLoadingPlaces) {
      setBookmarked(true);
      getRouteBetweenProvider(userLocation, [lng, lat]);
      setPlaceContainer(false);
      setShowAside(true)
      removeLayersAndSource(map!)
    }
  };
  if (isLoadingPlaces) {
    return <Spinner />;
  }

  if (places.length === 0) {
    return <></>;
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
};
