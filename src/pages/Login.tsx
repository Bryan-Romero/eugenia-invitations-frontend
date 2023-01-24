import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { InputsLogin } from "../types/InputsTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsLoading } from "../features/auth/authSlice";
import { loginAsync } from "../features/auth/authAsync";
import Spinner from "../components/Spinner";

export interface Inputs extends InputsLogin {
  error: string;
}

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

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const submitForm = (data: InputsLogin) => {
    dispatch(loginAsync({ data, setError }));
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md relative overflow-hidden"
      >
        {isLoading && <Spinner />}
        <p className="text-lg tracking-wider font-medium">Iniciar sesion</p>
        {errors.error && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {errors.error.message}
          </p>
        )}
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("email")}
            placeholder="E-mail"
            type="email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("password")}
            placeholder="Contraseña"
            type="password"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          className="bg-blue-500 disabled:bg-blue-900 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          Siguiente
        </button>
        <Link
          to="/forgotPassword"
          className={`text-blue-500 border-b border-b-transparent hover:border-b-blue-500 ${
            isLoading && "pointer-events-none text-blue-900"
          }`}
        >
          Olvidaste tu contraseña?
        </Link>
        <Link
          to="/createAccount"
          className={`text-blue-500 font-semibold border-b border-b-transparent hover:border-b-blue-500 ${
            isLoading && "pointer-events-none text-blue-900"
          }`}
        >
          Crear una cuenta
        </Link>
      </form>
    </div>
  );
};

export default Login;
