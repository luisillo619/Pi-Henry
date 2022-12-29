import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/R.png";
function NavBar() {
  const location = useLocation().pathname;

  //usar mejor el estilo que es como un objeto
  const pokemon = () => {
    return (
      <div className="NavBar">
        <img src={logo} alt="" />
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/create">
            <li>Create</li>
          </Link>
        </ul>
      </div>
    );
  };

  const create = () => {
    return (
      <div className="NavBar">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>Home</li>
          </Link>
          <Link to="/pokemon" style={{ textDecoration: "none" }}>
            <li>Pokemon</li>
          </Link>
        </ul>
      </div>
    );
  };

  const all = () => {
    return (
      <div className="NavBar">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>Home</li>
          </Link>
          <Link to="/pokemon" style={{ textDecoration: "none" }}>
            <li>Pokemon</li>
          </Link>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <li> Create</li>
          </Link>
        </ul>
      </div>
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
