import { searchApi } from "../api";
import { PlacesStates, ResponseLocation } from "../interfaces/interfaces";


export const searchServices = async (query: string, state: PlacesStates) => {

  const response = await searchApi.get<ResponseLocation>(`/${query}.json`, {
    params: {
      proximity: state.userLocation?.join(","),
    },
  });

  return response.data
}
