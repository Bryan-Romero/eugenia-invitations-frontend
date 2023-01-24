import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputsCreateInvitation } from "../types/InputsTypes";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import { UrlCodeQR } from "../utils/urlCodeQR";
import { selectToken } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  resetMessageSuccess,
  selectIsLoading,
  selectMessageSuccess,
  selectTokenToShare,
} from "../features/invitations/invitationsSlice";
import { createInvitationAsync } from "../features/invitations/invitationsAsync";

export interface Inputs extends InputsCreateInvitation {
  error: string;
}
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
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  const navigate = useNavigate();
  const [urlQR, setUrlQR] = useState("");
  const [qr, setQr] = useState("");
  const [showModal, setShoModal] = useState(false);
  const isLoading = useAppSelector(selectIsLoading);
  const messageSuccess = useAppSelector(selectMessageSuccess);
  const tokenToShare = useAppSelector(selectTokenToShare);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const generateQRCode = (url: string) => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#000000FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr(url);
      }
    );
  };

  const submitForm = (data: InputsCreateInvitation) => {
    dispatch(createInvitationAsync({ token, data, setError }));
  };

  const handleCloseModal = () => {
    setShoModal(false);
    dispatch(resetMessageSuccess());
    navigate("/");
  };

  useEffect(() => {
    if (messageSuccess) {
      generateQRCode(UrlCodeQR + tokenToShare);
      setUrlQR(UrlCodeQR + tokenToShare);
      setShoModal(true);
    }
  }, [messageSuccess]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <img className="w-1/2 h-auto" src={qr} alt="QR Code" />
          <div className="flex flex-row flex-wrap gap-3 mt-8 justify-center items-center">
            <a
              href={urlQR}
              className=" border-2 border-blue-500 px-8 py-2 text-blue-500 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver invitacion
            </a>
            <a
              className="border-2 border-blue-500 px-8 py-2 text-blue-500 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600"
              href={qr}
              download="qrcode.png"
            >
              Descargar
            </a>
          </div>
        </Modal>
      )}
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-gray-100 w-fit h-fit flex flex-col items-center gap-8 rounded-2xl px-6 py-7 shadow-md relative overflow-hidden"
      >
        {isLoading && <Spinner />}
        <p className="text-lg tracking-wider font-medium">Crear invitacion</p>
        {errors.error && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {errors.error.message}
          </p>
        )}
        <div className="w-full flex flex-col gap-1">
          <input
            className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
            {...register("guestName")}
            placeholder="Nombre del invitado"
            type="text"
            disabled={isLoading}
          />
          {errors.guestName && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.guestName.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-col gap-2">
            <p className="text-gray-400">Fecha y hora de entrada</p>
            <input
              className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
              {...register("dateOfEntry")}
              type="datetime-local"
              disabled={isLoading}
            />
          </div>
          {errors.dateOfEntry && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.dateOfEntry.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-col gap-2">
            <p className="text-gray-400">Fecha de caducidad</p>
            <input
              className="outline-none w-72 px-2 py-2 border-2 border-gray-400 rounded-lg placeholder-slate-400 disabled:bg-gray-300"
              {...register("expirationDate")}
              type="date"
              disabled={isLoading}
            />{" "}
          </div>
          {errors.expirationDate && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {errors.expirationDate.message}
            </p>
          )}
        </div>
        <button
          className="bg-blue-500 disabled:bg-blue-900 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          Crear invitacion
        </button>
      </form>
    </div>
  );
};

export default CreateInvitation;
