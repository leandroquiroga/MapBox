import { createContext } from "react";
import { PlacesContextProps } from "../interfaces/interfaces";



// El contexto es el que se expone a los demas componentes
export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);