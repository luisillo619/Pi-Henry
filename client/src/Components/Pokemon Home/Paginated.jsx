import React, { useState } from "react";
import { generator } from "../../helpers/pageGeneratorFunction";
import { useDispatch, useSelector } from "react-redux";
import { currentPage as setCurrentPage } from "../../redux/actions";
import "./Paginated.css";
import { useEffect } from "react";

function Paginated() {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.totalPages);
  const currentPage = useSelector((state) => state.currentPage);
  const filters = useSelector((state) => state.filters);

  const totalButtons = generator(totalPages);

  // Agregamos un estado para almacenar el rango actual de botones
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(5);

  useEffect(() => {
    setRangeStart(1);
    setRangeEnd(5);
  }, [filters]);

  //PASAR LOS ESTADOS DE RANGO A REDUX
  // useEffect(() => {
  //   dispatch(setCurrentPage(rangeStart));
  //   // falta que funcione a la par del boton reiniciar del filters
  // }, [rangeStart]);

  // Función para mover el rango a la derecha
  const handleNext = () => {
    if (rangeEnd < totalPages) {
      setRangeStart(rangeStart + 5);
      setRangeEnd(rangeEnd + 5);
    }
  };

  // Función para mover el rango a la izquierda
  const handlePrev = () => {
    if (rangeStart > 1) {
      setRangeStart(rangeStart - 5);
      setRangeEnd(rangeEnd - 5);
    }
  };

  // Filtrar el arreglo de botones para mostrar solo los que están en el rango actual
  const buttons = totalButtons
    .filter((e) => e >= rangeStart && e <= rangeEnd)
    .map((e) => {
      if (!totalButtons.includes(e)) {
        return null;
      }
      const buttonClass = e === currentPage ? "button active" : "button";
      return (
        <button
          key={e}
          id={e}
          className={buttonClass}
          onClick={() => dispatch(setCurrentPage(e))}
        >
          {e}
        </button>
      );
    });

  return (
    <div>
      {/* Mostrar botón Anterior si no estamos en la primera página */}
      {rangeStart > 1 && <button onClick={handlePrev}>Anterior</button>}
      {buttons}
      {/* Mostrar botón Siguiente si no estamos en la última página */}
      {rangeEnd < totalPages && <button onClick={handleNext}>Siguiente</button>}
    </div>
  );
};


export default Paginated;