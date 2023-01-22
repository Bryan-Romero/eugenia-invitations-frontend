import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getInvitationsByIdService } from "../services/getInvitationsByIdService";
import { formDateOfEntry, formExpirationDate } from "../utils/formatDate";

const InvitationDetail = () => {
  const [invitation, setInvitation] = useState({
    guestName: "",
    dateOfEntry: "",
    expirationDate: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getInvitationsByIdService(token!)
      .then((response) => {
        setInvitation({
          guestName: response.invitation.guestName,
          dateOfEntry: response.invitation.dateOfEntry,
          expirationDate: response.invitation.expirationDate,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-100 max-w-md h-fit flex flex-col items-center gap-8 rounded-2xl p-9 shadow-md relative overflow-hidden">
        {!isLoading ? (
          <Spinner />
        ) : !error ? (
          <>
            <p className="text-5xl font-semibold text-center">
              {invitation.guestName}
            </p>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-xl">Fecha y hora de entrada</p>
              {
                <p className="text-xl font-semibold">
                  {formDateOfEntry(invitation.dateOfEntry)}
                </p>
              }
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-xl">Fecha de caducidad</p>
              <p className="text-xl font-semibold">
                {formExpirationDate(invitation.expirationDate)}
              </p>
            </div>
          </>
        ) : (
          <p className="text-5xl font-semibold text-center">
            No existe esta invitacion
          </p>
        )}
      </div>
    </div>
  );
};

export default InvitationDetail;
