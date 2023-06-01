import { useContext } from "react";
import { IconButton } from ".";
import { MapsContext, PlacesContext } from "../context";
import { directionService } from "../services/direction_services";


export const ButtonRoutingProfile = (): JSX.Element => {
  const arrRoutingProfile = ["driving", "walking", "cycling"];
  const { placeCurrent,  createPolyline } = useContext(MapsContext);
  const { userLocation } = useContext(PlacesContext);

  // Retorna la data de las coordenadas entre dos puntos dependiendo del routing profile
  const handleRoute = async (route: string) => {
    const [start, end] = placeCurrent;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await directionService(route, userLocation!, [start, end]);
    const { geometry } = response.routes[0];
    const { coordinates } = geometry;
    createPolyline(coordinates, route);
  };

  return (
    <section>
      {arrRoutingProfile.map((route, index) => (
        <button
          value={route}
          className="btn btn-primary btn-sm my-1 mx-2 rounded-3"
          key={index}
          onClick={() => {
            console.log(route)
            handleRoute(route);
          }}>
          <IconButton routeProfile={route} />
        </button>
      ))}
    </section>
  );
};