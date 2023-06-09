import { createContext } from "react";
import { MapsContextProps } from "../../interfaces/interfaces";

// El contexto es el que se expone a los demas componentes
export const MapsContext = createContext<MapsContextProps>({} as MapsContextProps);