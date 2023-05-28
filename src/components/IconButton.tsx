import logoCar from '../assets/cars.svg';
import logoBike from '../assets/bikes.svg';
import logoWalk from '../assets/walking.svg';


export const IconButton = ({ routeProfile }: { routeProfile: string}): JSX.Element => {
  return (
    <>
      {
        routeProfile === "auto" ? ( <img src={logoCar} alt={routeProfile} />)
          : routeProfile === "caminando" ? (<img src={logoWalk} alt={routeProfile} />)
            : routeProfile === "bicicleta" && ( <img src={logoBike} alt={routeProfile} />
      )}
    </>
  );
};
