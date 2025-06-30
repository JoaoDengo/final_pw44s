import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export function RequireAuth() {
  const { authenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return authenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
