import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/airdnd_logo_full.png";

function Navigation({ isLoaded }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink exact to="/">
          <img src={logo} alt="AirDnD Logo" />
        </NavLink>
      </div>

      {isLoaded && <ProfileButton />}
    </nav>
  );
}

export default Navigation;
