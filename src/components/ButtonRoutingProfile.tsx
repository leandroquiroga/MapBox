import { IconButton } from ".";


export const ButtonRoutingProfile = (): JSX.Element => {
  //TODO: Utilizar contexto de la aplicacion para poder manejar los valores de cada boton
  const arrRoutingProfile = ["auto", "caminando", "bicicleta",]

  return (
    <section className="input-customer-radio">
      {arrRoutingProfile.map((route, index) => (
        <button
          value={route}
          className="btn btn-light btn-sm my-1 rounded-3"
          key={index}
        >
          <IconButton routeProfile={route} />
        </button>
      ))}
    </section>
  );
}
