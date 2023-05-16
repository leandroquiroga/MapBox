import { MapsProvider, PlacesProvider } from './context';
import { HomePage } from './pages/HomePage';

export const MapBox = (): JSX.Element => {
  return (
    <PlacesProvider>
      <MapsProvider>
        <HomePage />
      </MapsProvider>
    </PlacesProvider>
  )
}
