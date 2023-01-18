import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const NavBar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div
      className={`bg-gray-100 w-full h-16 flex flex-row px-14 py-3 shadow-md items-center justify-between`}
    >
      <Link to="/">
        <p className="text-2xl font-bold tracking-widest hover:drop-shadow-xl hover:scale-105">EUGENIA</p>
      </Link>
      {auth.isLogin && (
        <div className="flex justify-center items-center gap-4">
          <p className="text-lg">{auth.name}</p>
          <button
            className="border-2 border-blue-500 px-8 py-2 text-blue-500 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
