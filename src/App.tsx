import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateInvitation from "./pages/CreateInvitation";
import InvitationDetail from "./pages/InvitationDetail";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { VerifyTokenService } from "./services/VerifyTokenService";
import { verefyToken, logout, invitations } from "./features/auth/authSlice";
import PageError from "./pages/PageError";
import { getInvitationsService } from "./services/getInvitationsService";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.jwt) {
      VerifyTokenService(auth.jwt)
        .then((res) => {
          dispatch(verefyToken(res));
          getInvitationsService(auth.jwt)
            .then((res) => {
              dispatch(invitations(res));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }, []);

  return (
    <div className="bg-gray-300 flex flex-1 flex-col w-screen h-screen overflow-y-auto">
      <NavBar />
      <Routes>
        <Route path="/" element={auth.isLogin ? <Home /> : <Login />} />
        {auth.isLogin && (
          <Route path="/createInvitation" element={<CreateInvitation />} />
        )}
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/changePassword/:token" element={<ChangePassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/invitationDetail/:token" element={<InvitationDetail />} />
        <Route path="/*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;

// import type { RootState } from '../../app/store'
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from './counterSlice'

// const count = useSelector((state: RootState) => state.counter.value)
// const dispatch = useDispatch()

// onClick={() => dispatch(increment())}

// onClick={() => dispatch(decrement())}
