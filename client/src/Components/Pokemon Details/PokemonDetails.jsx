import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePokemonID, resetOnePokemonID } from "../../redux/actions";
import { colorTypes } from "../../helpers/colorTypesFunction";
import NavBar from "../NavBar/NavBar";
import "./PokemonDetails.css";
import { useRef } from "react";

function MyCanvas() {
  const canvasRef = useRef(null);
  const onePokemon = useSelector((state) => state.onePokemon);
  console.log(onePokemon.life);
  useEffect(() => {
    // Lógica para crear la gráfica

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const data = [onePokemon.life, onePokemon.attack, onePokemon.defense];
    const maxValue = 250;
    const barWidth = 130 / data.length;
    const barSpacing = 75; // Deja 10 pixels de espacio entre barras
    const colors = ["#14cc60", "#db4c40", "#7678ed"];

    // Calcula el alto máximo de las barras en función del alto del canvas y el valor máximo
    const maxBarHeight = canvas.height * (maxValue / 250);

    for (let i = 0; i < data.length; i++) {
      // Calcula el alto de la barra como una proporción del valor máximo y el alto máximo de las barras
      const barHeight = (data[i] / maxValue) * maxBarHeight;
      const x = i * barWidth + i * barSpacing; // Añade espacio entre barras
      const y = canvas.height - barHeight;

      ctx.fillStyle = colors[i]; // Asigna color a la barra
      ctx.fillRect(x, y, barWidth, barHeight);

      // Dibuja el borde del tamaño total de la barra
      ctx.strokeRect(x, 0, barWidth, maxBarHeight);
    }
  }, [onePokemon]);

  return (
    <div className="pokemon-stats-info">
      <div  className="canvas">
        <canvas ref={canvasRef}/>
      </div>
      <div className="stats">
        <p>PS: {onePokemon.life}</p>
        <p>Attack: {onePokemon.attack}</p>
        <p>Defense: {onePokemon.defense}</p>
      </div>
    </div>
  );
}

function Deteils({ onePokemon }) {
  return (
    <>
      {onePokemon.length !== 0 ? (
        <div className="pokemon-details">
          <div className="name-pokemon-details">
            <p className="parrafo-pokemon-details">{onePokemon.name}</p>
          </div>

          <div className="card-details">
            <div className="container-image-and-card-details">
              <div className="container-image">
                <img
                  // className="image-card-details"
                  src={onePokemon.image}
                  alt={onePokemon.name}
                />
              </div>
              <div className="container-stats">
                <MyCanvas
                  life={onePokemon.life}
                  attack={onePokemon.attack}
                  defense={onePokemon.defense}
                />
              </div>
            </div>

            <div className="container-pokemon-characteristics_types">
              <div className="container-pokemon-characteristics">
                <h1>Height </h1>
                <p>{onePokemon.height / 10} m</p>

                <h1>Weight </h1>
                <p>{onePokemon.weight / 10} kg</p>

                <h1>Pokémon N.º </h1>
                <p>{onePokemon.id}</p>

                <h1>Speed </h1>
                <p>{onePokemon.speed}</p>
              </div>

              <div className="container-pokemon-types">
                <p className="paragraph-types">Types:</p>

                {onePokemon.types.map((e) => {
                  let color = colorTypes(e);
                  return (
                    <p
                      className="pokemon-types"
                      style={{ background: color }}
                      key={e}
                    >
                       
                      {e}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Cargando"
      )}
    </>
  );
}

function PokemonDetails() {
  const pokemonId = useParams().id;
  const dispatch = useDispatch();
  const onePokemon = useSelector((state) => state.onePokemon);

  useEffect(() => {
    dispatch(getOnePokemonID(pokemonId));
    return () => {
      dispatch(resetOnePokemonID());
    };
  }, []);

  return (
    <div className="container-PokemonDetails">
      <div className="navBar-PokemonDetails">
        <NavBar />
      </div>

      <Deteils onePokemon={onePokemon} pokemonId={pokemonId} />
    </div>
  );
}

export default PokemonDetails;
