import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context";
import { SearchResult } from "./SearchResult";

export const SearchLocation = () => {

  const { searchPlacesByQuery } = useContext(PlacesContext);
  // Creacion del debounce
  const debounce = useRef<NodeJS.Timeout>();

  // Esta funcion permite borrrar el valor que contenemos en el timeout del useRef
  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {

    // Verificamos si hay un valor
    if (debounce.current) clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      searchPlacesByQuery(event.target.value)
    },800)
  };
  return (
    <section className="search-container">
      <input
        type="text"
        className="form-control"
        onChange={onQueryChanged}
        placeholder="Busque su destino"
      />
      <SearchResult />
    </section>
  );
}
