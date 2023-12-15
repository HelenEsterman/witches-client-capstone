import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../nav/NavBar";

export const Authorized = () => {
  if (localStorage.getItem("witches_token")) {
    return (
      <>
        <NavBar />

        <Outlet />
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
