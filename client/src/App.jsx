import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import Profile from "./pages/ProfilePage/ProfilePage";
import useAuth from "./hooks/useAuth.js";
import Skills from "./pages/Skills/Skills.jsx";
import EmailVerify from "./pages/EmailVerify/EmailVerify.jsx"
import PasswordReset from './pages/PasswordReset/PasswordReset.jsx'
import PeoplePage from "./pages/PeoplePage/PeoplePage.jsx";
import ContentCreationPage from "./pages/ContentCreationPage/ContentCreationPage.jsx";
import UserProfilePage from "./pages/ProfilePage/UserProfilePage.jsx";

function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index Component={Home} />
          <Route path="signup" element={token ? <Navigate to="/" /> : <SignUp />} />
          <Route path="login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/forgot-password/*" element={<PasswordReset />} />
          <Route path="email-verify/:verification_token" element={<EmailVerify />}/>
            <Route path="content/*" element={<ContentCreationPage />}/>
          <Route element={<RequireAuth />}>
            <Route path="me" Component={Profile} />
            <Route path="skills" Component={Skills} />
            <Route path="users/:username" Component={UserProfilePage} />
            <Route path="people/*" element={<PeoplePage />}/>
          </Route>
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
