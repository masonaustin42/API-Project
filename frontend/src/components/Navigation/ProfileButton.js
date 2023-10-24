import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logOut } from "../../store/session";

import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const dropdownClass = "profile-dropdown" + (dropdown ? "" : " hidden");

  const logout = (e) => {
    e.preventDefault();
    dispatch(logOut());
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
        <li>{user.username}</li>
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.email}</li>
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
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </>
    );
  }

  return (
    <div className="profile-menu">
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
