import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { getInvitationByIdAsync } from "../features/invitations/invitationsAsync";
import {
  resetMessageSuccess,
  selectInvitationDetail,
  selectIsLoading,
  selectMessageSuccess,
} from "../features/invitations/invitationsSlice";
import { formDateOfEntry, formExpirationDate } from "../utils/formatDate";

const InvitationDetail = () => {
  const { tokenToShare = "" } = useParams();
  const isLoading = useAppSelector(selectIsLoading);
  const messageSuccess = useAppSelector(selectMessageSuccess);
  const invitationDetail = useAppSelector(selectInvitationDetail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInvitationByIdAsync({ tokenToShare }));
    return () => {
      dispatch(resetMessageSuccess());
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-100 max-w-md h-fit flex flex-col items-center gap-8 rounded-2xl p-9 shadow-md relative overflow-hidden">
        {isLoading ? (
          <Spinner />
        ) : messageSuccess ? (
          <>
            <p className="text-5xl font-semibold text-center">
              {invitationDetail.guestName}
            </p>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-xl">Fecha y hora de entrada</p>
              {
                <p className="text-xl font-semibold">
                  {formDateOfEntry(invitationDetail.dateOfEntry)}
                </p>
              }
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-xl">Fecha de caducidad</p>
              <p className="text-xl font-semibold">
                {formExpirationDate(invitationDetail.expirationDate)}
              </p>
            </div>
            {}
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
