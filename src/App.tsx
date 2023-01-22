import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateInvitation from "./pages/CreateInvitation";
import InvitationDetail from "./pages/InvitationDetail";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import PageError from "./pages/PageError";
import { RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { getInvitationsService } from "./services/getInvitationsService";
import {
  invitations,
  loadingInvitationsFalse,
  loadingInvitationsTrue,
} from "./features/invitations/invitationsSlice";
import { logout } from "./features/auth/authSlice";

function App() {
  const navigate = useNavigate()
  const isLogin = useSelector(
    (state: RootState) => state.auth.authReducer.isLogin
  );
  const token = useSelector((state: RootState) => state.auth.authReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(loadingInvitationsTrue());
      getInvitationsService(token)
        .then((res) => {
          dispatch(invitations(res));
          dispatch(loadingInvitationsFalse());
        })
        .catch((err) => {
          console.error(err);
          dispatch(loadingInvitationsFalse());
          dispatch(logout());
          navigate("/");
        });
    }
  }, []);

  return (
    <div className="bg-gray-300 flex flex-1 flex-col w-screen h-screen overflow-y-auto">
      <NavBar />
      <Routes>
        <Route path="/" element={isLogin ? <Home /> : <Login />} index />
        {isLogin && (
          <Route path="/createInvitation" element={<CreateInvitation />} />
        )}
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/changePassword/:token" element={<ChangePassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/invitationDetail/:token?"
          element={<InvitationDetail />}
        />
        <Route path="/*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
