import { useContext } from "react"
import { MapsContext, PlacesContext } from "../context"
import { ButtonRoutingProfile } from "../components";

export const Footer = () => {
  const { setShowFooter, showFooter } = useContext(PlacesContext);
  const { bookmarked } = useContext(MapsContext);


  const handleHidenMenu = () => setShowFooter(false);
  return (
    <footer
      className={`${
        showFooter
          ? `animate__animated animate__slideInUp footer_container_full`
          : `animate__animated animate__slideInDown footer_container_hiden`
      } `}>
      <section className="d-flex w-100 align-items-center justify-content-between position-fixed top-0">
        {bookmarked && <ButtonRoutingProfile />}
        <button className="btn btn-close" onClick={handleHidenMenu}></button>
      </section>

      <section className="d-flex justify-content-center flex-column align-items-center">
        <article>1</article>
        <article>1</article>
        <article>1</article>
        <article>1</article>
      </section>
    </footer>
  );
}
