import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home = ({ setShowNavbar }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setShowNavbar(false);

    return () => {
      setShowNavbar(true);
    };
  }, [setShowNavbar]);
  return (
    <div className="home views opacity-layer">
      <div className="home-nav-bar flex justify-evenly">
        <Link to="/spells" className="home-choices">
          <div className="home-opacity-layer rounded-full mt-20"></div>
          <div className="home-nav-choices mt-10 font-custom text-white text-5xl black-text-shadow">
            Spells
          </div>
          <img
            src="https://images.nightcafe.studio/jobs/52gDVHFNtqNSTNzEXp6G/52gDVHFNtqNSTNzEXp6G--1--l0sa8.jpg?tr=w-1600,c-at_max"
            alt="witch reading spell book with magic emanating from hand"
            className="mt-20 rounded-full border border-4 purple-box-shadow"
          />
        </Link>
        <Link to="/my-ingredients" className="home-choices">
          <div className="home-opacity-layer rounded-full mt-20"></div>
          <div className="home-nav-choices mt-10 font-custom text-white text-5xl black-text-shadow">
            My Ingredients
          </div>
          <img
            src="https://images.nightcafe.studio/jobs/xGmPHuGQAb604djmdupn/xGmPHuGQAb604djmdupn--1--fab4f.jpg?tr=w-1600,c-at_max"
            alt="magical forest with a shelf full of bottles and vials of ingredients"
            className="mt-20 rounded-full border border-4 purple-box-shadow"
          />
        </Link>
      </div>
      <div className="home-logout-button-div">
        {localStorage.getItem("witches_token") !== null ? (
          <div className="home-logout absolute top-0 right-28 m-4">
            <button
              className="underline text-emerald-500 hover:text-indigo-400"
              onClick={() => {
                localStorage.removeItem("witches_token");
                navigate("/login");
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          <>
            <div className="home-logout">
              <Link
                className="text-left underline text-indigo-400 hover:text-emerald-500"
                to={"/login"}
              >
                Login
              </Link>
            </div>
            <div className="home-logout">
              <Link
                className="text-left underline text-indigo-400 hover:text-emerald-500"
                to={"/register"}
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
