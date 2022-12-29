import React from "react";
import useFilter from "../../hooks/useFilter";
import { optionsSorted} from "../../helpers/options";

function Select({ options, value, onChange, name }) {
  return (
    <select id={name} name={name} value={value} onChange={onChange}>
      <option value="Selected Option">Selected Option</option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

const initialState = {
  pokemonsFrom: "",
  pokemonsSorted: "",
  pokemonsTypes: "",
  pokemonNames: "",
};

const filterValidations = (state, dispatch, addFilter, currentPage) => {
  const validations = {};
  // pokemonsFrom
  validations.pokemonsFrom = state.pokemonsFrom;

  // pokemonsSorted
  if (state.pokemonsSorted !== "Selected Option") {
    validations.pokemonsSorted = state.pokemonsSorted;
  } else validations.pokemonsSorted = "";

  // pokemonsTypes
  if (state.pokemonsTypes !== "Selected Option") {
    validations.pokemonsTypes = state.pokemonsTypes;
  } else validations.pokemonsTypes = "";

  // pokemonNames
  validations.pokemonNames = state.pokemonNames;

  dispatch(addFilter(validations));
  
};

function Filters() {
  const {
    state,
    loading,
    response,
    handleChange,
    pokemons,
    nameOptions,
    handleClick,
    types
  } = useFilter(filterValidations, initialState);

  return (
    <div>
      {/* reiniciar */}
      <button onClick={handleClick}>Reiniciar</button>

      {/* pokemonsFrom */}
      <label htmlFor="All pokemons">All pokemons</label>
      <input
        type="radio"
        id="All pokemons"
        name="pokemonsFrom"
        onChange={handleChange}
        value="All pokemons"
        checked={state.pokemonsFrom === "All pokemons"}
      />
      <label htmlFor="Pokemons created">Pokemons created</label>
      <input
        type="radio"
        id="Pokemons created"
        name="pokemonsFrom"
        onChange={handleChange}
        value="Pokemons created"
        checked={state.pokemonsFrom === "Pokemons created"}
      />
      <label htmlFor="Pokemons not created">Pokemons not created</label>
      <input
        type="radio"
        id="Pokemons not created"
        name="pokemonsFrom"
        onChange={handleChange}
        value="Pokemons not created"
        checked={state.pokemonsFrom === "Pokemons not created"}
      />

      {/* pokemonsSorted */}
      <label htmlFor="pokemonsSorted">Sort pokemon by:</label>
      <Select
        options={optionsSorted}
        value={state.pokemonsSorted}
        onChange={handleChange}
        name="pokemonsSorted"
      />
      <br />

      {/* pokemonsTypes */}
      <label htmlFor="pokemonsTypes">pokemons Types:</label>
      <Select
        options={types} // Agregar los tipos de la DB
        value={state.pokemonsTypes}
        onChange={handleChange}
        name="pokemonsTypes"
      />

      {/* pokemonNames */}
      <label htmlFor="pokemonNames">Pokemons by name:</label>
      <input
        type="search"
        list="names"
        id="pokemonNames"
        name="pokemonNames"
        value={state.pokemonNames}
        onChange={handleChange}
        placeholder="Pokemon Name"
      />
      <datalist id="names">
        {nameOptions(pokemons, state.pokemonNames)}
      </datalist>
    </div>
  );
}

export default Filters;
