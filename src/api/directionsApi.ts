import axios from "axios";

export const directionsApi = axios.create({
  baseURL: import.meta.env.VITE_URL_DIRECTION,
  params: {
    alternatives:import.meta.env.VITE_ALTERNATIVES,
    geometries:import.meta.env.VITE_GEOMETRIES,
    overview:import.meta.env.VITE_OVERVIEW,
    steps:import.meta.env.VITE_STEPS,
    language: import.meta.env.VITE_LANGUAGE,
    access_token: import.meta.env.VITE_TOKEN_MAPBOX,
  },
});
