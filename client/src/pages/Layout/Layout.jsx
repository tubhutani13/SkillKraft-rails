import { Outlet, Link } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
import MessageDisplay from "../../components/Message/MessageDisplay";

const Layout = () => {
  return (
    <>
      <NavBar />
      <MessageDisplay />
      <Outlet />
    </>
  );
};

export default Layout;
