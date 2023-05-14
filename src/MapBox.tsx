import { PlacesProvider } from './context';
import { HomePage } from './pages/HomePage';

export const MapBox = (): JSX.Element => {
  return (
    <PlacesProvider>
      <HomePage />
    </PlacesProvider>
  )
}
