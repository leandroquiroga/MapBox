
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