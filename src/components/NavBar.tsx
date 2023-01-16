import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      className={`bg-gray-100 w-full h-16 flex flex-row px-14 shadow-md items-center justify-between`}
    >
      <Link to="/">
        <p className="text-2xl font-bold tracking-widest">EUGENIA</p>
      </Link>
      <div className="flex justify-center items-center gap-4">
        <p className="text-lg">Bryan Romero</p>
        <button className="border-2 border-blue-500 px-8 py-2 text-blue-500 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600" onClick={() => alert("Logout")}>Salir</button>
      </div>
    </div>
  );
};

export default NavBar;
