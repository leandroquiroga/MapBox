import logoCar from '../assets/cars.svg';
import logoBike from '../assets/bikes.svg';
import logoWalk from '../assets/walking.svg';


export const IconButton = ({ routeProfile }: { routeProfile: string}): JSX.Element => {
  return (
    <>
      {routeProfile === "driving" ? (
        <img src={logoCar} alt={routeProfile} />
      ) : routeProfile === "walking" ? (
        <img src={logoWalk} alt={routeProfile} />
      ) : (
        routeProfile === "cycling" && <img src={logoBike} alt={routeProfile} />
      )}
    </>
  );
};
