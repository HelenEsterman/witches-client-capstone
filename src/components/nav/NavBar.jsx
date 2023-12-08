import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar pb-10">
      <li className="navbar__item pl-10">
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/spells"}
        >
          Spells
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/my-ingredients"}
        >
          Ingredients
        </NavLink>
      </li>
      {localStorage.getItem("witches_token") !== null ? (
        <li className="navbar__item">
          <button
            className="underline text-blue-600 hover:text-purple-700"
            onClick={() => {
              localStorage.removeItem("witches_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}{" "}
    </ul>
  );
};
