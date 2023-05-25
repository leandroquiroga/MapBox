import { ChangeEvent, useRef } from "react"

export const SearchLocation = () => {

  // Creacion del debounce
  const debounce = useRef<NodeJS.Timeout>();

  // Esta funcion permite borrrar el valor que contenemos en el timeout del useRef
  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {

    // Verificamos si hay un valor
    if (debounce.current) clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      // TODO: Realizar consulta;

      console.log('Value:', event.target.value)
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
    </section>
  )
}
