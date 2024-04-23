import { Outlet, Link } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
import MessageDisplay from "../../components/Message/MessageDisplay";
import ChatListToggle from "../../components/ChatList/ChatList";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const { token } = useAuth();

  return (
    <>
      <NavBar />
      <MessageDisplay /> 
      <Outlet />
      {token && <ChatListToggle />}
    </>
  );
};

export default Layout;
