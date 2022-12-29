import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, resetPage } from "../redux/actions/index";
import { currentPage } from "../redux/actions/index";

function useFilter(filterValidations, initialState) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [state, setState] = useState(filters);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state)=>state.types)

  useEffect(() => {
    filterValidations(state, dispatch, addFilter,currentPage);
  }, [state]);


  function nameOptions(pokemons, pokemonName) {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
    );
    return filteredPokemons.map((e) => <option key={e.name} value={e.name} />);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClick = () => {
    setState(initialState);
    dispatch(resetPage());
  };

  return {
    state,
    loading,
    response,
    handleChange,
    pokemons,
    nameOptions,
    handleClick,
    types
  };
}

export default useFilter;
