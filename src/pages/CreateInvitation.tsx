import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputsCreateInvitation } from "../types/InputsTypes";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { invitations } from "../features/auth/authSlice";
import { createInvitationService } from "../services/createInvitationService";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import Modal from "../components/Modal";
import { UrlCodeQR } from "../utils/urlCodeQR";

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
  } = useForm<InputsCreateInvitation>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.jwt);
  const navigate = useNavigate();
  const [urlQR, setUrlQR] = useState("");
  const [qr, setQr] = useState("");
  const [showModal, setShoModal] = useState(false);

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
        // console.log(url);
        setQr(url);
      }
    );
  };

  const handleCloseModal = () => {
    setShoModal(false);
    navigate("/");
  };

  const submitForm = (data: InputsCreateInvitation) => {
    createInvitationService(auth, data)
      .then((res) => {
        dispatch(invitations(res));
        generateQRCode(UrlCodeQR + res.token);
        setUrlQR(UrlCodeQR +  res.token);
        setShoModal(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <img className="w-1/2 h-auto" src={qr} />
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
        <button className="bg-blue-500 px-8 py-2 text-white font-semibold rounded-lg hover:bg-blue-600">
          Crear invitacion
        </button>
      </form>
    </div>
  );
};

export default CreateInvitation;
