import { useContext, useEffect, useState } from "react";
import { MapsContext, PlacesContext } from "../context";
import { calculatorDistanceAndMinutes } from "../helpers";
import { Step } from "../interfaces/interfaces";
import { ButtonRoutingProfile } from ".";

type DistanceAndTime = {
  kilometers: number;
  minutes: number;
};

export const Aside = () => {
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [timeDistance, setTimeDistance] = useState<DistanceAndTime>({
    kilometers: 0,
    minutes: 0,
  });
  const { instructions, bookmarked } = useContext(MapsContext);
  const { showAside, setShowAside, infoPlaces, setInfoPlaces } = useContext(PlacesContext);

  useEffect(() => {
    setTime(instructions?.routes[0].duration);
    setDistance(instructions?.routes[0].distance);

    setTimeDistance(calculatorDistanceAndMinutes(distance, time));
    setSteps(instructions?.routes[0].legs[0].steps);
  }, [time, distance, instructions]);

  const { kilometers, minutes } = timeDistance;

  // Reseteamos todos los valores al cerrar al aside
  const handleCloseOffcanvas = () => {
    setShowAside(false);
    setSteps([]);
    setTime(0);
    setDistance(0);
    setTimeDistance({ kilometers: 0, minutes: 0 });
    setInfoPlaces('');
  }

  return (
    <>
      <section
        className={`${
          showAside
            ? `offcanvas offcanvas.offcanvas-end`
            : `offcanvas_hidden offcanvas.offcanvas-end_hidden`
        }`}
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <header className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Indicaciones:
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => handleCloseOffcanvas()}
          />
        </header>
        <article className="offcanvas-body">
          <section className="d-flex justify-content-between flex-column my-1 p-1">
            <article className="flex-column">
              <h5>Informacion: </h5>
              <h6>De: {instructions?.waypoints[0].name}</h6>
              <h6>Hasta: {infoPlaces} </h6>
              <h6>Distancia: {kilometers} Km</h6>
              <h6>Duracion: {minutes} min</h6>
            </article>

            <article
              className="flex-column scrollspy-example"
              data-bs-spy="scroll"
              data-bs-target="#list-example"
              data-bs-smooth-scroll="true"
              tabIndex={0}>
              <h5>Pasos: </h5>
              <ol>
                {steps?.map((step, index) => (
                  <li key={index} className="list-group-item my-2">
                    {++index}- {step.maneuver.instruction}
                  </li>
                ))}
              </ol>
            </article>
          </section>
        </article>
        <article className="d-flex w-100 align-items-center justify-content-center p-3">
          {bookmarked && <ButtonRoutingProfile />}
        </article>
      </section>
    </>
  );
};
