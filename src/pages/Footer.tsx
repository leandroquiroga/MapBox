import { useContext } from "react"
import { PlacesContext } from "../context"

export const Footer = () => {
  const { toogleShowComponent, showFooter } = useContext(PlacesContext);

  return (
    <footer
      className={`${
        showFooter ? `footer_container_full `: `footer_container_hide`
      } `}>
      <button
        className="btn btn-close button_close"
        onClick={() => toogleShowComponent()}></button>
      MenuBar
    </footer>
  );
}
