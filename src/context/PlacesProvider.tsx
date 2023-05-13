import { PlacesProps, PlacesStates } from "../interfaces/interfaces"
import { PlacesContext } from "./PlacesContext"

// Informacion que se almacena en memoria
const INITAL_STATE: PlacesStates = {
  isLoading: true,
  userLocation: undefined,
}

export const PlacesProvider = ({ children }: PlacesProps) => {
  return (
    <PlacesContext.Provider
      value={{
        isLoading: true,
        userLocation: undefined,
      }}>
        {children}
    </PlacesContext.Provider>
  );
};
