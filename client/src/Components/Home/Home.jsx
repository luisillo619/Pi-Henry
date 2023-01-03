import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Pokemon from "../../assets/Pokemon.png";
import Pikachu from "../../assets/4.png";
import songPokemon from "../../assets/pokemon-final-cut.mp3";

function Home() {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  function handleSong() {
    audioRef.current.play();
  }

  function handleEnded() {
    navigate("/pokemon");
  }

  return (
    <div className="containerHome">
      <audio ref={audioRef} src={songPokemon} onEnded={handleEnded} />
      <div className="containerContenidoHome">
        <img
          className="pokemonHome"
          src={Pokemon}
          alt="Imagen Pokemon"
          onClick={handleSong}
        />
        <img className="pikachuHome" src={Pikachu} alt="Imagen Pokemon" />
      </div>
    </div>
  );
}

export default Home;
