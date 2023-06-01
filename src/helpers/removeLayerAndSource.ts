import { Map } from "mapbox-gl";

export const removeLayersAndSource = (map: Map) => {
  const layerNames = ["WalkingRouting", "DrivingRouting", "CyclingRouting"];
  const sourceNames = ["WalkingRouting", "DrivingRouting", "CyclingRouting"];

  layerNames.forEach((layerName) => {
    if (map.getLayer(layerName)) {
      map.removeLayer(layerName);
    }
  });

  sourceNames.forEach((sourceName) => {
    if (map.getSource(sourceName)) {
      map.removeSource(sourceName);
    }
  });
};
