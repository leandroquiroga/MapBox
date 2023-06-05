import { useContext, useEffect, useState } from "react"
import { MapsContext } from "../context"
import { calculatorDistanceAndMinutes } from "../helpers";

type DistanceAndTime = {
  kilometers: number
  minutes: number 
}

export const RoutesInstructions = () => {
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [timeDistance, setTimeDistance] = useState<DistanceAndTime>({kilometers: 0, minutes: 0});
  const { instructions } = useContext(MapsContext);

  // Seteamos distancia y tiempo
  useEffect(() => {
    setTime(instructions?.routes[0].duration);
    setDistance(instructions?.routes[0].distance);

    setTimeDistance(calculatorDistanceAndMinutes(distance, time));
  }, [time, distance, instructions]);

  const { kilometers, minutes } = timeDistance;

  return (
    <article className="d-flex flex-row my-5">
      <div className="flex-column p-2">
        <h6>De: {instructions?.waypoints[0].name}</h6>
        <h6>Hasta: {instructions?.waypoints[1].name}</h6>
        <h6>Distancia: {kilometers} Km</h6>
        <h6>Duracion: {minutes} min</h6>
      </div>
      <p>RoutesInstructions</p>
    </article>
  );
}
