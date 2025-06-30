import { Outlet } from "react-router-dom";
import NavBar from "../nav-bar";
import Footer from "../footer";

export function Layout() {
  return (
    <>
      <NavBar />
      <main style={{}}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
