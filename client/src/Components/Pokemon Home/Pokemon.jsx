import { Link } from "react-router-dom";
import React from "react";
import "./Pokemon.css";
function Pokemon({ pokemonId, pokemonName, pokemonTypes, pokemonImage }) {
  return (
    <div className="background-Card">
      <div className="containerCardPokemon" key={pokemonId}>
        <img className="imagenesPokemon" src={pokemonImage} />
        <Link to={`/pokemon/${pokemonId}`}>
          <p style={{ fontSize: 10 }}>{pokemonName}</p>
        </Link>
        <div>
          <p>Type:</p>
          {pokemonTypes.map((e) => {
            return <p key={e}>{e}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
