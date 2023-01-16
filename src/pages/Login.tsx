import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("No es un E-mail")
      .required("Se requiere el E-mail"),
    password: yup.string().required("Se requiere la contraseña"),
  })
  .required();

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  const submitForm = (data: Inputs) => {
    console.log(data)
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md"
      >
        <p className="text-lg tracking-wider font-medium">Iniciar sesion</p>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("email")}
            placeholder="E-mail"
            type="text"
          />
          {errors.email && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("password")}
            placeholder="Contraseña"
            type="password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.password?.message}
            </p>
          )}
        </div>
        <button className="bg-blue-500 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600">
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
