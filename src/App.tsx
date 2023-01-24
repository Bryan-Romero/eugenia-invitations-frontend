import React from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import CreateInvitation from "./pages/CreateInvitation";
import InvitationDetail from "./pages/InvitationDetail";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import PageError from "./pages/PageError";
import { useAppSelector } from "./app/hooks";
import { selectIsLogin } from "./features/auth/authSlice";

function App() {
  const isLogin = useAppSelector(selectIsLogin);

  return (
    <div className="bg-gray-300 flex flex-1 flex-col w-screen h-screen overflow-y-auto">
      <NavBar />
      <Routes>
        <Route path="/" element={isLogin ? <Home /> : <Login />} />
        {isLogin && (
          <Route path="/createInvitation" element={<CreateInvitation />} />
        )}
        <Route path="/createAccount" element={<CreateUser />} />
        <Route path="/changePassword/:token" element={<ChangePassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/invitationDetail/:tokenToShare"
          element={<InvitationDetail />}
        />
        <Route path="/*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
