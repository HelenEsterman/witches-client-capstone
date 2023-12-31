import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar pb-10 nav-bar-opacity-layer">
      <li className="navbar__item pl-10">
        <img
          src="https://images.nightcafe.studio/jobs/52gDVHFNtqNSTNzEXp6G/52gDVHFNtqNSTNzEXp6G--1--l0sa8.jpg?tr=w-1600,c-at_max"
          alt="witch reading spell book with magic emanating from hand"
        />
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/spells"}
        >
          Spells
        </NavLink>
      </li>
      <li className="navbar__item">
        <img
          src="https://images.nightcafe.studio/jobs/xGmPHuGQAb604djmdupn/xGmPHuGQAb604djmdupn--1--fab4f.jpg?tr=w-1600,c-at_max"
          alt="magical forest with a shelf full of bottles and vials of ingredients"
        />
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/my-ingredients"}
        >
          My Ingredients
        </NavLink>
      </li>
      <li className="navbar__item">
        <img
          src="https://images.nightcafe.studio/jobs/qWIHjteC3ljXqdTbFnhy/qWIHjteC3ljXqdTbFnhy--1--karo4.jpg?tr=w-1600,c-at_max"
          alt="witch home"
        />
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      {localStorage.getItem("witches_token") !== null ? (
        <li className="navbar__item">
          <button
            className="underline text-emerald-500 hover:text-indigo-400"
            onClick={() => {
              localStorage.removeItem("witches_token");
              navigate("/login");
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </li>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-indigo-400 hover:text-emerald-500"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-indigo-400 hover:text-emerald-500"
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
