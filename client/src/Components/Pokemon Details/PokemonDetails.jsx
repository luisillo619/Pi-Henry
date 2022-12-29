import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePokemon, getOnePokemonID } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
function Deteils({ onePokemon }) {
  return (
    <>
      {onePokemon.length !== 0 ? (
        <div>
          <p style={{ fontSize: 20 }}>
            {onePokemon.name} N.º {onePokemon.id}
          </p>
          {onePokemon.types.map((e) => {
            return <p key={e}>{e}</p>;
          })}
          <img
            style={{ width: 150, height: 100 }}
            src={onePokemon.image}
            alt={onePokemon.name}
          />

          {/* crear una grafica, puntos base */}
          <p>PS: {onePokemon.life}</p>
          <p>Attack: {onePokemon.attack}</p>
          <p>Defense: {onePokemon.defense}</p>
          {/* /////////////////// */}
          <p>Height: {onePokemon.height}</p>
          <p>Weight: {onePokemon.weight}</p>
        </div>
      ) : (
        "Cargando"
      )}
    </>
  );
}

function CreatedPokemonDetails({ handleClick, id }) {
  return (
    <>
      <button id={id} onClick={handleClick}>
        Delete Pokemon
      </button>
    </>
  );
}

function PokemonDetails() {
  const navigate = useNavigate();
  const pokemonId = useParams().id;
  const dispatch = useDispatch();
  const onePokemon = useSelector((state) => state.onePokemon);

  useEffect(() => {
    dispatch(getOnePokemonID(pokemonId));
  }, [pokemonId]);


  const handleClick = (e) => {
    dispatch(deletePokemon(e.target.id));
    navigate("/pokemon");
  };

  return (
   
    <div>
      <NavBar/>
      <Deteils onePokemon={onePokemon} />
      {pokemonId.split("").length === 36 && (
        <CreatedPokemonDetails handleClick={handleClick} id={pokemonId} />
      )}
      {/* aqui por si no hay pokemons, renderizar un not found y un boton para regresar al home */}
    </div>
  );
}

export default PokemonDetails;
