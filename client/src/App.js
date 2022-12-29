import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Index_Home from "./Components/Pokemon Home/IndexHome.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePokemonName, getPokemons, getTypes } from "./redux/actions";
import CreatePokemon from "./Components/Form/CreatePokemon";
import PokemonDetails from "./Components/Pokemon Details/PokemonDetails";

function App() {
  const dispatch = useDispatch();
  const reloadPokemons = useSelector((state) => state.reloadPokemons);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, []);

  // create
  useEffect(() => {
    if (reloadPokemons) {
      dispatch(getOnePokemonName(reloadPokemons));
    }
  }, [reloadPokemons]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pokemon" element={<Index_Home />} />
        <Route path="pokemon/:id" element={<PokemonDetails />} />
        <Route path="/create" element={<CreatePokemon />} />
      </Routes>
    </div>
  );
}

export default App;
