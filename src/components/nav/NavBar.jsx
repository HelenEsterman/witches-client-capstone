import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { getAllAvatarsAuthenticated } from "../../data/avatarData";

export const NavBar = () => {
  const [currentAvatar, setCurrentAvatar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllAvatarsAuthenticated().then((avatarArr) => {
      // Find the first avatar where is_owner is true
      const userAvatar = avatarArr.find(
        (avatarObj) => avatarObj.is_owner === true
      );

      // Set the current avatar only if one is found
      if (userAvatar) {
        setCurrentAvatar(userAvatar);
      }
    });
  }, []);

  return (
    <div className="nav-bar-background">
      <ul className="nav-bar pt-2 top-0 left-0 w-full flex items-start justify-evenly">
        <li className="navbar-item font-custom">
          <Link to={"/spells"}>
            <div className="nav-bar-opacity-layer rounded-full"></div>
            <div className="navbar-link text-white text-xl">Spells</div>
            <img
              src="https://images.nightcafe.studio/jobs/52gDVHFNtqNSTNzEXp6G/52gDVHFNtqNSTNzEXp6G--1--l0sa8.jpg?tr=w-1600,c-at_max"
              alt="witch reading spell book with magic emanating from hand"
              className="image"
            />
          </Link>
        </li>
        <li className="navbar-item font-custom">
          <Link to={"/my-ingredients"}>
            <div className="nav-bar-opacity-layer rounded-full"></div>
            <div className="navbar-link text-white text-xl">My Ingredients</div>
            <img
              src="https://images.nightcafe.studio/jobs/xGmPHuGQAb604djmdupn/xGmPHuGQAb604djmdupn--1--fab4f.jpg?tr=w-1600,c-at_max"
              alt="magical forest with a shelf full of bottles and vials of ingredients"
              className="image"
            />
          </Link>
        </li>
        <li className="navbar-item font-custom">
          <Link to={"/"}>
            <div className="nav-bar-opacity-layer rounded-full"></div>
            <div className="navbar-link text-white text-xl">Home</div>
            <img
              src="https://images.nightcafe.studio/jobs/qWIHjteC3ljXqdTbFnhy/qWIHjteC3ljXqdTbFnhy--1--karo4.jpg?tr=w-1600,c-at_max"
              alt="witch home"
              className="image"
            />
          </Link>
        </li>
        {localStorage.getItem("witches_token") !== null ? (
          <li className="navbar-item">
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
            <li className="navbar-item">
              <Link
                className="text-left underline text-indigo-400 hover:text-emerald-500"
                to={"/login"}
              >
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                className="text-left underline text-indigo-400 hover:text-emerald-500"
                to={"/register"}
              >
                Register
              </Link>
            </li>
          </>
        )}
        <li>
          <div className="avatar">
            <img
              src={currentAvatar.avatar_url}
              alt="your avatar chosen during registration"
              className=" rounded-3xl purple-box-shadow h-32 w-32 border border-4 border-indigo-700"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
