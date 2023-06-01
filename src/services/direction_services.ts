import { directionsApi } from "../api";
import { ReponseDirections } from "../interfaces/interfaces";

export const directionService = async (
  routingProfile: string,
  start: [number, number],
  end: [number, number],
): Promise<ReponseDirections> => {
  const response = await directionsApi.get<ReponseDirections>(
    `/${routingProfile}/${start.join(",")};${end.join(",")}`
  );

  return response.data;
};