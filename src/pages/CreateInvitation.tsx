import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Inputs = {
  guestName: string;
  dateOfEntry: string;
  expirationDate: string;
};

const schema = yup
  .object()
  .shape({
    guestName: yup.string().required("Se requiere nombre del invitado"),
    dateOfEntry: yup.string().required("Se requiere fecha y hora de entrada"),
    expirationDate: yup.string().required("Se requiere fecha de caducidad"),
  })
  .required();

const CreateInvitation = () => {
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
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md"
      >
        <p className="text-lg tracking-wider font-medium">Crear invitacion</p>
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400"
            {...register("guestName")}
            placeholder="Nombre del invitado"
            type="text"
          />
          {errors.guestName && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.guestName?.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-col gap-2">
            <p className="text-gray-400">Fecha y hora de entrada</p>
            <input
              className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg"
              {...register("dateOfEntry")}
              type="datetime-local"
            />
          </div>
          {errors.dateOfEntry && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.dateOfEntry?.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-col gap-2">
            <p className="text-gray-400">Fecha de caducidad</p>
            <input
              className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg"
              {...register("expirationDate")}
              type="date"
            />{" "}
          </div>
          {errors.expirationDate && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.expirationDate?.message}
            </p>
          )}
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
