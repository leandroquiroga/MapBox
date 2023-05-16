import { Map } from "mapbox-gl";

export interface PlacesProps {
  children: JSX.Element | JSX.Element[];
}
export interface PlacesStates {
  isLoading: boolean;
  userLocation?: [number, number];
}

export interface PlacesContextProps extends PlacesStates {
  isLoading: boolean;
  userLocation?: [number, number];
}

export interface MapProps {
  children: JSX.Element | JSX.Element[];
}
export interface MapState {
  isMapReady: boolean;
  map?: Map;
}
export interface MapsContextProps {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
}
