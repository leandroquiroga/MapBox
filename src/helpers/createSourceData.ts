import { AnySourceData } from "mapbox-gl";


export const createSourceData = (coordinates: any) => {
  //Configuracion de la polyline
  const sourceData: AnySourceData = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      ],
    },
  };

  return sourceData;
};