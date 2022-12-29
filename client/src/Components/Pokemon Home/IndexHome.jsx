import React from "react";
import PokemonsHome from "./PokemonsHome";
import Filters from "../Filters/Filters";
import Paginated from "./Paginated";
import "./IndexHome.css";
import BackTotopButton from "../Scroll/BackTotopButton";
import NavBar from "../NavBar/NavBar";


function Index_Home() {
  return (
    <div className="containerIndexHome">
      <NavBar />
      <Filters />
      <Paginated />
      <PokemonsHome />
      <BackTotopButton />
    </div>
  );
}

export default Index_Home;