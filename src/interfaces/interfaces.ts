import { Map, Marker } from "mapbox-gl";
import { Dispatch, SetStateAction } from "react";

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

export interface ReponseDirections {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  weight_typical: number;
  duration_typical: number;
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export interface Geometry {
  coordinates: number[];
  typeline: TypeLine;
}

export enum TypeLine {
  LineString = "LineString",
}

export interface Leg {
  via_waypoints: any[];
  admins: Admin[];
  weight_typical: number;
  duration_typical: number;
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

export interface Step {
  intersections: Intersection[];
  maneuver: Maneuver;
  name: string;
  weight_typical: number;
  duration_typical: number;
  duration: number;
  distance: number;
  driving_side: DrivingSide;
  weight: number;
  mode: Mode;
  geometry: Geometry;
  destinations?: string;
}

export enum DrivingSide {
  Left = "left",
  Right = "right",
}

export interface Intersection {
  bearings: number[];
  entry: boolean[];
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?: boolean;
  admin_index: number;
  out?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  turn_weight?: number;
  turn_duration?: number;
  duration?: number;
  weight?: number;
  traffic_signal?: boolean;
}

export interface MapboxStreetsV8 {
  class: Class;
}

export enum Class {
  Service = "service",
  Street = "street",
  Tertiary = "tertiary",
}

export interface Maneuver {
  type: string;
  instruction: string;
  bearing_after: number;
  bearing_before: number;
  location: number[];
  modifier?: DrivingSide;
}

export enum Mode {
  Driving = "driving",
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
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
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  showFooter: boolean;
  setShowFooter: Dispatch<SetStateAction<boolean>>;
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
  instructions?: RouteInstructions;
  setInstructions: ( value: React.SetStateAction<RouteInstructions | undefined> ) => void;
  map?: Map;
  setMap: (map: Map) => void;
  getRouteBetweenProvider: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
  routingProfile: string;
  setRoutingProfile: Dispatch<SetStateAction<string>>;
  bookmarked: boolean;
  setBookmarked: Dispatch<SetStateAction<boolean>>;
  placeCurrent: [number, number];
  setPlaceCurrent: Dispatch<SetStateAction<[number, number]>>;
  createPolyline: (coordinates: number[], route?: string) => void;
}

export type MapAction =
  | { type: "setMap"; payload: Map }
  | { type: "setMarkers"; payload: Marker[] }
  | { type: "setRoutingInstructions"; payload: RouteInstructions };

export interface RoutingProfile {
  trafic: string;
  driving: string;
  walking: string;
  cycling: string;
}
export interface RouteInstructions {
  waypoints: Waypoint[];
  routes: Route[]
}