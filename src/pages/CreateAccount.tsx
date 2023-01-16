import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Inputs = {
  name: string;
  lastName: string;
  departmentNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Se requiere el nombre"),
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

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  const submitForm = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-4 rounded-2xl px-6 py-7 shadow-md"
      >
        <p className="text-lg tracking-wider font-medium">Crear cuenta</p>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("name")}
            placeholder="Nombre"
            type="text"
          />
          {errors.name && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("lastName")}
            placeholder="Apellido"
            type="text"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.lastName?.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("departmentNumber")}
            placeholder="Numero de departamento"
            type="text"
          />
          {errors.departmentNumber && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.departmentNumber?.message}
            </p>
          )}
        </div>
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
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("confirmPassword")}
            placeholder="Confirmar contraseña"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              No coincide la contraseña
            </p>
          )}
        </div>
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
