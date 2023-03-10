import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputsCreateAccount } from "../types/InputsTypes";
import { selectIsLoading, selectIsLogin } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createUserAsync } from "../features/auth/authAsync";

export interface Inputs extends InputsCreateAccount {
  error: string;
}

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("Se requiere el nombre"),
    lastName: yup.string().required("Se requiere el apellido"),
    departmentNumber: yup.string().required("Se requiere el departamento"),
    email: yup
      .string()
      .email("No es un E-mail")
      .required("Se requiere el E-mail"),
    password: yup
      .string()
      .required("Se requiere la contraseña")
      .min(8, "Contraseña con 8 o mas caracteres")
      .max(15, "Contraseña con 15 o menos caracteres"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  })
  .required();

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  const navigate = useNavigate();
  const isLogin = useAppSelector(selectIsLogin);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const submitForm2 = (data: InputsCreateAccount) => {
    dispatch(createUserAsync({ data, setError }));
  };

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitForm2)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-4 rounded-2xl px-6 py-7 shadow-md relative overflow-hidden"
      >
        {isLoading && <Spinner />}
        <p className="text-lg tracking-wider font-medium">Crear cuenta</p>
        {errors.error && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {errors.error.message}
          </p>
        )}
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("firstName")}
            placeholder="Nombre"
            type="text"
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("lastName")}
            placeholder="Apellido"
            type="text"
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("departmentNumber")}
            placeholder="Numero de departamento"
            type="text"
            disabled={isLoading}
          />
          {errors.departmentNumber && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.departmentNumber.message}
            </p>
          )}
        </div>
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
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("confirmPassword")}
            placeholder="Confirmar contraseña"
            type="password"
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              No coincide la contraseña
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
          to="/"
          className={`text-blue-500 font-semibold border-b border-b-transparent hover:border-b-blue-500 ${
            isLoading && "pointer-events-none text-blue-900"
          }`}
        >
          Iniciar sesion
        </Link>
      </form>
    </div>
  );
};

export default CreateUser;
