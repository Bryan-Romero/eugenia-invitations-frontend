import React, { useState } from "react";
import { InputsCreateInvitation } from "../types/InputsTypes";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "qrcode";
import Modal from "../components/Modal";
import { UrlCodeQR } from "../utils/urlCodeQR";
import { deleteInvitationService } from "../services/deleteInvitationService";
import { invitations } from "../features/invitations/invitationsSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Invitation = ({
  id,
  guestName,
  dateOfEntry,
  expirationDate,
  tokenShare,
}: InputsCreateInvitation) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.authReducer.token);
  const [qr, setQr] = useState("");
  const [urlQR, setUrlQR] = useState("");
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
  };

  const handleDelete = (id: string) => {
    deleteInvitationService(auth, id)
      .then((response) => {
        dispatch(invitations(response));
      })
      .catch((error) => {
        console.error(error);
        dispatch(logout());
        navigate("/");
      });
  };

  const handleInvitation = () => {
    generateQRCode(UrlCodeQR + tokenShare);
    setUrlQR(UrlCodeQR + tokenShare);
    setShoModal(true);
  };

  return (
    <>
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
      <div className="bg-gray-100 flex flex-row w-full h-fit px-5 py-3 rounded-2xl shadow-sm hover:shadow-md items-center justify-between">
        <div
          className="w-full h-full cursor-pointer flex flex-row justify-evenly flex-wrap"
          onClick={handleInvitation}
        >
          <div className="flex w-1/3 flex-col items-center justify-center">
            <p className="text-lg font-semibold ml-2">
              {guestName.toUpperCase()}
            </p>
            <p className="text-sm font-light">Nombre</p>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center">
            <p className="text-lg font-semibold ml-2">{dateOfEntry}</p>
            <p className="text-sm font-light">Fecha y hora de entrada</p>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center">
            <p className="text-lg font-semibold ml-2">{expirationDate}</p>
            <p className="text-sm font-light">Fecha de caducidad</p>
          </div>
        </div>
        <button
          className="bg-red-500 px-8 py-2 text-white font-semibold rounded-lg hover:bg-red-600"
          onClick={() => handleDelete(id)}
        >
          Eliminar
        </button>
      </div>
    </>
  );
};

export default Invitation;
