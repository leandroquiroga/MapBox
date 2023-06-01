import { MapState } from "../interfaces/interfaces";

export const createLayerAndSource = (
  state: MapState,
  sourceData: mapboxgl.GeoJSONSourceRaw,
  profile: string,
  line_color: string
) => {
  state.map?.addSource(`${profile}`, sourceData);
  // Configuramos el estilo de la polyline
  state.map?.addLayer({
    id: `${profile}`,
    type: "line",
    source: `${profile}`,
    layout: {
      "line-cap": "square",
      "line-join": "round",
    },
    paint: {
      "line-color": `${line_color}`,
      "line-width": 4,
    },
  });
};