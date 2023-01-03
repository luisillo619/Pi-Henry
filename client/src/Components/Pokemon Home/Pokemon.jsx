import { Link } from "react-router-dom";
import React from "react";
import { deletePokemon } from "../../redux/actions";
import "./Pokemon.css";
import { useDispatch } from "react-redux";
import { colorTypes } from "../../helpers/colorTypesFunction";
function Pokemon({ pokemonId, pokemonName, pokemonTypes, pokemonImage }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(deletePokemon(e.target.id));
    window.location.reload();
  };
  function CreatedPokemonDetails({ handleClick, id }) {
    return (
      <>
        <button id={id} onClick={handleClick}>
          Delete
        </button>
      </>
    );
  }
  return (
    <div className="background-Card">
      <div className="containerCardPokemon" key={pokemonId}>
        <img className="imagenesPokemon" src={pokemonImage} />

        {pokemonId.toString().split("").length === 36 && (
          <CreatedPokemonDetails handleClick={handleClick} id={pokemonId} />
        )}
      </div>
      <div className="containerData">
        <Link style={{ textDecoration: "none" }} to={`/pokemon/${pokemonId}`}>
          <p className="pokemon-Name">{pokemonName}</p>
        </Link>
        
                       
       <div className="pokemon-Types">
       {pokemonTypes.map((e) => {
        let color = colorTypes(e);
          return <p  style={{ background: color }} key={e}>{e}</p>;
        })}
       </div>
       
      </div>
    </div>
  );
}

export default Pokemon;
