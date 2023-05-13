import { PlacesContext, PlacesProvider } from "./context"

export const MapBox = (): JSX.Element => {
  return (
    <PlacesProvider>
      <h1>Hola Mundo</h1>
    </PlacesProvider>
  )
}
