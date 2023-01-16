import React from 'react';
import { Routes, Route } from "react-router-dom";
import ForgotPassword from './pages/ForgotPassword';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import CreateInvitation from './pages/CreateInvitation';
import InvitationsList from './components/InvitationsList';
import InvitationDetail from './pages/InvitationDetail';

function App() {
  return (
    <div className="bg-gray-300 flex flex-1 flex-col w-screen h-screen">
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/createAccount" element={<CreateAccount />}/>
          <Route path="/invitationsList" element={<InvitationsList />}/>
          <Route path="/createInvitation" element={<CreateInvitation />}/>
          <Route path="/forgotPassword" element={<ForgotPassword />}/>
          <Route path="/invitationDetail" element={<InvitationDetail />}/>
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
