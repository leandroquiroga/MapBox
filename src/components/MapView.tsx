import { useContext, useEffect, useState } from "react"
import { PlacesContext } from "../context"
import { Loading } from ".";

export const MapView = (): JSX.Element => {

  const [localitation, setLocalitation] = useState<number[]>();
  const { isLoading, userLocation } = useContext(PlacesContext);
  
  useEffect(() => {
    setLocalitation(userLocation);
  }, [userLocation]);


  // Agregar un spinner de carga y crear un componente
  if (isLoading) {
    return ( <Loading /> )
  }

  return (
    <>
      <section>{localitation?.join(', ')}</section>
    </>
  );
}
