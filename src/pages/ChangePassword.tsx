import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputsChangePassword } from "../types/InputsTypes";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsLoading, selectMessage } from "../features/user/userSlice";
import { changePasswordAsync } from "../features/user/userAsync";

export interface Inputs extends InputsChangePassword {
  error: string;
}

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required("Se requiere la contraseña")
      .min(8, "Contraseña con 8 o mas caracteres")
      .max(15, "Contraseña con 15 o menos caracteres"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  })
  .required();

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  const isLoading = useAppSelector(selectIsLoading);
  const messageSucces = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();
  const { token = "" } = useParams();

  const submitForm = (data: InputsChangePassword) => {
    dispatch(changePasswordAsync({ token, data, setError }));
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md relative overflow-hidden"
      >
        {isLoading && <Spinner />}
        <p className="text-lg tracking-wider font-medium">Cambiar contraseña</p>
        {errors.error && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {errors.error.message}
          </p>
        )}
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("password")}
            placeholder="Contraseña"
            type="password"
            disabled={isLoading || Boolean(messageSucces)}
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
            disabled={isLoading || Boolean(messageSucces)}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              No coincide la contraseña
            </p>
          )}
          {messageSucces && (
            <p className="w-72 text-lg text-green-400 font-medium text-center">
              {messageSucces} vuelve al{" "}
              <Link to="/" className="underline">
                inicio
              </Link>
            </p>
          )}
        </div>
        <button
          className="bg-blue-500 disabled:bg-blue-900 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600"
          disabled={isLoading || Boolean(messageSucces)}
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
