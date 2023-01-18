import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axios";
import { InputsCreateAccount } from "../types/InputsTypes";
import { createUserService } from "../services/createUserService";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { invitations, login } from "../features/auth/authSlice";
import { getInvitationsService } from "../services/getInvitationsService";

interface Inputs extends InputsCreateAccount {
  error: string;
};

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

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.isLogin);

  const submitForm = async (data: InputsCreateAccount) => {
    await createUserService(data)
      .then((res) => {
        dispatch(login(res));
        getInvitationsService(res.token)
          .then((res) => {
            dispatch(invitations(res));
          })
          .catch((error) => {
            console.log(error);
          });
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

  useEffect(() => {
    if(auth) navigate("/")
  }, [auth, navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-4 rounded-2xl px-6 py-7 shadow-md"
      >
        <p className="text-lg tracking-wider font-medium">Crear cuenta</p>
        {errors.error && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {errors.error?.message}
          </p>
        )}
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("firstName")}
            placeholder="Nombre"
            type="text"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.firstName?.message}
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
        <button type="submit" className="bg-blue-500 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600">
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
