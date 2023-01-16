import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    departmentNumber: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-4 rounded-2xl px-6 py-7 shadow-md">
      <p className="text-lg tracking-wider font-medium">Crear cuenta</p>
        <input
          className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
          name="name"
          placeholder="Nombre"
          type="text"
          required
          onChange={handleChange}
        />
        <input
          className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
          name="lastName"
          placeholder="Apellidos"
          type="text"
          required
          onChange={handleChange}
        />
        <input
          className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
          name="departmentNumber"
          placeholder="Numero de departamento"
          type="text"
          required
          onChange={handleChange}
        />
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
        <input
          className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
          name="password2"
          placeholder="Confirmar contraseña"
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
        <Link to="/">
          <p className="text-blue-500 font-semibold border-b border-b-transparent hover:border-b-blue-500">
            Iniciar sesion
          </p>
        </Link>
      </form>
    </div>
  );
};

export default CreateAccount;
