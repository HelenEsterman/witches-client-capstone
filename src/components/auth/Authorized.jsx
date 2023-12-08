import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../nav/NavBar";

export const Authorized = () => {
  if (localStorage.getItem("witches_token")) {
    return (
      <>
        <NavBar />
        <main className="p-4">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
