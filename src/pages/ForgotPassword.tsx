import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputsForgotPassword } from "../types/InputsTypes";
import { forgotPasswordService } from "../services/forgotPasswordService";

interface Inputs extends InputsForgotPassword {
  error: string;
};

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("No es un E-mail")
      .required("Se requiere el E-mail"),
  })
  .required();

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  const [emailSend, setEmailSend] = useState("");

  const submitForm = async (data: InputsForgotPassword) => {
    await forgotPasswordService(data)
      .then((res) => {
        setEmailSend(res.message)
      })
      .catch((error) => {
        if (error?.email) {
          setError(
            "email",
            { type: "focus", message: error.email },
            { shouldFocus: true }
          );
          return;
        }
        setError("error", { message: error?.response?.data?.message });
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md"
      >
        <p className="text-lg tracking-wider font-medium">Cambiar contraseña</p>
        {errors.error && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {errors.error?.message}
          </p>
        )}
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
          {emailSend && (
            <p className="text-lg text-green-400 font-medium text-center">
              {emailSend}
            </p>
          )}
        </div>
        <button className="bg-blue-500 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600">
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
