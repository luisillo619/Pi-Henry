import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, resetPage } from "../redux/actions/index";
import { currentPage } from "../redux/actions/index";

// hook personalizado ayuda a mandar los filtros a redux
function useFilter(filterValidations, initialState) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [state, setState] = useState(filters);

  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state)=>state.types)

  useEffect(() => {
    filterValidations(state, dispatch, addFilter);
  }, [state]);


  // las props vienen de el html de filter.jsx, Sirve para mostrar las sugerencias al momento de estar buscando al Pokemon por nombre
  function nameOptions(pokemons, pokemonName) {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
    );
    return filteredPokemons.map((e) => <option key={e.name} value={e.name} />);
  }

  // setea cada cambio del html al estado 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // handle que maneja al boton Reiniciar
  const handleClick = () => {
    setState(initialState);
    dispatch(resetPage());
  };

  return {
    state,
    handleChange,
    pokemons,
    nameOptions,
    handleClick,
    types
  };
}

export default useFilter;
