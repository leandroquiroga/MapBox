import { useContext } from "react";
import { Layaout} from "../components";
import { Footer } from "./Footer";
import { PlacesContext } from "../context";

export const HomePage = (): JSX.Element => {

  const { showFooter } = useContext(PlacesContext);
  return (
    <section>
        <Layaout />
      {(showFooter) && <Footer />}
    </section>
  );
}
