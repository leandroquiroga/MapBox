import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Map } from "mapbox-gl";

import { PlacesContext, MapsContext } from "../context";
import { Loading } from ".";

export const MapView = (): JSX.Element => {

  const [_localitation, setLocalitation] = useState<number[]>();
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapsContext);
  // Mantenemos la referencia del elemento ya que puede existir mas de un
  // mapa, es por eso que se utiliza la referencia del elemento
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalitation(userLocation);
  }, [userLocation]);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        container: mapDiv.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: userLocation,
        zoom: 12,
        pitch: 0, 
      });

      setMap(map);
    }
  }, [isLoading, userLocation]);


  // Agregar un spinner de carga y crear un componente
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section
        ref={mapDiv}
        className="container_map_full">
      </section>
    </>
  );
}