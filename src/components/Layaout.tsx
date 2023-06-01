import { useContext } from "react";
import {
  BtnRetunLocation,
  MapView,
  SearchLocation
} from "./";
import { PlacesContext } from "../context";

export const Layaout = () => {
  const { showFooter } = useContext(PlacesContext);
  return (
    <main className={`${showFooter ? `container_map` : `container_map_full`}`}>
      <MapView />
      <BtnRetunLocation />
      <SearchLocation />
    </main>
  );
}
