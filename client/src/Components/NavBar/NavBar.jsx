import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/R.png";
function NavBar() {
  const location = useLocation().pathname;

  //Pasar esto a navigate
  const pokemon = () => {
    return (
      <header className="NavBar">
        <img src={logo} alt="" />
        <ul>
          <Link to="/">
           <button className="botonNavBar"><li>Home</li></button> 
          </Link>
          <Link to="/create">
           <button className="botonNavBar"> <li>Create</li></button>
          </Link>
        </ul>
      </header>
    );
  };

  const create = () => {
    return (
      <header className="NavBar">
        <img src={logo} alt="" />
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
          <button className="botonNavBar"><li>Home</li></button> 
          </Link>
          <Link to="/pokemon" style={{ textDecoration: "none" }}>
          <button className="botonNavBar"><li>Pokemon</li></button> 
          </Link>
        </ul>
      </header>
    );
  };

  const all = () => {
    return (
      <header className="NavBar">
        <img src={logo} alt="" />
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
          <button className="botonNavBar"><li>Home</li></button> 
          </Link>
          <Link to="/pokemon" style={{ textDecoration: "none" }}>
          <button className="botonNavBar"><li>Pokemon</li></button> 
          </Link>
          <Link to="/create">
          <button className="botonNavBar"> <li>Create</li></button>
          </Link>
        </ul>
      </header>
    );
  };
  return (
    <>
      {location === "/pokemon" ? pokemon() : null}
      {location === "/create" ? create() : null}
      {location !== "/" && location !== "/pokemon" && location !== "/create"
        ? all()
        : null}
    </>
  );
}

export default NavBar;
