import { Map, Marker } from "mapbox-gl";

export interface PlacesProps {
  children: JSX.Element | JSX.Element[];
}
export interface ResponseLocation {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  language_es?: Language;
  place_name_es: string;
  text: string;
  language?: Language;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Context {
  id: string;
  short_code?: string;
  wikidata?: string;
  mapbox_id: string;
  text_es: string;
  language_es?: Language;
  text: string;
  language?: Language;
}

export enum Language {
  Es = "es",
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  wikidata?: string;
  mapbox_id?: string;
  foursquare?: string;
  landmark?: boolean;
  address?: string;
  category?: string;
}
export interface PlacesStates {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[]
}

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  searchPlacesByQuery: (query: string) => Promise<Feature[]>;
}

export interface MapProps {
  children: JSX.Element | JSX.Element[];
}
export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}
export interface MapsContextProps {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
}