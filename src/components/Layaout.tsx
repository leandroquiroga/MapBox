import { useContext } from "react";
import {
  BtnRetunLocation,
  MapView,
  SearchLocation,
  Aside
} from "./";
import { PlacesContext } from "../context";

export const Layaout = () => {
  const { showAside } = useContext(PlacesContext);
  return (
    <main className="container_map_full">
      <MapView />
      <BtnRetunLocation />
      <SearchLocation />
      {showAside && <Aside />}
    </main>
  );
}