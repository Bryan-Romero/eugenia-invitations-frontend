import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateInvitation = () => {
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

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md"
      >
        <p className="text-lg tracking-wider font-medium">Crear invitacion</p>
        <input
          className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
          name="guestName"
          placeholder="Nombre del invitado"
          type="text"
          required
          onChange={handleChange}
        />
        <div className="w-full flex flex-col gap-2">
          <p className="text-gray-400">Fecha y hora de entrada</p>
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg"
            name="dateOfEntry"
            type="datetime-local"
            required
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-gray-400">Fecha de caducidad</p>
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg"
            name="expirationDate"
            type="date"
            required
            onChange={handleChange}
          />{" "}
        </div>
        <button
          className="bg-blue-500 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600"
          //   onClick={handleSubmit}
        >
          Crear invitacion
        </button>
      </form>
    </div>
  );
};

export default CreateInvitation;
