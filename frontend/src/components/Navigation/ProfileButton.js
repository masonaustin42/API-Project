import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();

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

  return (
    <>
      <button onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>

      <ul className={dropdownClass} ref={dropdownRef}>
        <li>{user.username}</li>
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
