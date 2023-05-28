import {
  BtnRetunLocation,
  MapView,
  SearchLocation,
  ButtonRoutingProfile,
} from "../components";

export const HomePage = (): JSX.Element => {
  return (
    <>
      <MapView />
      <BtnRetunLocation />
      <SearchLocation />
      <ButtonRoutingProfile />
    </>
  );
}
