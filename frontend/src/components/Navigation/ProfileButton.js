import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logOut } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const dropdownClass = "profile-dropdown" + (dropdown ? "" : " hidden");

  const logout = (e) => {
    e.preventDefault();
    dispatch(logOut());
    setDropdown(false);
    history.push("/");
  };

  const openMenu = () => {
    if (dropdown) return;
    setDropdown(true);
  };

  useEffect(() => {
    if (!dropdown) return;
    const closeMenu = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dropdown]);

  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <li>Hello, {user.firstName}</li>
        <li>{user.email}</li>
        <li>
          <NavLink to="/spots/current" onClick={() => setDropdown(false)}>
            Manage Spots
          </NavLink>
        </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            onButtonClick={() => setDropdown(false)}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
            onButtonClick={() => setDropdown(false)}
          />
        </li>
      </>
    );
  }

  return (
    <div className="profile-menu">
      {user ? <NavLink to="/spots/new">Create a Spot</NavLink> : null}
      <button onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-circle-user"></i>
      </button>

      <ul className={dropdownClass} ref={dropdownRef}>
        {sessionLinks}
      </ul>
    </div>
  );
}

export default ProfileButton;
