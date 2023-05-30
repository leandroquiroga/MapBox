import { useContext } from "react";
import {
  BtnRetunLocation,
  ButtonRoutingProfile,
  MapView,
  SearchLocation
} from "./";
import { MapsContext, PlacesContext } from "../context";

export const Layaout = () => {
  const { showFooter } = useContext(PlacesContext);
  const { bookmarked } = useContext(MapsContext);
  return (
    <main className={`${showFooter ? `container_map` : `container_map_full`}`}>
      <MapView />
      <BtnRetunLocation />
      <SearchLocation />
      {bookmarked && <ButtonRoutingProfile />}
    </main>
  );
}
