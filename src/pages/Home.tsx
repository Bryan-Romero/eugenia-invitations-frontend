import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md">
      <p className="text-lg tracking-wider font-medium">Iniciar sesion</p>
        <input
          className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
          name="email"
          placeholder="E-mail"
          type="email"
          required
          onChange={handleChange}
        />
        <input
          className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
          name="password"
          placeholder="Contraseña"
          type="password"
          required
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600"
        //   onClick={handleSubmit}
        >
          Siguiente
        </button>
        <Link to="/forgotPassword">
          <p className="text-blue-500 border-b border-b-transparent hover:border-b-blue-500">
            Olvidaste tu contraseña?
          </p>
        </Link>
        <Link to="/">
          <p className="text-blue-500 font-semibold border-b border-b-transparent hover:border-b-blue-500">
            Crear una cuenta
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Home;
