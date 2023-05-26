import axios from "axios";

export const searchApi = axios.create({
  baseURL: import.meta.env.VITE_URL_PLACES,
  params: {
    limit: import.meta.env.VITE_LIMIT,
    language: import.meta.env.VITE_LANGUAGE,
    access_token: import.meta.env.VITE_TOKEN_MAPBOX,
  },
});