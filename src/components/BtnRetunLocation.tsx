import { useContext } from "react";
import { MapsContext, PlacesContext } from "../context";
import logoLocation from '../assets/location.svg';

export const BtnRetunLocation = () => {

  const { userLocation } = useContext(PlacesContext);
  const { isMapReady, map } = useContext(MapsContext);

  const handleLocation = () => {
    // Chequeamos si el mapa esta listo
    if (!isMapReady) throw new Error('El mapa no esta listo');
    // Chequeamos si la ubicacion no existe
    if (!userLocation) throw new Error("No se a encontrado la ubicacion");
  
    map?.flyTo({
      zoom: 14,
      center: userLocation,
      essential: true
    })
  };


  return (
    <button
      className="btn btn-primary"
      onClick={handleLocation}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "15px",
        zIndex: 1000,
        borderRadius: "80%",
        margin: 0,
        padding: '2px'
      }}>
      <img src={logoLocation} alt="location icon"/>
    </button>
  );
}
