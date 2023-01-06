import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/R.png";
function NavBar() {
  const location = useLocation().pathname;

  const pokemon = () => {
    return (
      <header>
        <nav>
            <div className="logo"><Link to="/"><img src={logo} alt="Logo"/></Link></div>
            <ul className="mainMenu">
                <li><Link to="/create"><p href="#">Create</p></Link></li>
            </ul>
        </nav>
      </header>
    );
  };

  const create = () => {
    return (
      <header>
        <nav>
        <div className="logo"><Link to="/"><img src={logo} alt="Logo"/></Link></div>
            <ul className="mainMenu">
              <li><Link to="/pokemon"><p href="#">Pokemon</p></Link></li>
            </ul>
        </nav>
       
      </header>
    );
  };

  const all = () => {
    return (
      <header>
        <nav>
            <div className="logo"><img src={logo} alt="Logo"/></div>
            <ul className="mainMenu">
            <li> <Link to="/"><p value="Home"href="#">Home</p> </Link></li>
               
               <li><Link to="/pokemon"><p href="#">Pokemon</p></Link></li>
               <li><Link to="/create"><p href="#">Create</p></Link></li>
             
            </ul>
        </nav>
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
};


export default NavBar;