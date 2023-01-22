import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { InputsLogin } from "../types/InputsTypes";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import { loginService } from "../services/loginService";
import Spinner from "../components/Spinner";
import {
  invitations,
  loadingInvitationsFalse,
  loadingInvitationsTrue,
} from "../features/invitations/invitationsSlice";
import { getInvitationsService } from "../services/getInvitationsService";

interface Inputs extends InputsLogin {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (data: InputsLogin) => {
    setIsLoading(true);
    loginService(data)
      .then((response) => {
        dispatch(login(response));
        setIsLoading(false);
        dispatch(loadingInvitationsTrue());
        getInvitationsService(response.token)
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
      })
      .catch((error) => {
        if (error?.email) {
          setError(
            "email",
            { type: "focus", message: error.email },
            { shouldFocus: true }
          );
          setIsLoading(false);
          return;
        }
        if (error?.password) {
          setError(
            "password",
            {
              type: "focus",
              message: error.password,
            },
            { shouldFocus: true }
          );
          setIsLoading(false);
          return;
        }
        setError("error", { message: error });
        setIsLoading(false);
      });
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
            {errors.error?.message}
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
              {errors.email?.message}
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
              {errors.password?.message}
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
