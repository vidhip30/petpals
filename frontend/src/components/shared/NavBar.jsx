import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
