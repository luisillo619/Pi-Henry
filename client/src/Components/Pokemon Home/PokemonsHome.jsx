import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { totalPages, currentPage as setCurrentPage } from "../../redux/actions";
import {
  pokemonsFrom,
  pokemonsSorted,
  pokemonsTypes,
  pokemonNames,
} from "../../helpers/filterFunctions";
import Pokemon from "./Pokemon";
import "./PokemonsHome.css";
function Pokemon_Home() {
  const dispatch = useDispatch();
  let pokemons = useSelector((state) => state.pokemons);
  const filters = useSelector((state) => state.filters);
  const currentPage = useSelector((state) => state.currentPage);
  const POKEMONS_PER_PAGE = 12;
  let pages = null;

  if (filters.pokemonsFrom)
    pokemons = pokemonsFrom(filters.pokemonsFrom, pokemons);

  if (filters.pokemonsSorted)
    pokemons = pokemonsSorted(filters.pokemonsSorted, pokemons);

  if (filters.pokemonsTypes)
    pokemons = pokemonsTypes(filters.pokemonsTypes, pokemons);

  if (filters.pokemonNames)
    pokemons = pokemonNames(filters.pokemonNames, pokemons);
  
  pages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE)

  useEffect(() => {
    dispatch(totalPages(pages));
    if (currentPage > pages) {
      dispatch(setCurrentPage(1));
    }
  }, [pages]);

  const rangoMayor = POKEMONS_PER_PAGE * currentPage;
  const rangoMenor = rangoMayor - POKEMONS_PER_PAGE;
  const displayPokemons = pokemons.slice(rangoMenor, rangoMayor);

  // si no hay concidencias, agregar la foto de pikachu triste
  return (
    <div className="containerPokemonsHome">
    {displayPokemons.map(e=>{
   return <Pokemon key={e.id} pokemonId={e.id} pokemonName={e.name} pokemonTypes={e.types} pokemonImage={e.image} />
    })}
     
    </div>
   
  );
}

export default Pokemon_Home;
