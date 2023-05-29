import { useContext } from "react";
import {
  BtnRetunLocation,
  MapView,
  SearchLocation,
  ButtonRoutingProfile,
} from "../components";
import { MapsContext } from "../context";

export const HomePage = (): JSX.Element => {
  const { bookmarked } = useContext(MapsContext);
  return (
    <>
      <MapView />
      <BtnRetunLocation />
      <SearchLocation />
      {
        bookmarked && <ButtonRoutingProfile />
      }
    </>
  );
}
