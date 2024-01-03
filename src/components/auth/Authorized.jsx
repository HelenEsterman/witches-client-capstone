import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../nav/NavBar";

export const Authorized = ({ showNavbar }) => {
  if (localStorage.getItem("witches_token")) {
    return (
      <>
        {showNavbar && <NavBar />}

        <Outlet />
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
