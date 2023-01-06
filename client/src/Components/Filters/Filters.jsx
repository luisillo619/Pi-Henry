import React from "react";
import useFilter from "../../hooks/useFilter";
import { optionsSorted } from "../../helpers/options";
import "./Filters.css";

// Estado Inicial
const initialState = {
  pokemonsFrom: "",
  pokemonsSorted: "",
  pokemonsTypes: "",
  pokemonNames: "",
};


// Componente que ayuda a rendirizar select-option, en los input de filtrado
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


// Se envia el estado con todas las validaciones a redux
const filterValidations = (state, dispatch, addFilter) => {
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


// Componente que guarda un estado de todos los filtros y ordenamientos que se apliquen a los Pokemons
const Filters = () => {

  // Se mandan como props el validador y el estado inicial a useFilter
  const { state, handleChange, pokemons, nameOptions, handleClick, types } =
    useFilter(filterValidations, initialState);

  // Renderizado de las opciones para filtrar
  return (
    <div className="container-Filters">
      {/* reiniciar */}
      <button onClick={handleClick}>Reiniciar</button>

      {/* pokemonsFrom */}
      <div>
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
      </div>

      {/* pokemonsSorted */}
      <div>
        <label htmlFor="pokemonsSorted">Sort pokemon by:</label>
        <Select
          options={optionsSorted}
          value={state.pokemonsSorted}
          onChange={handleChange}
          name="pokemonsSorted"
        />
      </div>

      {/* pokemonsTypes */}
      <div>
        <label htmlFor="pokemonsTypes">pokemons Types:</label>
        <Select
          options={types} // Agregar los tipos de la DB
          value={state.pokemonsTypes}
          onChange={handleChange}
          name="pokemonsTypes"
        />
      </div>

      {/* pokemonNames */}
      <div>
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
    </div>
  );
};

export default Filters;
